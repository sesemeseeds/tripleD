from rest_framework import serializers
from .models import Product, Warehouse, Staff

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class WarehouseSerializer(serializers.ModelSerializer):
    staffID = serializers.PrimaryKeyRelatedField(queryset=Staff.objects.all())

    class Meta:
        model = Warehouse
        fields = '__all__'

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'
