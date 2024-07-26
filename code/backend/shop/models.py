from django.db import models

class Product(models.Model):
    prodID = models.AutoField(primary_key=True)
    category = models.CharField(max_length=255)
    price = models.FloatField()
    prodType = models.CharField(max_length=255)
    prodBrand = models.CharField(max_length=255)
    description = models.TextField()
    warehouse = models.CharField(max_length=255)

    def __str__(self):
        return self.prodBrand


class Card(models.Model):
    cardID = models.AutoField(primary_key=True)
    billAddress = models.CharField(max_length=255)

    def __str__(self):
        return str(self.cardID)


class ShoppingCart(models.Model):
    shopCartID = models.AutoField(primary_key=True)
    prodID = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.shopCartID)


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
    shopCartID = models.ForeignKey(ShoppingCart, on_delete=models.CASCADE)
    Cusname = models.CharField(max_length=255)
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


class Warehouse(models.Model):
    address = models.CharField(primary_key=True, max_length=255)
    totalQuantity = models.IntegerField()
    maxQuantity = models.IntegerField()
    staffID = models.ForeignKey(Staff, on_delete=models.CASCADE)

    def __str__(self):
        return self.address
