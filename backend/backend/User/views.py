from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from User.models import user
from rest_framework.exceptions import AuthenticationFailed
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
		print(request.data['email'])
		serializer = UserSerializer(data=request.data)
		Email=request.data['email']
		Password=request.data['Password']
		val=serializer.check_superuser(request.data)
		if(val==True):
			return Response("Admin")
		else:
			val1=serializer.check_user(request.data)
			print("vgika")
			if(val1==True):
				return Response("User")
			else:
				raise AuthenticationFailed('User not found!')

			return Response("data")

class Register(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		serializer = UserSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response("data")
		else:
			raise ValidationError

class Info(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		#queryset = user.objects.filter(Email_Address = request.data['email'])
		#user_serializer = UserSerializer(queryset)
		#print(user_serializer.data)
		print("enter edw ")
		return Response("data")