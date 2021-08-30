from django.conf.urls import url 
from User.views import *
from django.urls import path, include



urlpatterns = [ 
    path('app/',Login.as_view()),
    path('userList/',Register.as_view())
]