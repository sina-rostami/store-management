from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer, Text, Float, DateTime, Boolean, Identity
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()


class DatabaseHandler:
    def __init__(self, db_uri, echo=False) -> None:
        self.engine = create_engine(db_uri, echo=echo, connect_args={'check_same_thread': False})
        Base.metadata.create_all(self.engine)
        self.session = sessionmaker()

    def get_session(self):
        return self.session(bind=self.engine)


class Seller(Base):
    __tablename__ = "Seller"
    id = Column(Integer, Identity(start=1), primary_key=True)
    name = Column(Text, nullable=False)
    username = Column(Text, nullable=False)
    password = Column(Text, nullable=False)
    is_active = Column(Boolean, nullable=False)
    profile_photo_link = Column(Text)

    def __repr__(self) -> str:
        return f'Seller(id={self.id}, name={self.name}, username={self.username}, password={self.password},\
         profile_photo_link={self.profile_photo_link})'


class Customer(Base):
    __tablename__ = "Customer"
    id = Column(Integer, Identity(start=1), primary_key=True)
    name = Column(Text)
    credit = Column(Float)
    join_date = Column(DateTime)
    leave_date = Column(DateTime)
    is_active = Column(Boolean)
    phone_number = Column(Text)
    profile_photo_link = Column(Text)

    def __repr__(self) -> str:
        return f'Customer(id={self.id}, name={self.name}, credit={self.credit}, \
        join_date={self.join_date}, is_active={self.is_active}, phone_number={self.phone_number}, \
        profile_photo_link={self.profile_photo_link})'


class Category(Base):
    __tablename__ = "Category"
    id = Column(Integer, Identity(start=1), primary_key=True)
    name = Column(Text)

    def __repr__(self) -> str:
        return f'Category(id={self.id}, name={self.name})'


class Payer(Base):
    __tablename__ = "Payer"
    id = Column(Integer, Identity(start=1), primary_key=True)
    name = Column(Text)
    phone_number = Column(Text)

    def __repr__(self) -> str:
        return f'Payer(id={self.id}, name={self.name}, phone_number={self.phone_number})'


class Product(Base):
    __tablename__ = "Product"
    id = Column(Integer, Identity(start=1), primary_key=True)
    name = Column(Text)
    price = Column(Float)
    stock_number = Column(Integer)
    category_id = Column(Integer, ForeignKey("Category.id"), nullable=False)
    is_active = Column(Boolean)
    profile_photo_link = Column(Text)

    def __repr__(self) -> str:
        return f'Product(id={self.id}, name={self.name}, price={self.price}, stock_number={self.stock_number}, ' \
               f'category_id={self.category_id}, is_active={self.is_active}, profile_photo_link={self.profile_photo_link})'


class Order(Base):
    __tablename__ = "Order"
    id = Column(Integer, Identity(start=1), primary_key=True)
    seller_id = Column(Integer, ForeignKey("Seller.id"), nullable=False)
    customer_id = Column(Integer, ForeignKey("Customer.id"), nullable=False)
    total_price = Column(Float)
    date = Column(DateTime)

    def __repr__(self) -> str:
        return f'Order(id={self.id}, seller_id={self.seller_id}, customer_id={self.customer_id}, total_price={self.total_price}, date={self.date})'


class OrderProduct(Base):
    __tablename__ = "OrderProduct"
    order_id = Column(Integer, ForeignKey("Order.id"), primary_key=True, nullable=False)
    product_id = Column(Integer, ForeignKey("Product.id"), primary_key=True, nullable=False)
    quantity = Column(Integer)
    price = Column(Float)

    def __repr__(self) -> str:
        return f'OrderProduct(order_id={self.order_id}, product_id={self.product_id}, quantity={self.quantity}, price={self.price})'


class Payment(Base):
    __tablename__ = "Payment"
    id = Column(Integer, Identity(start=1), primary_key=True)
    payer_id = Column(Integer, ForeignKey("Payer.id"), nullable=False)
    customer_id = Column(Integer, ForeignKey("Customer.id"), nullable=False)
    amount = Column(Float)
    date = Column(DateTime)
    method = Column(Integer)

    def __repr__(self) -> str:
        return f'Payment(id={self.id}, payer_id={self.payer_id}, customer_id={self.customer_id}, \
            amount={self.amount}, date={self.date}, method={self.method})'


class Scratch(Base):
    __tablename__ = 'Scratch'
    key = Column(Text, primary_key=True)
    value = Column(Text, nullable=False)

    def __init__(self, key, value) -> None:
        self.key = key
        self.value = value
