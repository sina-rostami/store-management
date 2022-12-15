from functools import wraps
from http import HTTPStatus

import jwt
from flask import Flask, request, jsonify, make_response
from jwt import ExpiredSignatureError
from werkzeug.exceptions import BadRequest

from backend import Backend
from database_handler import Seller

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
app.config['SECRET_KEY'] = 'your secret key'

backend = Backend()


# decorator for verifying the JWT
def normal_authorization(f):
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
            if not current_user:
                current_user = backend.find_admin(data['username'])
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


def admin_authorization(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers.get('x-access-token')
        if not token:
            return jsonify({'message': 'Token is missing !!'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], "HS256")
            current_user = backend.find_admin(data['username'])
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


def check_fields(data, fields):
    if not data:
        return make_response(
            jsonify({'message': 'EXPECTED_DATA', 'code': HTTPStatus.BAD_REQUEST, 'status': 'failed'}),
            HTTPStatus.BAD_REQUEST)
    for x in fields:
        if not data.get(x):
            raise BadRequest("EXPECTED_" + x.upper())


@app.route('/order', methods=['POST'])
@normal_authorization
def place_order():
    try:
        did_success, message = backend.seller_manager.place_order(request.json)
        if not did_success:
            return jsonify({'message': message}), HTTPStatus.BAD_REQUEST

        return jsonify({'message': message}), HTTPStatus.OK
    except KeyError as e:
        return jsonify({'message': f'{e} is not defined in the json data.'}), HTTPStatus.BAD_REQUEST
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while placing order : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/order', methods=['GET'])
def get_orders():
    try:
        return jsonify(backend.seller_manager.get_all_orders_as_json()), HTTPStatus.OK
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while placing order : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/customer', methods=['GET'])
def get_customers():
    try:
        return jsonify(backend.customer_manager.get_all_customers_as_json()), HTTPStatus.OK
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while placing order : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/product', methods=['GET'])
def get_products():
    try:
        return jsonify(backend.product_manager.get_all_products_as_json()), HTTPStatus.OK
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while placing order : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/seller', methods=['GET'])
def get_sellers():
    try:
        return jsonify(backend.seller_manager.get_all_sellers_as_json()), HTTPStatus.OK
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while placing order : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/login', methods=['POST'])
def login():
    auth = request.form
    try:
        check_fields(auth, {'username', 'password'})
        return backend.security.authorize(auth)
    except BadRequest as e:
        return make_response(
            jsonify({'message': e.description, 'code': HTTPStatus.BAD_REQUEST, 'status': 'failed'}),
            HTTPStatus.BAD_REQUEST)


@app.route('/seller', methods=['POST'])
@admin_authorization
def add_seller(current_user):
    data = request.json
    try:
        check_fields(data, {'username', 'name', 'password'})
        return backend.seller_manager.create_seller(data)
    except BadRequest as e:
        return make_response(
            jsonify({'message': e.description, 'code': HTTPStatus.BAD_REQUEST, 'status': 'failed'}),
            HTTPStatus.BAD_REQUEST)


@app.route('/seller', methods=['PUT'])
@normal_authorization
def edit_profile(current_user):
    data = request.json

    if isinstance(current_user, Seller) and current_user.username != data.get('old_username'):
        return make_response(jsonify({'message': 'FORBIDDEN', 'code': HTTPStatus.FORBIDDEN, 'status': 'failed'}),
                             HTTPStatus.FORBIDDEN)

    try:
        check_fields(data, {'username', 'name', 'password'})
        return backend.seller_manager.edit_account(data, current_user)
    except BadRequest as e:
        return make_response(
            jsonify({'message': e.description, 'code': HTTPStatus.BAD_REQUEST, 'status': 'failed'}),
            HTTPStatus.BAD_REQUEST)


@app.route('/user', methods=['GET'])
@normal_authorization
def get_user(current_user):
    try:
        if isinstance(current_user, Seller):
            role = 'SELLER'
        else:
            role = 'ADMIN'

        return make_response(
            jsonify(
                {
                    'message': 'USER_RETURNED',
                    'code': 200,
                    'status': 'success',
                    'data': {
                        'username': current_user.username,
                        'role': role
                    }
                }
            )
            , 200)
    except BadRequest as e:
        return make_response(
            jsonify({'message': e.description, 'code': HTTPStatus.BAD_REQUEST, 'status': 'failed'}),
            HTTPStatus.BAD_REQUEST)


if __name__ == "__main__":
    # setting debug to True enables hot reload
    # and also provides a debugger shell
    # if you hit an error while running the server
    app.run(debug=True)


@app.route('/login', methods=['POST'])
def login():
    auth = request.form
    try:
        check_fields(auth, {'username', 'password'})
        return backend.security.authorize(auth)
    except BadRequest as e:
        return make_response(
            jsonify({'message': e.description, 'code': HTTPStatus.BAD_REQUEST, 'status': 'failed'}),
            HTTPStatus.BAD_REQUEST)


@app.route('/seller', methods=['POST'])
@admin_authorization
def add_seller(current_user):
    data = request.json
    try:
        check_fields(data, {'username', 'name', 'password'})
        return backend.seller_manager.create_seller(data)
    except BadRequest as e:
        return make_response(
            jsonify({'message': e.description, 'code': HTTPStatus.BAD_REQUEST, 'status': 'failed'}),
            HTTPStatus.BAD_REQUEST)


@app.route('/seller', methods=['PUT'])
@normal_authorization
def edit_profile(current_user):
    data = request.json

    if isinstance(current_user, Seller) and current_user.username != data.get('old_username'):
        return make_response(jsonify({'message': 'FORBIDDEN', 'code': HTTPStatus.FORBIDDEN, 'status': 'failed'}),
                             HTTPStatus.FORBIDDEN)

    try:
        check_fields(data, {'username', 'name', 'password'})
        return backend.seller_manager.edit_account(data, current_user)
    except BadRequest as e:
        return make_response(
            jsonify({'message': e.description, 'code': HTTPStatus.BAD_REQUEST, 'status': 'failed'}),
            HTTPStatus.BAD_REQUEST)


if __name__ == "__main__":
    # setting debug to True enables hot reload
    # and also provides a debugger shell
    # if you hit an error while running the server
    app.run(debug=True)
