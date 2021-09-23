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
    path('setLike/',setLike.as_view()),
    path('GetId/',GetId.as_view()),
    path('SendReqAd/',SendReqAd.as_view()),
    path('setComment/',setComment.as_view()),
    path('GetLikes/',GetLikes.as_view()),
    path('GetComments/',GetComments.as_view()),
    path('ReturnId/',ReturnId.as_view()),
    path('getFrArticles/',getFrArticles.as_view()),
    path('GetAllInfo/',GetAllInfo.as_view()),
    path('SearchEmail/',SearchEmail.as_view()),
    path('GetAllInfoNonSecret/',GetAllInfoNonSecret.as_view()),
    path('GetAds/',GetAds.as_view()),
    path('SubmitAd/',SubmitAd.as_view()),
    path('GetLinks/',GetLinks.as_view()),
    path('getMyArticles/',getMyArticles.as_view()),
    path('CheckIfExists/',CheckIfExists.as_view()),
    path('PostArticle/',PostArticle.as_view()),
    path('Send_Request/',Send_Request.as_view()),
    path('RejectRequest/',RejectRequest.as_view()),
    path('GetAdsFromFriends/',GetAdsFromFriends.as_view()),
    path('GetAdsFromOthers/',GetAdsFromOthers.as_view()),
    path('AcceptRequest/',AcceptRequest.as_view()),
    path('GetFriends/',GetFriends.as_view()),
    path('AcceptRequestRoundTwo/',AcceptRequestRoundTwo.as_view()),
    path('CheckIfFriend/',CheckIfFriend.as_view())
]