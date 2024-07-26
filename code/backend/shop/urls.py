from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, WarehouseViewSet, home

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'warehouses', WarehouseViewSet)

urlpatterns = [
    path('', home, name='home'),
    path('api/', include(router.urls)),
]
