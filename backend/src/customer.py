import json


class Customer:
    def __init__(self, id: int, name: str, phone_number: str, max_borrow: float, init_credit: float) -> None:
        self.id = id
        self.name = name
        self.phone_number = phone_number
        self.max_borrow = max_borrow
        self.credit = init_credit
        self.debt = float()

    def make_purchase(self, purchase_cost: float) -> bool:
        if self.credit + self.max_borrow - self.debt >= purchase_cost:
            if self.credit >= purchase_cost:
                self.credit -= purchase_cost
                return True
            else:
                self.credit = 0
                self.debt += purchase_cost
                return True
        else:
            return False

    def deposit(self, income: float):
        if self.debt != 0:
            if self.debt >= income:
                self.debt -= income
                income = 0
            else:
                income -= self.debt
                self.debt = 0
        self.credit += income

    def get_credit(self) -> float:
        return self.credit

    def get_id(self):
        return self.id

    def get_name(self):
        return self.name

    def get_phone_number(self):
        return self.phone_number

    def get_debt(self):
        return self.debt

    def __str__(self) -> str:
        return json.dumps({'id': self.id,
                           'name': self.name,
                           'phone_number': self.phone_number,
                           'max_borrow': self.max_borrow,
                           'credit': self.credit,
                           'debt': self.debt})


if __name__ == '__main__':
    customer = Customer(12, 'ali', '09123213', 10000, 5000)

    print(customer)
    customer.make_purchase(5000)
    print(customer)
    customer.make_purchase(5000)
    print(customer)
    customer.make_purchase(5000)
    print(customer)
    customer.make_purchase(1000)
    print(customer)
    customer.deposit(1000)
    print(customer)
    customer.deposit(12000)
    print(customer)
