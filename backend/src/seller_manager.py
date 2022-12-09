import datetime

from flask import make_response, jsonify
from requests import HTTPError
from werkzeug.security import generate_password_hash

from database_handler import Seller, Product, Customer, OrderProduct, Order, Scratch


class SellerManager:
    def __init__(self, database_session) -> None:
        self.database_session = database_session

    def place_order(self, request_data):
        customer_id = request_data['customer_id']
        seller_id = request_data['seller_id']
        products_ids = request_data['products_ids']

        # check existance of customer & seller & products

        total_price = sum(self.database_session.query(Product).filter_by(id=product_id).first().price
                          for product_id in products_ids)
        customer = self.database_session.query(Customer).filter_by(id=customer_id).first()
        maximum_debt = float(self.database_session.query(Scratch).filter_by(key='maximum_debt').first().value)

        if total_price > customer.credit + maximum_debt:
            return False, 'credit is not enough'

        order = Order(seller_id=seller_id, customer_id=customer_id, total_price=total_price,
                      date=datetime.datetime.now())
        self.database_session.add(order)
        customer.credit -= total_price
        self.database_session.commit()

        for product_id in products_ids:
            self.database_session.add(OrderProduct(order_id=order.id, product_id=product_id))

        self.database_session.commit()

        return True, self.get_order_as_json(order)

    def get_order_as_json(self, order):
        order_products = self.database_session.query(OrderProduct).filter_by(order_id=order.id).all()
        return {'id': order.id,
                'customer_id': order.customer_id,
                'seller_id': order.seller_id,
                'products_ids': [order_product.product_id for order_product in order_products],
                'total_price': order.total_price,
                'date': order.date.timestamp()}

    def get_all_orders_as_json(self):
        return [self.get_order_as_json(order) for order in self.database_session.query(Order).all()]

    def get_seller_as_json(self, seller):
        return {'id': seller.id,
                'name': seller.name,
                'username': seller.username}

    def get_all_sellers_as_json(self):
        return [self.get_seller_as_json(seller) for seller in self.database_session.query(Seller).all()]

    def create_seller(self, data):
        # gets name, email and password
        name, username, password = data.get('name'), data.get('username'), data.get('password')

        # checking for existing user
        user = self.database_session.query(Seller) \
            .filter_by(username=username) \
            .first()
        if not user:
            # database ORM object
            # insert user
            self.database_session.add(Seller(
                name=name,
                username=username,
                password=generate_password_hash(password)
            ))
            self.database_session.commit()

            return make_response(jsonify({'message': 'REGISTERED_SUCCESSFULLY', 'code': 201, 'status': 'success'}), 201)
        else:
            # returns 202 if user already exists
            return make_response(jsonify({'message': 'USER_EXISTS', 'code': 400, 'status': 'failed'}), 400)

    def find_by_username(self, username):
        user = self.database_session.query(Seller) \
            .filter_by(username=username) \
            .first()
        if not user:
            raise HTTPError()
        else:
            return user

    def edit_account(self, data):
        name, old_username, password, new_username = data.get('name'), data.get('old_username'), \
                                                     data.get('password'), data.get('new_username')

        result = self.database_session.query(Seller).filter_by(username=old_username) \
            .update(
            {Seller.name: name, Seller.username: new_username, Seller.password: generate_password_hash(password)},
            synchronize_session=False)

        if result != 0:
            self.database_session.commit()
            return make_response(jsonify({'message': 'EDITED_SUCCESSFULLY', 'code': 200, 'status': 'success'}), 200)

        else:
            return make_response(jsonify({'message': 'INVALID_USERNAME', 'code': 400, 'status': 'failed'}), 400)

    def edit_account(self, data):
        name, old_username, password, new_username = data.get('name'), data.get('old_username'), \
                                                     data.get('password'), data.get('new_username')

        result = self.database_session.query(Seller).filter_by(username=old_username) \
            .update(
            {Seller.name: name, Seller.username: new_username, Seller.password: generate_password_hash(password)},
            synchronize_session=False)

        if result != 0:
            self.database_session.commit()
            return make_response(jsonify({'message': 'EDITED_SUCCESSFULLY', 'code': 200, 'status': 'success'}), 200)

        else:
            return make_response(jsonify({'message': 'INVALID_USERNAME', 'code': 400, 'status': 'failed'}), 400)
