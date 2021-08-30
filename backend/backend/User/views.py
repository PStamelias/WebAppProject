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
		serializer = UserSerializer(data=request.data)
		Email=request.data['Email_Address']
		Password=request.data['Password']
		val=serializer.check_superuser(request.data)
		if(val==True):
			return Response("Admin")
		else:
			val1=serializer.check_user(request.data)
		#myuser = user.objects.filter(Email_Address=Email).first()
		#if myuser is None:
		#	val=check_suseruser(Email)
		#	if(val==False)
		#		raise AuthenticationFailed('User not found!')	
		#	else:
		#		Response("Admin")
		return Response("data")


class Register(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		serializer = UserSerializer(data=request.data)
		val=serializer.is_valid()
		if(val==True):
			serializer.save()
			return Response("data")
		else:
			raise ValidationError