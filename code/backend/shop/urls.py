from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, WarehouseViewSet, StaffViewSet, CardViewSet, OrdersViewSet, CustomerViewSet, ShoppingCartViewSet

router = DefaultRouter()
router.register('products', ProductViewSet)
router.register('warehouses', WarehouseViewSet)
router.register('staff', StaffViewSet)
router.register('card', CardViewSet)
router.register('customer', CustomerViewSet)
router.register('orders', OrdersViewSet)
router.register('shoppingcart', ShoppingCartViewSet)

urlpatterns = router.urls