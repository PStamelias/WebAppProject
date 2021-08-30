from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from User.models import user
from User.serializers import UserSerializer
from django.core.exceptions import BadRequest
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, ParseError


# Create your views here.
class Login(APIView):
	permission_classes = [AllowAny]
	def post(self,request,format=None):
		print("nikos")


class Register(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		name=request.data['Name']
		mistos=['kala','nikos']
		print(name)
		raise ValidationError