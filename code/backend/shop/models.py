from django.db import models

class Warehouse(models.Model):
    WAREHOUSE_CHOICES = [
        ('123 Main St, Cincinnati, OH', '123 Main St, Cincinnati, OH'),
        ('5323 Elm St, Spookane, WA', '5323 Elm St, Spookane, WA'),
        ('69420 Vine St, Poopietown, GA', '69420 Vine St, Poopietown, GA'),
    ]
    
    address = models.CharField(max_length=255, choices=WAREHOUSE_CHOICES, primary_key=True)
    totalQuantity = models.IntegerField()
    maxQuantity = models.IntegerField()
    staffID = models.ForeignKey('Staff', on_delete=models.CASCADE)

    def __str__(self):
        return self.address

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('Food', 'Food'),
        ('Clothing', 'Clothing'),
        ('Toys', 'Toys'),
        ('Electronics', 'Electronics'),
        ('Home & Kitchen', 'Home & Kitchen'),
        ('Beauty & Personal Care', 'Beauty & Personal Care'),
        ('Sports', 'Sports'),
        ('Health', 'Health'),
        ('Books & Media', 'Books & Media'),
        ('Automotive', 'Automotive'),
        ('Office', 'Office'),
        ('Pet Supplies', 'Pet Supplies'),
    ]
    
    prodID = models.AutoField(primary_key=True)
    prodName = models.CharField(max_length=255)
    prodBrand = models.CharField(max_length=255)
    prodDescription = models.TextField()
    prodCategory = models.CharField(max_length=255, choices=CATEGORY_CHOICES)
    price = models.FloatField()
    quantity = models.IntegerField()
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE)

    def __str__(self):
        return self.prodBrand

class Card(models.Model):
    cardID = models.AutoField(primary_key=True)
    cardNumber = models.CharField(max_length=16)
    billAddress = models.CharField(max_length=255)

    def __str__(self):
        return str(self.cardID)

class Orders(models.Model):
    orderID = models.AutoField(primary_key=True)
    prodID = models.ForeignKey(Product, on_delete=models.CASCADE)
    orderDate = models.DateField()
    status = models.IntegerField()
    cardID = models.ForeignKey(Card, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.orderID)

class Customer(models.Model):
    accountID = models.AutoField(primary_key=True)
    cusName = models.CharField(max_length=255)
    cusAddress = models.CharField(max_length=255)
    cardID = models.ForeignKey(Card, on_delete=models.CASCADE)

    def __str__(self):
        return self.Cusname

class Staff(models.Model):
    staffID = models.AutoField(primary_key=True)
    staffName = models.CharField(max_length=255)
    staffAddress = models.CharField(max_length=255)
    salary = models.IntegerField()
    job = models.CharField(max_length=255)

    def __str__(self):
        return self.staffName