from django.contrib import admin
from .models import Customer, Product, Order

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer_name')
    search_fields = ('customer_name',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'product_name', 'price', 'stock')
    search_fields = ('product_name',)
    list_filter = ('price',)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'product', 'quantity', 'order_date')
    list_filter = ('order_date', 'product')
    search_fields = ('customer__customer_name',)
