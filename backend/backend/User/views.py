from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from User.models import user,UserInfo,AD,Connection_Request,Article,Friend_List,Friend_Status,Friend_Request
from rest_framework.exceptions import AuthenticationFailed
from User.serializers import UserSerializer,UserInfoSerializer,ADSerializer,PersonADSerializer,ArticleSerializer,Friend_RequestSerializer
from django.core.exceptions import BadRequest
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, ParseError
import datetime


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


class GetUsers(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		data=[]
		for p in user.objects.all():
			p.Email_Address = p.Email_Address.replace("[", "")
			p.Email_Address = p.Email_Address.replace("]", "")
			p.Email_Address = p.Email_Address.replace("'", "")
			data.append(p.Email_Address)
		return Response({"keywords":data})


class GetId(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		data=[]
		for p in user.objects.all():
			data.append(p.id)
		return Response({"keywords":data})





class GetAllInfo(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		data=[]
		print(request.data['Email_Address'])
		for p in user.objects.all():
			p.Email_Address = p.Email_Address.replace("[", "")
			p.Email_Address = p.Email_Address.replace("]", "")
			p.Email_Address = p.Email_Address.replace("'", "")
			if p.Email_Address==request.data['Email_Address']:
				data.append(p.Email_Address)
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
				break
		for p in UserInfo.objects.all():
			if p.Email_Address==request.data['Email_Address']:
				p.Professional_Experience = p.Professional_Experience.replace("[", "")
				p.Professional_Experience = p.Professional_Experience.replace("]", "")
				p.Professional_Experience = p.Professional_Experience.replace("'", "")
				data.append(p.Professional_Experience)
				p.Education = p.Education.replace("[", "")
				p.Education = p.Education.replace("]", "")
				p.Education = p.Education.replace("'", "")
				data.append(p.Education)
				p.Skills = p.Skills.replace("[", "")
				p.Skills = p.Skills.replace("]", "")
				p.Skills = p.Skills.replace("'", "")
				data.append(p.Skills)
		return Response(data)









class SearchEmail(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		Email=request.data['email']
		ide=-1
		print("Search Email=              ",Email)
		done=False
		for p in user.objects.all():
			p.Email_Address = p.Email_Address.replace("[", "")
			p.Email_Address = p.Email_Address.replace("]", "")
			p.Email_Address = p.Email_Address.replace("'", "")
			if p.Email_Address==Email:
				print("mpika edw reeeeeeeeeeee")
				ide=p.id
				done=True
				break
		if done==False:
			raise AuthenticationFailed('Email not Found')
		data=[]
		data.append(ide)
		data.append(Email)
		return Response(data)		






class SubmitAd(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		Email_Address=request.data['Email_Address']
		NameAD=request.data['NameAD']
		TextAD=request.data['TextAD']
		AD=ADSerializer(data=request.data)
		if AD.is_valid():
			AD.save()
			return Response(status=status.HTTP_200_OK)
		else:
			raise ValidationError




class GetAds(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		print("kala eimaste")
		Email_Address=request.data["Email_Address"]
		print(Email_Address)
		data=[]
		for e in AD.objects.all():
			e.Email_Address = e.Email_Address.replace("[", "")
			e.Email_Address = e.Email_Address.replace("]", "")
			e.Email_Address = e.Email_Address.replace("'", "")
			if e.Email_Address==Email_Address:
				e.TextAD = e.TextAD.replace("[", "")
				e.TextAD = e.TextAD.replace("]", "")
				e.TextAD = e.TextAD.replace("'", "")
				data.append(e.TextAD)
				e.NameAD = e.NameAD.replace("[", "")
				e.NameAD = e.NameAD.replace("]", "")
				e.NameAD = e.NameAD.replace("'", "")
				data.append(e.NameAD)
		print(data) 
		return Response({"keywords":data})




class GetLinks(APIView):
	permission_classes =[AllowAny]
	def post(self,request,format=None):
		print("edw re mounopana")
		Email_Address=request.data["Email_Address"]
		data=[]
		for r in Friend_Request.objects.all():
			r.Email_Address_Receiver = r.Email_Address_Receiver.replace("[", "")
			r.Email_Address_Receiver = r.Email_Address_Receiver.replace("]", "")
			r.Email_Address_Receiver = r.Email_Address_Receiver.replace("'", "")
			if r.Email_Address_Receiver==Email_Address:
				r.Email_Address_Sender = r.Email_Address_Sender.replace("[", "")
				r.Email_Address_Sender = r.Email_Address_Sender.replace("]", "")
				r.Email_Address_Sender = r.Email_Address_Sender.replace("'", "")
				data.append(r.Email_Address_Sender)
				for k in user.objects.all():
					k.Email_Address = k.Email_Address.replace("[", "")
					k.Email_Address = k.Email_Address.replace("]", "")
					k.Email_Address = k.Email_Address.replace("'", "")
					if k.Email_Address==r.Email_Address_Sender:
						data.append(k.id)
						break
		return Response({"keywords":data})
		






class PostArticle(APIView):
	permission_classes=[AllowAny]
	def post(self,request,format=None):
		Email_Address=request.data['Email_Address']
		TextArticle=request.data['TextArticle']
		Date=request.data['Current_date']
		print(Email_Address)
		print(TextArticle)
		print(Date)
		art=ArticleSerializer(data=request.data)
		if art.is_valid():
			art.save()
			return Response(status=status.HTTP_200_OK)
		else:
			raise ValidationError





class getMyArticles(APIView):
	permission_classes=[AllowAny]
	def post(self,request,format=None):
		Email_Address=request.data['Email_Address']
		print(Email_Address)
		data=[]
		for e in Article.objects.all():
			e.Email_Address = e.Email_Address.replace("[", "")
			e.Email_Address = e.Email_Address.replace("]", "")
			e.Email_Address = e.Email_Address.replace("'", "")
			if e.Email_Address==Email_Address:
				e.Current_date = e.Current_date.replace("[", "")
				e.Current_date = e.Current_date.replace("]", "")
				e.Current_date = e.Current_date.replace("'", "")
				data.append(e.Current_date)
				e.TextArticle = e.TextArticle.replace("[", "")
				e.TextArticle = e.TextArticle.replace("]", "")
				e.TextArticle = e.TextArticle.replace("'", "")
				data.append(e.TextArticle)
				e.NameArticle = e.NameArticle.replace("[", "")
				e.NameArticle = e.NameArticle.replace("]", "")
				e.NameArticle = e.NameArticle.replace("'", "")
				data.append(e.NameArticle)
		my_list=[]
		data.reverse()
		print(data)
		print("---------------------------------------------")
		for k in data:
			print(k)
		return Response({"keywords":data})








class CheckIfFriend(APIView):
	permission_classes=[AllowAny]
	def post(self,request,format=None):
		print("mpika edw kiria mou pou nomizeis")
		Email_Address=request.data['Email_Address']
		search_value=request.data['Email_Address_Search']
		done=False
		for e in Friend_Status.objects.all():
			e.Email_Address = e.Email_Address.replace("[", "")
			e.Email_Address = e.Email_Address.replace("]", "")
			e.Email_Address = e.Email_Address.replace("'", "")
			if e.Email_Address==Email_Address:
				for k in e.Friend_List.objects.all():
					if k.Email_Address==search_value:
						done=True
						break
		print("done=",done)
		if done==True:
			return Response("Yes")
		else:
			raise ValidationError




class CheckIfExists(APIView):
	permission_classes=[AllowAny]
	def post(self,request,format=None):
		Email_Address=request.data['Email_Address']
		done=False
		print("enter edw pera re mounopana")
		for e in user.objects.all():
			e.Email_Address = e.Email_Address.replace("[", "")
			e.Email_Address = e.Email_Address.replace("]", "")
			e.Email_Address = e.Email_Address.replace("'", "")
			if e.Email_Address==Email_Address:
				done=True
				break
		if done==True:
			return Response("Exists")
		else:
			raise ValidationError






class Send_Request(APIView):
	permission_classes=[AllowAny]
	def post(self,request,format=None):
		New_Request=Friend_RequestSerializer(data=request.data)
		print("kala eimaste")
		if New_Request.is_valid():
			New_Request.save()
			return Response(status=status.HTTP_200_OK)
		else:
			raise ValidationError