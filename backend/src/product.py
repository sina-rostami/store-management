import json


class Product():

    def __init__(self, id: int, name: str, price: float) -> None:
        self.id = id
        self.name = name
        self.price = price

    def set_id(self, id: int):
        self.id = id

    def get_id(self):
        return self.id

    def set_name(self, name=str):
        self.name = name

    def get_name(self):
        return self.name

    def set_price(self, price: float):
        self.price = price

    def get_price(self):
        return self.price

    def __str__(self) -> str:
        return json.dumps({'id': self.id,
                           'name': self.name,
                           'price': self.price})


if __name__ == '__main__':
    p1 = Product(1, 'sigar', 1000)

    print(p1)
    p1.set_id(2)
    print(p1)
    p1.set_name('Siiigar')
    print(p1)
    p1.set_price(1200)
    print(p1)