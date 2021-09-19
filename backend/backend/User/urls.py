from django.conf.urls import url 
from User.views import *
from django.urls import path, include



urlpatterns = [ 
    path('app/',Login.as_view()),
    path('userList/',Register.as_view()),
    path('retrieve/',Info_User.as_view()),
    path('Email_Change/',Email_Change.as_view()),
    path('Password_Change/',Password_Change.as_view()),
    path('Data_Send/',Data_Send.as_view()),
    path('GetUsers/',GetUsers.as_view()),
    path('GetId/',GetId.as_view()),
    path('GetAllInfo/',GetAllInfo.as_view()),
    path('SearchEmail/',SearchEmail.as_view()),
    path('GetAds/',GetAds.as_view()),
    path('SubmitAd/',SubmitAd.as_view()),
    path('GetLinks/',GetLinks.as_view()),
    path('getMyArticles/',getMyArticles.as_view()),
    path('CheckIfExists/',CheckIfExists.as_view()),
    path('PostArticle/',PostArticle.as_view()),
    path('Send_Request/',Send_Request.as_view()),
    path('CheckIfFriend/',CheckIfFriend.as_view())
]