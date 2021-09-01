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

class Info_User(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		print("enter edw ")
		data=[]
		Email=request.data['email']
		for p in user.objects.all():
			p.Email_Address = p.Email_Address.replace("[", "")
			p.Email_Address = p.Email_Address.replace("]", "")
			p.Email_Address = p.Email_Address.replace("'", "")
			if p.Email_Address==Email:
				p.Name = p.Name.replace("[", "")
				p.Name = p.Name.replace("]", "")
				p.Name = p.Name.replace("'", "")
				data.append(p.Name)
				p.Surname = p.Surname.replace("[", "")
				p.Surname = p.Surname.replace("]", "")
				p.Surname = p.Surname.replace("'", "")
				data.append(p.Surname)
				p.Phone_Number = p.Phone_Number.replace("[", "")
				p.Phone_Number = p.Phone_Number.replace("]", "")
				p.Phone_Number = p.Phone_Number.replace("'", "")
				data.append(p.Phone_Number)
				if p.Biography is not None:
					p.Biography = p.Biography.replace("[", "")
					p.Biography = p.Biography.replace("]", "")
					p.Biography = p.Biography.replace("'", "")
					data.append(p.Biography)
				else:
					data.append("")
				if p.Professional_Experience is not None:
					p.Professional_Experience = p.Professional_Experience.replace("[", "")
					p.Professional_Experience = p.Professional_Experience.replace("]", "")
					p.Professional_Experience = p.Professional_Experience.replace("'", "")
					data.append(p.Professional_Experience)
				else:
					data.append("")
				break
		return Response(data,status=status.HTTP_200_OK)