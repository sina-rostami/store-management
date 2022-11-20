import json

from customer import Customer
from product import Product


class Admin:
    def __init__(self, id: int, name: str, customers: list, products: list) -> None:
        self.id = id
        self.name = name
        self.customers = customers
        self.products = products

    def make_purchase_on_customer(self, customer_id: id, product_ids: list):
        purchase_cost = 0
        for product_id in product_ids:
            for product in self.products:
                if product.get_id() == product_id:
                    purchase_cost += product.get_price()
        for customer in self.customers:
            if customer.get_id() == customer_id:
                return customer.make_purchase(purchase_cost)
        return None

    def add_product(self, product: Product):
        self.products.append(product)

    def update_product(self, id: int, i_product: Product):
        for product in self.products:
            if product.get_id() == id:
                product = i_product

    def add_customer(self, customer: Customer):
        self.customers.append(customer)

    # create product handlers


if __name__ == '__main__':
    customer = Customer(12, 'ali', '09123213', 10000, 5000)
    product = Product(11, 'sigar', 5000)
    user = Admin(1, 'hamid', [customer], [product])

    product1 = Product(13, 'sigar', 4000)

    user.add_product(product1)

    print(customer)
    print(user.make_purchase_on_customer(12, [11]))
    print(customer)
    print(user.make_purchase_on_customer(12, [11]))
    print(customer)
    print(user.make_purchase_on_customer(12, [11]))
    print(customer)
    print(user.make_purchase_on_customer(12, [11]))
    print(customer)
    customer.deposit(10000)
    print(customer)
    print(user.make_purchase_on_customer(12, [13]))
    print(customer)
    customer.deposit(12000)
    print(customer)
