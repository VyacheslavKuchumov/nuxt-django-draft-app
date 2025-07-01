from django.urls import path
from . import views


urlpatterns = [
    path('customers/create/', views.create_customer, name='create_customer'),
    path('customers/read/', views.read_customers, name='read_customers'),
    path('customers/update/<int:customer_id>/', views.update_customer, name='update_customer'),
    path('customers/delete/<int:customer_id>/', views.delete_customer, name='delete_customer'),
]