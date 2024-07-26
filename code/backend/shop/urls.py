from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, WarehouseViewSet, StaffViewSet

router = DefaultRouter()
router.register('products', ProductViewSet)
router.register('warehouses', WarehouseViewSet)
router.register('staff', StaffViewSet)

urlpatterns = router.urls