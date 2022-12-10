from database_handler import Category, Product


class ProductManager:
    def __init__(self, database_session) -> None:
        self.database_session = database_session

    def add_product(self, data):
        old_product = self.database_session.query(Product).filter_by(
            name=data['name'], price=data['price'], category_id=data['category-id']).first()

        if old_product:
            return False, 'ALREADY_EXISTS'
        if not self.database_session.query(Category).filter_by(id=data['category-id']).first():
            print(self.database_session.query(Category).filter_by(id=data['category-id']).first())
            return False, 'CATEGORY_NOT_EXIST'
        if data['price'] < 0:
            return False, 'PRICE_NEGATIVE'

        self.database_session.add(Product(name=data['name'], price=data['price'], category_id=data['category-id']))
        self.database_session.commit()

        return True, 'SUCCESS'

    def get_product_as_json(self, product):
        return {'id': product.id,
                'name': product.name,
                'category_id': product.category_id,
                'price': product.price}

    def get_all_products_as_json(self):
        return [self.get_product_as_json(product) for product in self.database_session.query(Product).all()]
