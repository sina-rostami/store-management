from enum import Enum
from functools import wraps

import jwt
from flask import Flask, request, jsonify
from jwt import ExpiredSignatureError
from werkzeug.exceptions import BadRequest
from security import Security
from backend import Backend
from database_handler import Seller

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
app.config['SECRET_KEY'] = 'your secret key'


class StatusCode(Enum):
    NOT_FOUND = 404
    BAD_REQUEST = 400
    OK = 200
    INTERNAL_ERROR = 500
    WRONG_PASSWORD = 401


backend = Backend()


# decorator for verifying the JWT
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers.get('x-access-token')
        if not token:
            return jsonify({'message': 'Token is missing !!'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], "HS256")
            current_user = backend.seller_manager.find_by_username(data['username'])

        except ExpiredSignatureError:
            return jsonify({
                'message': 'Token is Expired !!'
            }), 401

        except:
            return jsonify({
                'message': 'Token is invalid !!'
            }), 401

        return f(current_user, *args, **kwargs)

    return decorated


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


@app.route('/login', methods=['POST'])
def login():
    # creates dictionary of form data
    auth = request.form
    if not auth or not auth.get('username') or not auth.get('password'):
        # returns 401 if any email or / and password is missing
        return jsonify(
            'USERNAME_AND_PASSWORD_REQUIRED',
            400,
            {'WWW-Authenticate': 'Basic realm ="Login required !!"'}
        )
    return backend.security.authorize(auth)


@app.route('/add-seller', methods=['POST'])
@token_required
def add_seller(f):
    data = request.json

    return backend.seller_manager.create_seller(data)


@app.route('/edit-account', methods=['POST'])
@token_required
def edit_profile(f):
    data = request.json

    return backend.seller_manager.edit_account(data)


if __name__ == "__main__":
    # setting debug to True enables hot reload
    # and also provides a debugger shell
    # if you hit an error while running the server
    app.run(debug=True)
