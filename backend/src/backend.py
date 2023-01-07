import datetime
import os

from requests import HTTPError
from werkzeug.security import generate_password_hash

from admin_manager import AdminManager
from customer_manager import CustomerManager
from database_handler import DatabaseHandler, Seller, Customer, Category, Payer, Product, Scratch
from product_manager import ProductManager
from security import Security
from seller_manager import SellerManager
from payment_manager import PaymentManager


class Backend:
    def __init__(self, app_secret_key, files_path, app_base_url) -> None:
        self.database_session = DatabaseHandler('sqlite:///test.db').get_session()
        self.seller_manager = SellerManager(self.database_session)
        self.customer_manager = CustomerManager(self.database_session)
        self.product_manager = ProductManager(self.database_session)
        self.admin_manager = AdminManager(self.database_session)
        self.payment_manager = PaymentManager(self.database_session)
        self.security = Security(self.database_session, app_secret_key)
        self.files_path = files_path
        self.app_base_url = app_base_url
        self.add_defaults_to_database()
        self.add_mock_values_to_db()

    def add_defaults_to_database(self):
        default_rows = {'admin_username': 'admin', 'admin_password': generate_password_hash('12345'), 'maximum_debt': '5000', }

        for key, value in default_rows.items():
            if not self.database_session.query(Scratch).filter_by(key=key).first():
                self.database_session.add(Scratch(key, value))
                self.database_session.commit()

    def add_mock_values_to_db(self):
        if self.database_session.query(Seller).filter_by(username='admin').first():
            return

        self.database_session.add(Seller(id=0, name='Admin', username='admin', password=generate_password_hash('12345'), is_active=True))
        self.database_session.add(Seller(name='ali', username='user0', password=generate_password_hash('password'), is_active=True))
        self.database_session.add(
            Customer(name='asghar', credit=100000000.0, join_date=datetime.datetime.now(), is_active=True, phone_number='09101010203'))
        self.database_session.add(Payer(name='asghar-payer', phone_number='09111010203'))
        self.database_session.add(Category(name='خوراکی'))
        self.database_session.add(Product(name='چای', price=1000, stock_number=5, category_id=1))
        self.database_session.add(Product(name='نسکافه', price=7000, stock_number=2, category_id=1))
        self.database_session.add(Product(name='آبمیوه', price=8000, stock_number=10, category_id=1))
        self.database_session.add(Product(name='نان', price=9000, stock_number=10, category_id=1))
        self.database_session.add(Product(name='املت', price=2000, stock_number=1, category_id=1))
        self.database_session.add(Product(name='سیب', price=3000, stock_number=10, category_id=1))
        self.database_session.add(Product(name='سیگار', price=5000, stock_number=3, category_id=1))
        self.database_session.add(Product(name='گوجه', price=6000, stock_number=2, category_id=1))
        self.database_session.commit()

    def find_admin(self, username):
        admin_name = self.database_session.query(Scratch).filter_by(key='admin_username').first().value
        if admin_name == username:
            password = self.database_session.query(Scratch).filter_by(key='admin_password').first().value
            return {'username': admin_name, 'password': password}
        else:
            raise HTTPError()

    def save_file(self, file, name, kind):
        if not file:
            return None
        extension = '.' + (file.filename and file.filename.rsplit('.', 1)[1].lower())
        path_file = os.path.join(self.files_path, kind, name + extension)
        if not os.path.exists(self.files_path):
            os.mkdir(self.files_path)

        kind_directory_path = os.path.join(self.files_path, kind)
        if not os.path.exists(kind_directory_path):
            os.mkdir(kind_directory_path)
        if os.path.exists(path_file):
            os.remove(path_file)
        file.save(path_file)
        return f'{self.app_base_url}/image/{kind}/{name}{extension}'

    def get_image(self, kind):
        return os.path.join(self.files_path, kind)
