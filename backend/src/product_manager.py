
from database_handler import Product

class ProductManager:
    def __init__(self, database_session) -> None:
        self.database_session = database_session

    def get_product_as_json(self, product):
        return {'id': product.id,
                'name': product.name,
                'category_id': product.category_id,
                'price': product.price}

    def get_all_products_as_json(self):
        return [self.get_product_as_json(product) for product in self.database_session.query(Product).all()]