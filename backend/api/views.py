from django.shortcuts import render
from django.http import HttpResponse
from . import models

# Create your views here.

# CRUD for customers
def create_customer(request):
    if request.method == "POST":
        customer_name = request.POST.get("customer_name")
        customer = models.Customer.objects.create(customer_name=customer_name)
        return HttpResponse(f"Customer created: {customer}")
    return render(request, "create_customer.html")

def read_customers(request):
    customers = models.Customer.objects.all()
    return render(request, "read_customers.html", {"customers": customers})

def update_customer(request, customer_id):
    customer = models.Customer.objects.get(id=customer_id)
    if request.method == "PUT":
        customer.customer_name = request.PUT.get("customer_name")
        customer.save()
        return HttpResponse(f"Customer updated: {customer}")
    return render(request, "update_customer.html", {"customer": customer})

def delete_customer(request, customer_id):
    customer = models.Customer.objects.get(id=customer_id)
    if request.method == "DELETE":
        customer.delete()
        return HttpResponse("Customer deleted")
    return render(request, "delete_customer.html", {"customer": customer})
