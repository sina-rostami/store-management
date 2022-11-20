from flask import Flask, request
from backend.src.store import Store
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

store = Store()


@app.route('/login', methods=['POST', 'GET'])
def add_product():
    if request.method == 'POST':
        return store.add_product(request.form)
    elif request.method == 'GET':
        return store.get_products()
