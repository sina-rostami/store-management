import json

from product import Product

class Store:
    def __init__(self) -> None:
        self.admins = []
        self.users = []
        self.customers = []
        self.products = []
        self.id_handler = 0

    def get_new_id(self):
        self.id_handler += 1
        return self.id_handler

    def add_product(self, data):
        self.products.append(Product)

