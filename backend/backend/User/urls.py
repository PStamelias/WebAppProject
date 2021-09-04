from django.conf.urls import url 
from User.views import *
from django.urls import path, include



urlpatterns = [ 
    path('app/',Login.as_view()),
    path('userList/',Register.as_view()),
    path('retrieve/',Info_User.as_view()),
    path('Email_Change/',Email_Change.as_view()),
    path('Password_Change/',Password_Change.as_view()),
    path('Data_Send/',Data_Send.as_view())
]