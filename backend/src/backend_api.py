from enum import Enum

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.exceptions import BadRequest

from backend import Backend
from security.security import token_required

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
CORS(app)


class StatusCode(Enum):
    NOT_FOUND = 404
    BAD_REQUEST = 400
    OK = 200
    INTERNAL_ERROR = 500
    WRONG_PASSWORD = 401


backend = Backend()


@app.route('/order', methods=['POST'])
@token_required
def place_order():
    try:
        did_success, message = backend.seller_manager.place_order(request.json)
        if not did_success:
            return jsonify({'message': message}), StatusCode.BAD_REQUEST.value

        return jsonify({'message': message}), StatusCode.OK.value
    except KeyError as e:
        return jsonify({'message': f'{e} is not defined in the json data.'}), StatusCode.BAD_REQUEST.value
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), StatusCode.BAD_REQUEST.value
    except Exception as e:
        return jsonify({'message': f'An error occurred while placing order : {e}'}), StatusCode.INTERNAL_ERROR.value


@app.route('/order', methods=['GET'])
def get_orders():
    try:
        return jsonify(backend.seller_manager.get_all_orders_as_json()), StatusCode.OK.value
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), StatusCode.BAD_REQUEST.value
    except Exception as e:
        return jsonify({'message': f'An error occurred while placing order : {e}'}), StatusCode.INTERNAL_ERROR.value


@app.route('/customer', methods=['GET'])
def get_customers():
    try:
        return jsonify(backend.customer_manager.get_all_customers_as_json()), StatusCode.OK.value
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), StatusCode.BAD_REQUEST.value
    except Exception as e:
        return jsonify({'message': f'An error occurred while placing order : {e}'}), StatusCode.INTERNAL_ERROR.value


@app.route('/product', methods=['GET'])
def get_products():
    try:
        return jsonify(backend.product_manager.get_all_products_as_json()), StatusCode.OK.value
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), StatusCode.BAD_REQUEST.value
    except Exception as e:
        return jsonify({'message': f'An error occurred while placing order : {e}'}), StatusCode.INTERNAL_ERROR.value


@app.route('/seller', methods=['GET'])
def get_sellers():
    try:
        return jsonify(backend.seller_manager.get_all_sellers_as_json()), StatusCode.OK.value
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), StatusCode.BAD_REQUEST.value
    except Exception as e:
        return jsonify({'message': f'An error occurred while placing order : {e}'}), StatusCode.INTERNAL_ERROR.value
