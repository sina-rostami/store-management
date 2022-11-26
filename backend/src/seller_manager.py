import datetime
from database_handler import Seller, Product, Customer, OrderProduct, Order


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

        if total_price > customer.credit:
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
