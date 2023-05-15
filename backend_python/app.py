from flask import Flask, render_template, request, redirect, session, url_for, jsonify
import mysql.connector
import json
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
app.secret_key = "SecC"
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

mydb = mysql.connector.connect(
    host="127.0.0.1", user="root", password="", database="campuscart"
)

@app.route("/signup", methods=["GET", "POST", "OPTIONS"])
def signup():
    if request.method == "POST":
        # Add your SQL query to insert the student's data into the database
        json_data = json.loads(request.data.decode('utf-8'))
        mycursor = mydb.cursor()
        sql = "INSERT INTO Users(FirstName, LastName, Email, Password, Address, Role) VALUES (%s, %s, %s, %s, %s, %s)"
        val = (
            json_data["first_name"],
            json_data["last_name"],
            json_data["email"],
            json_data["password"],
            json_data["address"],
            json_data["type"]
        )
        mycursor.execute(sql, val)
        mydb.commit()

        response = jsonify({"message": "Successfully signed up"})
        return response
    response = jsonify({"message": "Cant perform this action"})
    return response


@app.route("/login", methods=["POST"])
def login():
    # Get user credentials from request body
    json_data = request.json
    email = json_data.get("email")
    password = json_data.get("password")

    # Check if user with given email and password exists in the database
    mycursor = mydb.cursor()
    sql = "SELECT * FROM Users WHERE Email = %s AND Password = %s"
    val = (email, password)
    mycursor.execute(sql, val)
    user = mycursor.fetchone()
    print(user)

    # If user is found, return success message
    if user:
        response = jsonify({"message": "Login successful", "userid": user[0], "role": user[6], "first_name": user[1], "last_name": user[2], "address": user[5], "email": user[3]})
        return response
    else:
        response = jsonify({"message": "Invalid email or password"})
        return response
    
@app.route("/search_by_name", methods=["POST"])
def search_by_name():
    # Get the search query from the URL parameter
    json_data = request.json
    search_query = json_data.get("search")
    
    # Execute the SQL query to search for products by name
    mycursor = mydb.cursor()
    sql = "SELECT * FROM Products WHERE Name LIKE %s"
    val = ("%" + search_query + "%",)
    mycursor.execute(sql, val)
    results = mycursor.fetchall()
    
    # Create a list of dictionaries to store the search results
    search_results = []
    for result in results:
        search_results.append({
            "product_id": result[0],
            "name": result[1],
            "description": result[2],
            "price": result[3],
            "seller_id": result[4]
        })
    
    # Return the search results as a JSON response
    return jsonify({"results": search_results})


@app.route('/add_product', methods=['POST'])
def add_product():
    # get product details from request
    json_data = request.json
    product_name = json_data.get('productName')
    product_description = json_data.get('description')
    product_price = json_data.get('price')
    seller_id = json_data.get ('sellerid')
    
    # connect to the database
    mycursor = mydb.cursor()
    # insert new product into the table
    sql = "INSERT INTO products (Name, Description, Price, SellerID) \
           VALUES (%s, %s, %s, %s)"
    val = (product_name, product_description, product_price, seller_id)
    mycursor.execute(sql, val)
    mydb.commit()
    
    # return success message
    response = jsonify({'message': 'Product added successfully.'})
    return response

@app.route("/order-history/<int:user_id>", methods=["POST"])
def order_history(user_id):
    mycursor = mydb.cursor()

    # Retrieve all orders for a given user
    sql = "SELECT OrderDate, Name, OrderID, ProductID FROM Orders NATURAL JOIN Products WHERE UserId = %s "
    mycursor.execute(sql, (user_id,))
    orders = mycursor.fetchall()

    order_history = []
    for order in orders:
        # Create dictionary with order information
        order_info = {
            "order_date": order[0],
            "product_name":order[1],
            "id": order[2],
            'productid': order[3]
        }
        # Add order information to order history
        order_history.append(order_info)
    
    response = jsonify({"order_history": order_history})
    return response

@app.route('/add_order', methods=['POST'])
def add_order():
    # get order details from request
    json_data = request.json
    order_date = datetime.today().strftime('%Y-%m-%d')
    user_id = json_data.get('userId')
    product_id = json_data.get('productID')
    
    # connect to the database
    mycursor = mydb.cursor()
    # insert new order into the table
    sql = "INSERT INTO orders (OrderDate, UserID, ProductID) \
           VALUES (%s, %s , %s)"
    val = (order_date, user_id, product_id)
    mycursor.execute(sql, val)
    mydb.commit()
    
    # return success message
    response = jsonify({'message': 'Order added successfully.'})
    return response


@app.route("/rate_review", methods=["POST"])
def rate_review():
    json_data = json.loads(request.data.decode('utf-8'))
    product_id = json_data["product_id"]
    user_id = json_data["user_id"]
    rating = json_data["reviewVal"]
    review = json_data["review"]

    mycursor = mydb.cursor()

    # Insert the rating and review into the database
    sql = "INSERT INTO Reviews(UserID, ProductID, Rating, Comment) VALUES (%s, %s, %s, %s)"
    val = (user_id, product_id, rating, review)
    mycursor.execute(sql, val)
    mydb.commit()
    response = jsonify({"message": "Rating and review added successfully."})
    return response

@app.route("/user-reviews/<int:user_id>", methods=["POST"])
def user_reviews(user_id):
    mycursor = mydb.cursor()

    # Retrieve all reviews for products sold by a given user
    sql = "SELECT Reviews.Comment, Reviews.Rating, Products.Name FROM Reviews \
           INNER JOIN Products ON Reviews.ProductID = Products.ProductID \
           WHERE Products.SellerID = %s"
    mycursor.execute(sql, (user_id,))
    reviews = mycursor.fetchall()

    # Create list of dictionaries with review information
    review_list = []
    for review in reviews:
        review_info = {
            "comment": review[0],
            "rating": review[1],
            "product_name": review[2]
        }
        review_list.append(review_info)

    response = jsonify({"user_reviews": review_list})
    return response



if __name__ == "__main__":
    app.run(debug=True)
