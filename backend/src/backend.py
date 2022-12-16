import datetime

from requests import HTTPError
from werkzeug.security import generate_password_hash

from database_handler import DatabaseHandler, Seller, Customer, Category, Payer, Product, Scratch

from seller_manager import SellerManager
from customer_manager import CustomerManager
from product_manager import ProductManager
from security import Security


class Backend:
    def __init__(self, app_secret_key) -> None:
        self.database_session = DatabaseHandler('sqlite:///test.db').get_session()
        self.seller_manager = SellerManager(self.database_session)
        self.customer_manager = CustomerManager(self.database_session)
        self.product_manager = ProductManager(self.database_session)
        self.security = Security(self.database_session, app_secret_key)
        self.add_defaults_to_database()
        self.add_mock_values_to_db()

    def add_defaults_to_database(self):
        default_rows = {
            'admin_username': 'admin',
            'admin_password': generate_password_hash('12345'),
            'maximum_debt': '5000',
        }

        for key, value in default_rows.items():
            if not self.database_session.query(Scratch).filter_by(key=key).first():
                self.database_session.add(Scratch(key, value))
                self.database_session.commit()

    def add_mock_values_to_db(self):
        if self.database_session.query(Seller).filter_by(name='ali').first():
            return

        self.database_session.add(Seller(name='ali', username='user0', password=generate_password_hash('password')))
        self.database_session.add(Customer(
            name='asghar', credit=100000000.0, join_date=datetime.datetime.now(),
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

    def find_admin(self, username):
        admin_name = self.database_session.query(Scratch).filter_by(key='admin_username').first().value
        if admin_name == username:
            password = self.database_session.query(Scratch).filter_by(key='admin_password').first().value
            return {
                'username': admin_name,
                'password': password
            }
        else:
            raise HTTPError()
