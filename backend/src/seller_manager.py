import datetime

from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

from database_handler import Seller, Product, Customer, OrderProduct, Order, Scratch


class SellerManager:
    def __init__(self, database_session) -> None:
        self.database_session = database_session

    def are_enough_products_available_in_stock(self, products):
        for product in products:
            product_db_object = self.database_session.query(Product).filter_by(id=product['id']).first()
            if product_db_object.stock_number < product['quantity']:
                return False
        return True

    def place_order(self, request_data):
        customer_id = request_data['customer_id']
        seller_id = request_data['seller_id']
        products = request_data['products']

        # check existence of products
        seller = self.database_session.query(Seller).filter_by(id=seller_id).first()
        if not seller:
            return False, 'NOT_EXIST'
        elif not seller.is_active:
            return False, 'SELLER_NOT_ACTIVE'

        customer = self.database_session.query(Customer).filter_by(id=customer_id).first()
        if not customer:
            return False, 'CUSTOMER_NOT_EXIST'

        total_price = sum(
            self.database_session.query(Product).filter_by(id=product['id']).first().price * product['quantity'] for product in products)

        if not self.are_enough_products_available_in_stock(products):
            return False, 'NOT_IN_STOCK'

        customer = self.database_session.query(Customer).filter_by(id=customer_id).first()
        maximum_debt = float(self.database_session.query(Scratch).filter_by(key='maximum_debt').first().value)

        if total_price > customer.credit + maximum_debt:
            return False, 'CREDIT_NOT_ENOUGH'

        order = Order(seller_id=seller_id, customer_id=customer_id, total_price=total_price, date=datetime.datetime.now())
        self.database_session.add(order)
        customer.credit -= total_price
        self.database_session.commit()

        for product in products:
            self.database_session.add(OrderProduct(order_id=order.id, product_id=product['id'], quantity=product['quantity'],
                                                   price=self.database_session.query(Product).filter_by(id=product['id']).first().price))
            product_db_object = self.database_session.query(Product).filter_by(id=product['id']).first()
            product_db_object.stock_number -= product['quantity']

        self.database_session.commit()

        return True, 'SUCCESS'

    def get_order_as_json(self, order):
        order_products = self.database_session.query(OrderProduct).filter_by(order_id=order.id).all()
        seller = self.database_session.query(Seller).filter_by(id=order.seller_id).first()
        customer = self.database_session.query(Customer).filter_by(id=order.customer_id).first()

        return {'id': order.id, 'customer_id': order.customer_id, 'customer_name': customer.name, 'seller_id': order.seller_id,
                'seller_name': seller.name,
                'products': [{'id': order_product.product_id, 'quantity': order_product.quantity, 'price': order_product.price} for
                             order_product in order_products], 'total_price': order.total_price, 'date': order.date.timestamp()}

    def get_order_as_json_by_id(self, id):
        order = self.database_session.query(Order).filter_by(id=id).first()
        if not order:
            return False, 'NOT_EXIST'

        return True, self.get_order_as_json(order)

    def get_all_orders_as_json(self, page, per_page):
        return [self.get_order_as_json(prder) for prder in
                self.database_session.query(Order).limit(per_page).offset((page - 1) * per_page).all()]

    def get_seller_as_json(self, seller):
        return {'id': seller.id, 'name': seller.name, 'username': seller.username, 'is_active': seller.is_active,
                'profile_photo_link': seller.profile_photo_link}

    def get_seller_as_json_by_id(self, id):
        seller = self.database_session.query(Seller).filter_by(id=id).first()
        if not seller:
            return False, 'NOT_EXIST'

        return True, self.get_seller_as_json(seller)

    def get_all_sellers_as_json(self, page, per_page):
        return [self.get_seller_as_json(seller) for seller in
                self.database_session.query(Seller).limit(per_page).offset((page - 1) * per_page).all() if seller.id != 0]

    def add_seller(self, data, profile_photo_link):
        name, username, password = data.get('name'), data.get('username'), data.get('password')

        old_seller = self.database_session.query(Seller).filter_by(username=username).first()
        if old_seller:
            return False, 'ALREADY_EXISTS'

        self.database_session.add(Seller(name=name, username=username, password=generate_password_hash(password), is_active=True,
                                         profile_photo_link=profile_photo_link))
        self.database_session.commit()

        return True, 'SUCCESS'

    def edit_account(self, id, data, profile_photo_link):
        name, password, username, new_password = data.get('name'), data.get('password'), data.get('username'), data.get('new_password')

        old_seller = self.database_session.query(Seller).filter_by(id=id).first()
        if not old_seller:
            return False, 'NOT_EXIST'

        same_seller = self.database_session.query(Seller).filter_by(username=username).first()
        if same_seller and same_seller.id != id:
            return False, 'ALREADY_EXISTS'

        if not check_password_hash(password, old_seller.password):
            return False, 'WRONG_PASSWORD'

        old_seller.name = name
        old_seller.password = generate_password_hash(new_password)
        old_seller.username = username
        old_seller.profile_photo_link = profile_photo_link if profile_photo_link else old_seller.profile_photo_link

        self.database_session.commit()

        return True, 'SUCCESS'

    def delete_seller(self, seller_id):
        old_seller = self.database_session.query(Seller).filter_by(id=seller_id).first()

        if not old_seller:
            return False, 'NOT_EXIST'
        if not old_seller.is_active:
            return False, 'ALREADY_LEFT'

        old_seller.is_active = False

        self.database_session.commit()

        return True, 'SUCCESS'

    def get_seller(self, username):
        seller = self.database_session.query(Seller).filter_by(username=username).first()

        return seller if seller else None
