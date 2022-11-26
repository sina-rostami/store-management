import hashlib
import datetime

from database_handler import DatabaseHandler, Seller, Customer, Category, Payer, Product, Order, OrderProduct, Payment, Scratch

from seller_manager import SellerManager
from customer_manager import CustomerManager


class Backend:
    def __init__(self) -> None:
        self.database_session = DatabaseHandler('sqlite:///test.db').get_session()
        self.seller_manager = SellerManager(self.database_session)
        self.customer_manager = CustomerManager(self.database_session)
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
            name='asghar', credit=10000.0, join_date=datetime.datetime.now(),
            is_active=True, phone_number='09101010203'))
        self.database_session.add(Payer(name='asghar-payer', phone_number='09111010203'))
        self.database_session.add(Category(name='خوراکی'))
        self.database_session.add(Product(name='چای', price=1000, category_id=0))
        self.database_session.add(Product(name='نسکافه', price=7000, category_id=0))
        self.database_session.add(Product(name='آبمیوه', price=8000, category_id=0))
        self.database_session.add(Product(name='نان', price=9000, category_id=0))
        self.database_session.add(Product(name='املت', price=2000, category_id=0))
        self.database_session.add(Product(name='سیب', price=3000, category_id=0))
        self.database_session.add(Product(name='گوجه', price=5000, category_id=0))
        self.database_session.add(Product(name='دوغ', price=6000, category_id=0))
        self.database_session.commit()

    def get_hash(self, password):
        return hashlib.md5(bytes(password, 'utf-8')).hexdigest()

    def get_product_as_json(self, product):
        return {'id': product.id,
                'name': product.name,
                'category_id': product.category_id,
                'price': product.price}

    def get_all_products_as_json(self):
        return [self.get_product_as_json(product) for product in self.database_session.query(Product).all()]
