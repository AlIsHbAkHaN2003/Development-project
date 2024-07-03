from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# MySQL Configuration
db_config = {
    'user': 'root',
    'password': 'zxcv.123',
    'host': 'localhost',
    'database': 'foodies_db'
}

# Database connection
def get_db_connection():
    try:
        conn = mysql.connector.connect(**db_config)
        return conn
    except mysql.connector.Error as err:
        print(f"Database connection error: {err}")
        raise


@app.route('/subscribe', methods=['POST'])
def subscribe():
    try:
        email = request.form['email']
        print(f"Received email: {email}")  # Debug print
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('INSERT INTO subscribers (email) VALUES (%s)', (email,))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Subscription successful!'}), 201
    except mysql.connector.Error as err:
        print(f"Database error: {err}")  # Log specific database error
        return jsonify({'message': 'Subscription failed due to database error. Please try again.'}), 500
    except Exception as e:
        print(f"General error: {e}")  # Log general error
        return jsonify({'message': 'Subscription failed due to an unknown error. Please try again.'}), 500


@app.route('/add_order', methods=['POST'])
def add_order():
    try:
        data = request.get_json()
        food_item = data['food_item']
        quantity = data['quantity']
        price = data['price']
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('INSERT INTO orders (food_item, quantity, price) VALUES (%s, %s, %s)', (food_item, quantity, price))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Order added successfully!'}), 201
    except mysql.connector.Error as err:
        print(f"Database error: {err}")  # Log specific database error
        return jsonify({'message': 'Order failed due to database error. Please try again.'}), 500
    except Exception as e:
        print(f"General error: {e}")  # Log general error
        return jsonify({'message': 'Order failed due to an unknown error. Please try again.'}), 500


if __name__ == "__main__":
    app.run(debug=True)