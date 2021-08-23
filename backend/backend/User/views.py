from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from User.models import user
from User.serializers import UserSerializer
from rest_framework.decorators import api_view


# Create your views here.
@api_view(['POST'])
def App(request):
	return null







@api_view(['POST'])
def Reg(request):
	return null