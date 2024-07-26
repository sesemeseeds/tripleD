from rest_framework import viewsets
from .models import Product, Warehouse, Staff
from .serializers import ProductSerializer, WarehouseSerializer, StaffSerializer
from django.http import HttpResponse

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class WarehouseViewSet(viewsets.ModelViewSet):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseSerializer

class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

def home(request):
    return HttpResponse("Welcome to the tripleD Shop API")
