import hashlib
import datetime

from database_handler import DatabaseHandler, Seller, Customer, Category, Payer, Product, Order, OrderProduct, Payment, Scratch


class Backend:
    def __init__(self) -> None:
        self.database_session = DatabaseHandler('sqlite:///test.db').get_session()
        self.add_defaults_to_database()
        self.add_mock_values_to_db()

    def add_defaults_to_database(self):
        ADMIN_USERNAME = ('admin_username', 'admin')
        ADMIN_PASSWORD = ('admin_password', '12345')
        if not self.database_session.query(Scratch).filter_by(key=ADMIN_USERNAME[0]).first():
            self.database_session.add(Scratch(ADMIN_USERNAME[0], ADMIN_USERNAME[1]))
            self.database_session.commit()

        if not self.database_session.query(Scratch).filter_by(key=ADMIN_PASSWORD[0]).first():
            self.database_session.add(Scratch(ADMIN_PASSWORD[0], self.get_hash(ADMIN_PASSWORD[1])))
            self.database_session.commit()

    def add_mock_values_to_db(self):
        if self.database_session.query(Seller).filter_by(name='ali').first():
            return

        self.database_session.add(Seller(name='ali', username='user0'))
        self.database_session.add(Customer(
            name='asghar', credit=100.0, join_date=datetime.datetime.now(),
            is_active=True, phone_number='09101010203'))
        self.database_session.add(Payer(name='asghar-payer', phone_number='09111010203'))
        self.database_session.add(Category(name='tanagholat'))
        self.database_session.add(Product(name='chips', price=50.0, category_id=0))
        self.database_session.commit()

    def get_hash(self, password):
        return hashlib.md5(bytes(password, 'utf-8')).hexdigest()

    def place_order(self, request_data):
        customer_id = request_data['customer-id']
        seller_id = request_data['seller-id']
        products_ids = request_data['products-ids']

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

    def get_customer_as_json(self, customer):
        return {'id': customer.id,
                'name': customer.name,
                'credit': customer.credit,
                'join_date': customer.join_date.timestamp(),
                'is_active': customer.is_active,
                'phone_number': customer.phone_number}

    def get_all_customers_as_json(self):
        return [self.get_customer_as_json(customer) for customer in self.database_session.query(Customer).all()]

    def get_seller_as_json(self, seller):
        return {'id': seller.id,
                'name': seller.name,
                'username': seller.username}

    def get_all_sellers_as_json(self):
        return [self.get_seller_as_json(seller) for seller in self.database_session.query(Seller).all()]

    def get_product_as_json(self, product):
        return {'id': product.id,
                'name': product.name,
                'category_id': product.category_id,
                'price': product.price}

    def get_all_products_as_json(self):
        return [self.get_product_as_json(product) for product in self.database_session.query(Product).all()]
