from database_handler import Category, Product


class ProductManager:
    def __init__(self, database_session) -> None:
        self.database_session = database_session

    def add_product(self, data, profile_photo_link):
        old_product = self.database_session.query(Product).filter_by(name=data['name'], price=data['price'],
                                                                     category_id=data['category_id']).first()

        if old_product:
            return False, 'ALREADY_EXISTS'
        if not self.database_session.query(Category).filter_by(id=data['category_id']).first():
            return False, 'CATEGORY_NOT_EXIST'
        if float(data['price']) < 0:
            return False, 'NEGATIVE_PRICE'

        self.database_session.add(Product(name=data['name'], price=float(data['price']), stock_number=int(data['stock_number']),
                                          category_id=int(data['category_id']), is_active=True, profile_photo_link=profile_photo_link))
        self.database_session.commit()

        return True, 'SUCCESS'

    def edit_product(self, id, data, profile_photo_link):
        old_product = self.database_session.query(Product).filter_by(id=id).first()

        if not old_product:
            return False, 'NOT_EXIST'
        if not self.database_session.query(Category).filter_by(id=data['category_id']).first():
            return False, 'CATEGORY_NOT_EXIST'
        if float(data['price']) < 0:
            return False, 'NEGATIVE_PRICE'

        same_product = self.database_session.query(Product).filter_by(name=data['name'], price=float(data['price']),
                                                                      category_id=data['category_id']).first()
        if same_product and same_product.id != id:
            return False, 'ALREADY_EXISTS'

        old_product.name = data['name']
        old_product.price = float(data['price'])
        old_product.category_id = int(data['category_id'])
        old_product.stock_number = int(data['stock_number'])
        old_product.profile_photo_link = profile_photo_link if profile_photo_link else old_product.profile_photo_link

        self.database_session.commit()

        return True, 'SUCCESS'

    def get_product_as_json(self, product):
        return {'id': product.id, 'name': product.name, 'stock_number': product.stock_number, 'category_id': product.category_id,
                'price': product.price, 'is_active': product.is_active, 'profile_photo_link': product.profile_photo_link}

    def get_product_as_json_by_id(self, id):
        product = self.database_session.query(Product).filter_by(id=id).first()
        if not product:
            return False, 'NOT_EXIST'

        return True, self.get_product_as_json(product)

    def get_all_products_as_json(self, page, per_page):
        return [self.get_product_as_json(product) for product in
                self.database_session.query(Product).limit(per_page).offset((page - 1) * per_page).all()]

    def delete_product(self, product_id):
        old_product = self.database_session.query(Product).filter_by(id=product_id).first()

        if not old_product:
            return False, 'NOT_EXIST'
        if not old_product.is_active:
            return False, 'ALREADY_LEFT'

        old_product.is_active = False
        old_product.stock_number = 0

        self.database_session.commit()

        return True, 'SUCCESS'
