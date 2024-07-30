from django.contrib import admin
from .models import *

admin.site.register(Product)
admin.site.register(Warehouse)
admin.site.register(Staff)
admin.site.register(Card)
admin.site.register(Customer)
admin.site.register(ShoppingCart)
admin.site.register(Orders)