from rest_framework import viewsets
from .models import Product, Warehouse
from .serializers import ProductSerializer, WarehouseSerializer
from django.http import HttpResponse

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class WarehouseViewSet(viewsets.ModelViewSet):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseSerializer

def home(request):
    return HttpResponse("Welcome to the tripleD Shop API")
