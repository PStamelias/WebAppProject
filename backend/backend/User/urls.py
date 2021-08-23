from django.conf.urls import url 
from User import views
from django.urls import path, include

urlpatterns = [ 
    path('app/',views.App),
    path('register/',views.Reg)
]