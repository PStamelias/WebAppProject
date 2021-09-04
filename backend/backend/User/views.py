from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from User.models import user,UserInfo
from rest_framework.exceptions import AuthenticationFailed
from User.serializers import UserSerializer,UserInfoSerializer
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
			print("val1=",val1)
			if(val1!="null"):
				return Response(val1)
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
				data.append(p.id)
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
				break
		return Response(data,status=status.HTTP_200_OK)





class Email_Change(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		New_Email=request.data['new_email']
		done=False
		ide=-1
		Password=request.data['Password']
		Current_Email=request.data['current_email']
		for p in user.objects.all():
			p.Email_Address = p.Email_Address.replace("[", "")
			p.Email_Address = p.Email_Address.replace("]", "")
			p.Email_Address = p.Email_Address.replace("'", "")
			p.Password = p.Password.replace("[", "")
			p.Password = p.Password.replace("]", "")
			p.Password = p.Password.replace("'", "")
			if p.Password==Password and Current_Email==p.Email_Address:
				done=True
				ide=p.id
				break
		if done==False:
			raise AuthenticationFailed('Wrong Password')
		print(ide)
		print(New_Email)
		t = user.objects.get(id=ide)
		t.Email_Address=New_Email
		t.save()
		return Response(status=status.HTTP_200_OK)





class Password_Change(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		print("edwww ree")
		Email=request.data['current_email']
		current_password=request.data['current_password']
		new_password=request.data['new_password']
		ide=-1
		done=False
		for p in user.objects.all():
			p.Email_Address = p.Email_Address.replace("[", "")
			p.Email_Address = p.Email_Address.replace("]", "")
			p.Email_Address = p.Email_Address.replace("'", "")
			p.Password = p.Password.replace("[", "")
			p.Password = p.Password.replace("]", "")
			p.Password = p.Password.replace("'", "")
			if p.Password==current_password and Email==p.Email_Address:
				done=True
				ide=p.id
				break
		if done==False:
			raise AuthenticationFailed('Wrong Password')
		t = user.objects.get(id=ide)
		t.Password=new_password
		t.save()
		return Response(status=status.HTTP_200_OK)



class Data_Send(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		print(request.data)
		case=False
		ide=-1
		Current_Email=request.data['Email_Address']
		for p in UserInfo.objects.all():
			p.Email_Address = p.Email_Address.replace("[", "")
			p.Email_Address = p.Email_Address.replace("]", "")
			p.Email_Address = p.Email_Address.replace("'", "")
			if p.Email_Address==Current_Email:
				case=True
				ide=p.id
				break
		print(case)
		if case == True:
			t = UserInfo.objects.get(id=ide)
			if not request.data['Professional_Experience']: 
				t.Professional_Experience=request.data['Professional_Experience']
			if not request.data['Education']: 
				t.Education=request.data['Education']
			if not request.data['Skills']: 
				t.Skills=request.data['Skills']
			if not request.data['PrivateProf_Experience']: 
				t.PrivateProf_Experience=request.data['PrivateProf_Experience']
			if not request.data['PrivateEducation']: 
				t.PrivateEducation=request.data['PrivateEducation']
			if not request.data['PrivateSkills']: 
				t.PrivateSkills=request.data['PrivateSkills']	
			t.save()
			return Response(status=status.HTTP_200_OK)
		else:
			serializer=UserInfoSerializer(data=request.data)
			if serializer.is_valid():
				serializer.save()
			return Response(status=status.HTTP_200_OK)
