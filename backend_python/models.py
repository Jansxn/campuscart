from app import db, ma
from datetime import datetime


class User(db.Model):
    UserID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    FirstName = db.Column(db.String(50), nullable=False)
    LastName = db.Column(db.String(50), nullable=False)
    Email = db.Column(db.String(50), unique=True, nullable=False)
    Password = db.Column(db.String(100), nullable=False)
    Address = db.Column(db.String(100), nullable=False)
    Role = db.Column(db.Enum('buyer', 'seller'), nullable=False)


class Product(db.Model):
    ProductID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Name = db.Column(db.String(100), nullable=False)
    Description = db.Column(db.String(255), nullable=False)
    ImageURL = db.Column(db.String(255), nullable=False)
    Category = db.Column(db.String(50), nullable=False)
    Price = db.Column(db.DECIMAL(10,2), nullable=False)
    Stock = db.Column(db.Integer, nullable=False)
    SellerID = db.Column(db.Integer, db.ForeignKey('user.UserID'), nullable=False)
    Seller = db.relationship('User', backref=db.backref('products', lazy=True))


class Order(db.Model):
    OrderID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    OrderDate = db.Column(db.DateTime(), default=datetime.utcnow, nullable=False)
    UserID = db.Column(db.Integer, db.ForeignKey('user.UserID'), nullable=False)
    User = db.relationship('User', backref=db.backref('orders', lazy=True))
    
class OrderItem(db.Model):
    OrderItemID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    OrderID = db.Column(db.Integer, db.ForeignKey('order.OrderID'), nullable=False)
    ProductID = db.Column(db.Integer, db.ForeignKey('product.ProductID'), nullable=False)
    Quantity = db.Column(db.Integer, nullable=False)
    Order = db.relationship('Order', backref=db.backref('items', lazy=True))
    Product = db.relationship('Product', backref=db.backref('orders', lazy=True))

class Review(db.Model):
    ReviewID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserID = db.Column(db.Integer, db.ForeignKey('user.UserID'), nullable=False)
    ProductID = db.Column(db.Integer, db.ForeignKey('product.ProductID'), nullable=False)
    Rating = db.Column(db.Integer, nullable=False)
    Comment = db.Column(db.Text)
    User = db.relationship('User', backref=db.backref('reviews', lazy=True))
    Product = db.relationship('Product', backref=db.backref('reviews', lazy=True))



class UserSchema(ma.Schema):
    class Meta:
        fields = ("UserID", "FirstName", "LastName", "Email", "Password", "Address", "PhoneNumber", "Role")


user_schema = UserSchema()
users_schema = UserSchema(many=True)


class ProductSchema(ma.Schema):
    class Meta:
        fields = ("ProductID", "Name", "Description", "ImageURL", "Category", "Price", "Stock", "SellerID")


product_schema = ProductSchema()
products_schema = ProductSchema(many=True)


class OrderSchema(ma.Schema):
    class Meta:
        fields = ("OrderID", "OrderDate", "UserID")


order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)


class OrderItemSchema(ma.Schema):
    class Meta:
        fields = ("OrderItemID", "OrderID", "ProductID", "Quantity")
        
orderitem_schema = OrderItemSchema()
orderitems_schema = OrderItemSchema(many=True)

class ReviewSchema(ma.Schema):
    class Meta:
        fields = ("ReviewID", "UserID", "ProductID", "Rating", "Comment")

review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)