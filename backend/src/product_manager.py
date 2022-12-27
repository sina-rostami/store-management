import os

from werkzeug.utils import secure_filename

from database_handler import Category, Product


class ProductManager:
    def __init__(self, database_session, app_upload_file) -> None:
        self.database_session = database_session
        self.app_upload_file = app_upload_file

    def add_product(self, data, file):
        old_product = self.database_session.query(Product).filter_by(name=data['name'], price=data['price'],
                                                                     category_id=data['category_id']).first()

        if old_product:
            return False, 'ALREADY_EXISTS'
        if not self.database_session.query(Category).filter_by(id=data['category_id']).first():
            return False, 'CATEGORY_NOT_EXIST'
        if int(data['price']) < 0:
            return False, 'NEGATIVE_PRICE'

        self.save_file(file, data['name'])

        self.database_session.add(Product(name=data['name'], price=int(data['price']), stock_number=int(data['stock_number']),
                                          category_id=int(data['category_id'])))
        self.database_session.commit()

        return True, 'SUCCESS'

    def edit_product(self, id, data):
        old_product = self.database_session.query(Product).filter_by(id=id).first()

        if not old_product:
            return False, 'NOT_EXIST'
        if not self.database_session.query(Category).filter_by(id=data['category_id']).first():
            return False, 'CATEGORY_NOT_EXIST'
        if data['price'] < 0:
            return False, 'NEGATIVE_PRICE'

        same_product = self.database_session.query(Product).filter_by(name=data['name'], price=data['price'],
                                                                      category_id=data['category_id']).first()
        if same_product and same_product.id != id:
            return False, 'ALREADY_EXISTS'

        old_product.name = data['name']
        old_product.price = data['price']
        old_product.category_id = data['category_id']
        old_product.stock_number = data['stock_number']

        self.database_session.commit()

        return True, 'SUCCESS'

    def get_product_as_json(self, product):
        return {'id': product.id, 'name': product.name, 'stock_number': product.stock_number, 'category_id': product.category_id,
                'price': product.price}

    def get_product_as_json_by_id(self, id):
        product = self.database_session.query(Product).filter_by(id=id).first()
        if not product:
            return False, 'NOT_EXIST'

        return True, self.get_product_as_json(product)

    def get_all_products_as_json(self):
        return [self.get_product_as_json(product) for product in self.database_session.query(Product).all()]

    def save_file(self, file, name):
        if not os.path.exists(self.app_upload_file):
            os.mkdir(self.app_upload_file)
        file.save(os.path.join(self.app_upload_file, name + '.' + (file.filename and file.filename.rsplit('.', 1)[1].lower())))
