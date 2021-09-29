from django.shortcuts import render
from django.http.response import JsonResponse
import json
from rest_framework.parsers import JSONParser 
from rest_framework import status
from User.models import user,Discussion,UserInfo,AD,Connection_Request,Article,Friend_Status,Friend_Request
from rest_framework.exceptions import AuthenticationFailed
from User.serializers import UserSerializer,UserInfoSerializer,DiscussionSerializer,Friend_StatusSerializer,ADSerializer,ArticleSerializer,Friend_RequestSerializer
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
		serializer = UserSerializer(data=request.data)
		Email=request.data['email']
		Password=request.data['Password']
		val=serializer.check_superuser(request.data)
		if(val==True):
			return Response("Admin")
		else:
			val1=serializer.check_user(request.data)
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
		t = user.objects.get(id=ide)
		t.Email_Address=New_Email
		t.save()
		return Response(status=status.HTTP_200_OK)





class Password_Change(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
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
			p.Email_Address = p.Email_Address.replace("[", "")
			p.Email_Address = p.Email_Address.replace("]", "")
			p.Email_Address = p.Email_Address.replace("'", "")
			if p.Email_Address==request.data['Email_Address']:
				p.Professional_Experience = p.Professional_Experience.replace("[", "")
				p.Professional_Experience = p.Professional_Experience.replace("]", "")
				p.Professional_Experience = p.Professional_Experience.replace("'", "")
				p.PrivateProf_Experience = p.PrivateProf_Experience.replace("[", "")
				p.PrivateProf_Experience = p.PrivateProf_Experience.replace("]", "")
				p.PrivateProf_Experience = p.PrivateProf_Experience.replace("'", "")
				if p.PrivateProf_Experience=="false" :
					data.append(p.Professional_Experience)
				else:
					data.append("Hidden Info")
				p.Education = p.Education.replace("[", "")
				p.Education = p.Education.replace("]", "")
				p.Education = p.Education.replace("'", "")
				p.PrivateEducation = p.PrivateEducation.replace("[", "")
				p.PrivateEducation = p.PrivateEducation.replace("]", "")
				p.PrivateEducation = p.PrivateEducation.replace("'", "")
				if p.PrivateEducation=="false":
					data.append(p.Education)
				else:
					data.append("Hidden Info")
				p.Skills = p.Skills.replace("[", "")
				p.Skills = p.Skills.replace("]", "")
				p.Skills = p.Skills.replace("'", "")
				p.PrivateSkills = p.PrivateSkills.replace("[", "")
				p.PrivateSkills = p.PrivateSkills.replace("]", "")
				p.PrivateSkills = p.PrivateSkills.replace("'", "")
				if p.PrivateSkills=="false":
					data.append(p.Skills)
				else:
					data.append("Hidden Info")
		return Response(data)









class SearchEmail(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		Email=request.data['email']
		ide=-1
		done=False
		for p in user.objects.all():
			p.Email_Address = p.Email_Address.replace("[", "")
			p.Email_Address = p.Email_Address.replace("]", "")
			p.Email_Address = p.Email_Address.replace("'", "")
			if p.Email_Address==Email:
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
		Email_Address=request.data["Email_Address"]
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
		return Response({"keywords":data})




class GetLinks(APIView):
	permission_classes =[AllowAny]
	def post(self,request,format=None):
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
		return Response({"keywords":data})








class CheckIfFriend(APIView):
	permission_classes=[AllowAny]
	def post(self,request,format=None):
		Email_Address=request.data['Email_Address']
		search_value=request.data['Email_Address_Search']
		done=False
		users=[]
		stringbuild=""
		mystring=""
		for e in Friend_Status.objects.all():
			e.Email_Address = e.Email_Address.replace("[", "")
			e.Email_Address = e.Email_Address.replace("]", "")
			e.Email_Address = e.Email_Address.replace("'", "")
			if e.Email_Address==Email_Address:
				mystring=e.Friend_List
				break

		for k in range(0,len(mystring)):
			if mystring[k]=='-':
				if stringbuild!="None":
					users.append(stringbuild)
				stringbuild=""
			else:
				stringbuild=stringbuild+mystring[k]
		for us in users:
			if us==search_value:
				done=True
				break
		if done==True:
			return Response("Yes")
		else:
			raise ValidationError




class CheckIfExists(APIView):
	permission_classes=[AllowAny]
	def post(self,request,format=None):
		Email_Address=request.data['Email_Address']
		done=False
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
		if New_Request.is_valid():
			New_Request.save()
			return Response(status=status.HTTP_200_OK)
		else:
			raise ValidationError












class RejectRequest(APIView):
	permission_classes=[AllowAny]
	def post(self,request,format=None):
		Email_Address_Sender=request.data['Email_Address_Sender']
		Email_Address_Receiver=request.data['Email_Address_Receiver']
		val=-1
		for e in Friend_Request.objects.all():
			e.Email_Address_Receiver = e.Email_Address_Receiver.replace("[", "")
			e.Email_Address_Receiver = e.Email_Address_Receiver.replace("]", "")
			e.Email_Address_Receiver = e.Email_Address_Receiver.replace("'", "")
			if e.Email_Address_Receiver==Email_Address_Receiver:
				e.Email_Address_Sender = e.Email_Address_Sender.replace("[", "")
				e.Email_Address_Sender = e.Email_Address_Sender.replace("]", "")
				e.Email_Address_Sender = e.Email_Address_Sender.replace("'", "")
				if e.Email_Address_Sender==Email_Address_Sender:
					val=e.id
					break
		Friend_Request.objects.filter(id=val).delete()
		return Response(status=status.HTTP_200_OK)


class AcceptRequest(APIView):
	permission_classes=[AllowAny]
	def post(self,request,format=None):
		Email_Address=request.data['Email_Address']
		done=False
		for e in Friend_Status.objects.all():
			e.Email_Address = e.Email_Address.replace("[", "")
			e.Email_Address = e.Email_Address.replace("]", "")
			e.Email_Address = e.Email_Address.replace("'", "")
			if e.Email_Address==Email_Address:
				done=True
				break
		if done==False:
			Fr=Friend_StatusSerializer(data=request.data)
			Fr.Friend_List=""
			if Fr.is_valid():
				Fr.save()
		return Response(status=status.HTTP_200_OK)





class AcceptRequestRoundTwo(APIView):
	permission_classes=[AllowAny]
	def post(self,request,format=None):
		print("mama")
		val=-1
		Email_Address=request.data['Email_Address_Receiver']
		Email_Address_Sender=request.data['Email_Address_Sender']
		for e in Friend_Status.objects.all():
			e.Email_Address = e.Email_Address.replace("[", "")
			e.Email_Address = e.Email_Address.replace("]", "")
			e.Email_Address = e.Email_Address.replace("'", "")
			if e.Email_Address==Email_Address:
				val=e.id
				break
		t = Friend_Status.objects.get(id=val)
		t.Friend_List=str(t.Friend_List)+"-"+Email_Address_Sender
		t.save()
		return Response(status=status.HTTP_200_OK)




class GetAdsFromFriends(APIView):
	permission_classes=[AllowAny]
	def post(self,request,format=None):
		data=[]
		users=[]
		mystring=""
		stringbuild=""
		Email_Address=request.data['Email_Address']
		for e in Friend_Status.objects.all():
			e.Email_Address = e.Email_Address.replace("[", "")
			e.Email_Address = e.Email_Address.replace("]", "")
			e.Email_Address = e.Email_Address.replace("'", "")
			if e.Email_Address==Email_Address:
				mystring=e.Friend_List
				break
		for k in range(0,len(mystring)):
			if mystring[k]=='-':
				if stringbuild!="None":
					users.append(stringbuild)
				stringbuild=""
			else:
				stringbuild=stringbuild+mystring[k]
		for us in users:
			for k in AD.objects.all():
				k.Email_Address = k.Email_Address.replace("[", "")
				k.Email_Address = k.Email_Address.replace("]", "")
				k.Email_Address = k.Email_Address.replace("'", "")
				if us==k.Email_Address:
					data.append(k.Email_Address)
					k.NameAD = k.NameAD.replace("[", "")
					k.NameAD = k.NameAD.replace("]", "")
					k.NameAD = k.NameAD.replace("'", "")
					data.append(k.NameAD)
					k.TextAD = k.TextAD.replace("[", "")
					k.TextAD = k.TextAD.replace("]", "")
					k.TextAD = k.TextAD.replace("'", "")
					data.append(k.TextAD)
					data.append(k.ApplicationUsers)
		return Response({"keywords":data})




class GetAdsFromOthers(APIView):
	permission_classes=[AllowAny]
	def post(self,request,format=None):
		data=[]
		users=[]
		mystring=""
		stringbuild=""
		Email_Address=request.data['Email_Address']
		for e in Friend_Status.objects.all():
			e.Email_Address = e.Email_Address.replace("[", "")
			e.Email_Address = e.Email_Address.replace("]", "")
			e.Email_Address = e.Email_Address.replace("'", "")
			if e.Email_Address==Email_Address:
				mystring=e.Friend_List
				break
		if mystring=="None":
			return Response({"keywords":data})
		for k in range(0,len(mystring)):
			if mystring[k]=='-':
				if stringbuild!="None":
					users.append(stringbuild)
				stringbuild=""
			else:
				stringbuild=stringbuild+mystring[k]
		if not users:
			for k in AD.objects.all():
				k.Email_Address = k.Email_Address.replace("[", "")
				k.Email_Address = k.Email_Address.replace("]", "")
				k.Email_Address = k.Email_Address.replace("'", "")
				data.append(k.Email_Address)
				k.NameAD = k.NameAD.replace("[", "")
				k.NameAD = k.NameAD.replace("]", "")
				k.NameAD = k.NameAD.replace("'", "")
				data.append(k.NameAD)
				k.TextAD = k.TextAD.replace("[", "")
				k.TextAD = k.TextAD.replace("]", "")
				k.TextAD = k.TextAD.replace("'", "")
				data.append(k.TextAD)
				data.append(k.ApplicationUsers)
			return Response({"keywords":data})
		for us in users:
			for k in AD.objects.all():
				k.Email_Address = k.Email_Address.replace("[", "")
				k.Email_Address = k.Email_Address.replace("]", "")
				k.Email_Address = k.Email_Address.replace("'", "")
				if us!=k.Email_Address:
					data.append(k.Email_Address)
					k.NameAD = k.NameAD.replace("[", "")
					k.NameAD = k.NameAD.replace("]", "")
					k.NameAD = k.NameAD.replace("'", "")
					data.append(k.NameAD)
					k.TextAD = k.TextAD.replace("[", "")
					k.TextAD = k.TextAD.replace("]", "")
					k.TextAD = k.TextAD.replace("'", "")
					data.append(k.TextAD)
					data.append(k.ApplicationUsers)
		return Response({"keywords":data})






class GetFriends(APIView):
	permission_classes=[AllowAny]
	def post(self,request,format=None):
		data=[]
		users=[]
		mystring=""
		stringbuild=""
		Email_Address=request.data['Email_Address']
		for e in Friend_Status.objects.all():
			e.Email_Address = e.Email_Address.replace("[", "")
			e.Email_Address = e.Email_Address.replace("]", "")
			e.Email_Address = e.Email_Address.replace("'", "")
			if e.Email_Address==Email_Address:
				mystring=e.Friend_List
				break
		if mystring==None:
			return Response({"keywords":data})
		users = mystring.split('-')
		for us in users:
			for k in user.objects.all():
				k.Email_Address = k.Email_Address.replace("[", "")
				k.Email_Address = k.Email_Address.replace("]", "")
				k.Email_Address = k.Email_Address.replace("'", "")
				if us==k.Email_Address:
					data.append(k.Email_Address)
					data.append(k.id)
					k.Name = k.Name.replace("[", "")
					k.Name = k.Name.replace("]", "")
					k.Name = k.Name.replace("'", "")
					data.append(k.Name)
					k.Surname = k.Surname.replace("[", "")
					k.Surname = k.Surname.replace("]", "")
					k.Surname = k.Surname.replace("'", "")
					data.append(k.Surname)
					for e in UserInfo.objects.all():
						e.Email_Address = e.Email_Address.replace("[", "")
						e.Email_Address = e.Email_Address.replace("]", "")
						e.Email_Address = e.Email_Address.replace("'", "")
						if e.Email_Address==k.Email_Address:
							e.Professional_Experience = e.Professional_Experience.replace("[", "")
							e.Professional_Experience = e.Professional_Experience.replace("]", "")
							e.Professional_Experience = e.Professional_Experience.replace("'", "")
							data.append(e.Professional_Experience)
							e.Skills = e.Skills.replace("[", "")
							e.Skills = e.Skills.replace("]", "")
							e.Skills = e.Skills.replace("'", "")
							data.append(e.Skills)
							break
		return Response({"keywords":data})














class ReturnId(APIView):
	permission_classes=[AllowAny]
	def post(self,request,format=None):
		my_id=-1
		Email_Address_Search=request.data['Email_Address_Search']
		for e in user.objects.all():
			e.Email_Address = e.Email_Address.replace("[", "")
			e.Email_Address = e.Email_Address.replace("]", "")
			e.Email_Address = e.Email_Address.replace("'", "")
			if e.Email_Address==Email_Address_Search:
				my_id=e.id
				break
		return Response(my_id)





class GetAllInfoNonSecret(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		data=[]
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
			p.Email_Address = p.Email_Address.replace("[", "")
			p.Email_Address = p.Email_Address.replace("]", "")
			p.Email_Address = p.Email_Address.replace("'", "")
			if p.Email_Address==request.data['Email_Address']:
				p.Professional_Experience = p.Professional_Experience.replace("[", "")
				p.Professional_Experience = p.Professional_Experience.replace("]", "")
				p.Professional_Experience = p.Professional_Experience.replace("'", "")
				p.PrivateProf_Experience = p.PrivateProf_Experience.replace("[", "")
				p.PrivateProf_Experience = p.PrivateProf_Experience.replace("]", "")
				p.PrivateProf_Experience = p.PrivateProf_Experience.replace("'", "")
				data.append(p.Professional_Experience)
				p.Education = p.Education.replace("[", "")
				p.Education = p.Education.replace("]", "")
				p.Education = p.Education.replace("'", "")
				p.PrivateEducation = p.PrivateEducation.replace("[", "")
				p.PrivateEducation = p.PrivateEducation.replace("]", "")
				p.PrivateEducation = p.PrivateEducation.replace("'", "")
				data.append(p.Education)
				p.Skills = p.Skills.replace("[", "")
				p.Skills = p.Skills.replace("]", "")
				p.Skills = p.Skills.replace("'", "")
				p.PrivateSkills = p.PrivateSkills.replace("[", "")
				p.PrivateSkills = p.PrivateSkills.replace("]", "")
				p.PrivateSkills = p.PrivateSkills.replace("'", "")
				data.append(p.Skills)
		return Response(data)







class SendReqAd(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		Email_Address=request.data['Email_Address']
		NameAD=request.data['NameAD']
		TextAD=request.data['TextAD']
		ApplicationUser=request.data['ApplicationUser']
		val=-1
		for k in AD.objects.all():
			k.Email_Address = k.Email_Address.replace("[", "")
			k.Email_Address = k.Email_Address.replace("]", "")
			k.Email_Address = k.Email_Address.replace("'", "")
			k.NameAD = k.NameAD.replace("[", "")
			k.NameAD = k.NameAD.replace("]", "")
			k.NameAD = k.NameAD.replace("'", "")
			k.TextAD = k.TextAD.replace("[", "")
			k.TextAD = k.TextAD.replace("]", "")
			k.TextAD = k.TextAD.replace("'", "")
			if k.Email_Address==Email_Address and k.NameAD==NameAD and k.TextAD==TextAD:
				val=k.id
		t = AD.objects.get(id=val)
		t.ApplicationUsers=str(t.ApplicationUsers)+"-"+ApplicationUser
		t.save()
		return Response(status=status.HTTP_200_OK)




class GetLikes(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		mystring=""
		data=[]
		users=[]
		Email_Address=request.data['Email_Address']
		for k in Article.objects.all():
			k.Email_Address = k.Email_Address.replace("[", "")
			k.Email_Address = k.Email_Address.replace("]", "")
			k.Email_Address = k.Email_Address.replace("'", "")
			if k.NameArticle!=None:
				k.NameArticle = k.NameArticle.replace("[", "")
				k.NameArticle = k.NameArticle.replace("]", "")
				k.NameArticle = k.NameArticle.replace("'", "")
			if k.TextArticle!=None:
				k.TextArticle = k.TextArticle.replace("[", "")
				k.TextArticle = k.TextArticle.replace("]", "")
				k.TextArticle = k.TextArticle.replace("'", "")
			if k.Current_date!=None:
				k.Current_date = k.Current_date.replace("[", "")
				k.Current_date = k.Current_date.replace("]", "")
				k.Current_date = k.Current_date.replace("'", "")
			if k.Email_Address==Email_Address:
				mystring=k.InterestingUsers
				if not mystring:
					break
				data.append(k.NameArticle)
				data.append(k.TextArticle)
				data.append(k.Current_date)
				users = mystring.split('-')
				users = mystring.split('-')
				new_string=""
				enter=False
				for us in users:
					if us=="None":
						continue
					if enter==False:
						new_string=us
					else:
						new_string=new_string+","+us
				data.append(new_string)
		return Response({"keywords":data})



class GetComments(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		data=[]
		stringuser=""
		users=[]
		stringscom=""
		Email_Address=request.data['Email_Address']
		for k in Article.objects.all():
			k.Email_Address = k.Email_Address.replace("[", "")
			k.Email_Address = k.Email_Address.replace("]", "")
			k.Email_Address = k.Email_Address.replace("'", "")
			if k.NameArticle!=None:
				k.NameArticle = k.NameArticle.replace("[", "")
				k.NameArticle = k.NameArticle.replace("]", "")
				k.NameArticle = k.NameArticle.replace("'", "")
			if k.TextArticle!=None:
				k.TextArticle = k.TextArticle.replace("[", "")
				k.TextArticle = k.TextArticle.replace("]", "")
				k.TextArticle = k.TextArticle.replace("'", "")
			if k.Current_date!=None:
				k.Current_date = k.Current_date.replace("[", "")
				k.Current_date = k.Current_date.replace("]", "")
				k.Current_date = k.Current_date.replace("'", "")
			if k.Email_Address==Email_Address:
				stringuser=k.CommentUsers
				stringscom=k.Comments
				if not stringuser:
					return Response({"keywords":data})
				users =   stringuser.split('-')
				com   =   stringscom.split('-')
				data.append(k.NameArticle)
				data.append(k.TextArticle)
				data.append(k.Current_date)
				mystring=""
				for i in range(0,len(users)):
					if users[i]=="None":
						continue
					mystring=mystring+users[i]+":"+com[i]+"\n"
				mystring=mystring[:-1]
				data.append(mystring)
		return Response({"keywords":data})

















class getFrArticles(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		data=[]
		users=[]
		mystring=""
		Email_Address=request.data['Email_Address']
		for k in Friend_Status.objects.all():
			k.Email_Address = k.Email_Address.replace("[", "")
			k.Email_Address = k.Email_Address.replace("]", "")
			k.Email_Address = k.Email_Address.replace("'", "")
			if k.Email_Address==Email_Address:
				mystring=k.Friend_List
				break
		if not mystring:
			return Response({"keywords":data})
		users =   mystring.split('-')
		for us in users:
			for k in Article.objects.all():
				k.Email_Address = k.Email_Address.replace("[", "")
				k.Email_Address = k.Email_Address.replace("]", "")
				k.Email_Address = k.Email_Address.replace("'", "")
				if k.Email_Address==us:
					k.TextArticle = k.TextArticle.replace("[", "")
					k.TextArticle = k.TextArticle.replace("]", "")
					k.TextArticle = k.TextArticle.replace("'", "")
					k.NameArticle = k.NameArticle.replace("[", "")
					k.NameArticle = k.NameArticle.replace("]", "")
					k.NameArticle = k.NameArticle.replace("'", "")
					k.Current_date = k.Current_date.replace("[", "")
					k.Current_date = k.Current_date.replace("]", "")
					k.Current_date = k.Current_date.replace("'", "")
					data.append(k.Email_Address)
					data.append(k.NameArticle)
					data.append(k.TextArticle)
					data.append(k.Current_date)
		return Response({"keywords":data})













class setLike(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		InterestUser=request.data['Email_Address']
		Creator=request.data['Creator']
		Name=request.data['Name']
		Text=request.data['Text']
		Date=request.data['Date']
		val=-1
		for k in Article.objects.all():
			k.Email_Address = k.Email_Address.replace("[", "")
			k.Email_Address = k.Email_Address.replace("]", "")
			k.Email_Address = k.Email_Address.replace("'", "")
			if k.TextArticle!=None:
				k.TextArticle = k.TextArticle.replace("[", "")
				k.TextArticle = k.TextArticle.replace("]", "")
				k.TextArticle = k.TextArticle.replace("'", "")
			if k.NameArticle!=None:
				k.NameArticle = k.NameArticle.replace("[", "")
				k.NameArticle = k.NameArticle.replace("]", "")
				k.NameArticle = k.NameArticle.replace("'", "")
			if k.Current_date!=None:
				k.Current_date = k.Current_date.replace("[", "")
				k.Current_date = k.Current_date.replace("]", "")
				k.Current_date = k.Current_date.replace("'", "")
			if k.Email_Address==Creator and k.NameArticle==Name and k.TextArticle==Text and k.Current_date==Date:
				val=k.id
				break
		t = Article.objects.get(id=val)
		t.InterestingUsers=str(t.InterestingUsers)+"-"+InterestUser
		t.save()
		return Response(status=status.HTTP_200_OK)



class setComment(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		CommentUser=request.data['Email_Address']
		Creator=request.data['Creator']
		Name=request.data['Name']
		Text=request.data['Text']
		Date=request.data['Date']
		val=-1
		Comment=request.data['Comment']
		for k in Article.objects.all():
			k.Email_Address = k.Email_Address.replace("[", "")
			k.Email_Address = k.Email_Address.replace("]", "")
			k.Email_Address = k.Email_Address.replace("'", "")
			if k.TextArticle!=None:
				k.TextArticle = k.TextArticle.replace("[", "")
				k.TextArticle = k.TextArticle.replace("]", "")
				k.TextArticle = k.TextArticle.replace("'", "")
			if k.NameArticle!=None:
				k.NameArticle = k.NameArticle.replace("[", "")
				k.NameArticle = k.NameArticle.replace("]", "")
				k.NameArticle = k.NameArticle.replace("'", "")
			if k.Current_date!=None:
				k.Current_date = k.Current_date.replace("[", "")
				k.Current_date = k.Current_date.replace("]", "")
				k.Current_date = k.Current_date.replace("'", "")
			if k.Email_Address==Creator and k.NameArticle==Name and k.TextArticle==Text and k.Current_date==Date:
				val=k.id
				break
		t = Article.objects.get(id=val)
		t.Comments=str(t.Comments)+"-"+Comment
		t.CommentUsers=str(t.CommentUsers)+"-"+CommentUser
		t.save()
		return Response(status=status.HTTP_200_OK)















class getNotFrArticles(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		Email_Address=request.data['Email_Address']
		data=[]
		mystring=""
		for e in Friend_Status.objects.all():
			print(e.Email_Address)
			e.Email_Address = e.Email_Address.replace("[", "")
			e.Email_Address = e.Email_Address.replace("]", "")
			e.Email_Address = e.Email_Address.replace("'", "")
			if e.Email_Address==Email_Address:
				mystring=e.Friend_List
				break
		if mystring==None:
			return Response({"keywords":data})
		users = mystring.split('-')
		for e in Article.objects.all():
			new_string=e.InterestingUsers
			if not new_string:
				continue
			users2=new_string.split('-')
			for us1 in users2:
				for us2 in users:
					if us1=="None" or us2=="None":
						continue
					e.Email_Address = e.Email_Address.replace("[", "")
					e.Email_Address = e.Email_Address.replace("]", "")
					e.Email_Address = e.Email_Address.replace("'", "")
					if us2==us1 and e.Email_Address!=Email_Address:
						e.TextArticle = e.TextArticle.replace("[", "")
						e.TextArticle = e.TextArticle.replace("]", "")
						e.TextArticle = e.TextArticle.replace("'", "")
						e.NameArticle = e.NameArticle.replace("[", "")
						e.NameArticle = e.NameArticle.replace("]", "")
						e.NameArticle = e.NameArticle.replace("'", "")
						e.Current_date = e.Current_date.replace("[", "")
						e.Current_date = e.Current_date.replace("]", "")
						e.Current_date = e.Current_date.replace("'", "")
						data.append(e.Email_Address)
						data.append(e.NameArticle)
						data.append(e.TextArticle)
						data.append(e.Current_date)
						data.append(us2)
		return Response({"keywords":data})














class SendMessage(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		Email_Address1=request.data['Email_Address1']
		Email_Address2=request.data['Email_Address2']
		found1=False
		found2=False
		for k in Discussion.objects.all():
			k.Email_Address1 = k.Email_Address1.replace("[", "")
			k.Email_Address1 = k.Email_Address1.replace("]", "")
			k.Email_Address1 = k.Email_Address1.replace("'", "")
			k.Email_Address2 = k.Email_Address2.replace("[", "")
			k.Email_Address2 = k.Email_Address2.replace("]", "")
			k.Email_Address2 = k.Email_Address2.replace("'", "")
			if k.Email_Address1==Email_Address1 or k.Email_Address2==Email_Address1 and k.Email_Address1==Email_Address2 or k.Email_Address2==Email_Address2:
				return Response(status=status.HTTP_200_OK) 
		Disc1=DiscussionSerializer(data=request.data)
		if Disc1.is_valid():
			Disc1.save()
		else:
			raise ValidationError
		return Response(status=status.HTTP_200_OK) 




class SendMessageTwo(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		Email_Address1=request.data['Email_Address1']
		Email_Address2=request.data['Email_Address2']
		Εmail_Field=request.data['Email_Address1']
		Content=request.data['Content']
		val=-1
		for k in Discussion.objects.all():
			k.Email_Address1 = k.Email_Address1.replace("[", "")
			k.Email_Address1 = k.Email_Address1.replace("]", "")
			k.Email_Address1 = k.Email_Address1.replace("'", "")
			k.Email_Address2 = k.Email_Address2.replace("[", "")
			k.Email_Address2 = k.Email_Address2.replace("]", "")
			k.Email_Address2 = k.Email_Address2.replace("'", "")
			if k.Email_Address1==Email_Address1 and k.Email_Address2==Email_Address2 or k.Email_Address1==Email_Address2 and k.Email_Address2==Email_Address1:
				val=k.id
		t = Discussion.objects.get(id=val)
		t.Εmail_Field=str(t.Εmail_Field)+"-"+Εmail_Field
		t.Content_Discussion=str(t.Content_Discussion)+"-"+Content
		t.save()
		return Response(status=status.HTTP_200_OK) 












class getFriendswithMessages(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		Email_Address=request.data['Email_Address']
		data=[]
		for e in Discussion.objects.all():
			e.Email_Address1 = e.Email_Address1.replace("[", "")
			e.Email_Address1 = e.Email_Address1.replace("]", "")
			e.Email_Address1 = e.Email_Address1.replace("'", "")
			e.Email_Address2 = e.Email_Address2.replace("[", "")
			e.Email_Address2 = e.Email_Address2.replace("]", "")
			e.Email_Address2 = e.Email_Address2.replace("'", "")
			if Email_Address==e.Email_Address1:
				data.append(e.Email_Address2)
			if Email_Address==e.Email_Address2:
				data.append(e.Email_Address1)
		return Response({"keywords":data})




class getFriendswithMessagesTwo(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		Email_Address=request.data['Email_Address']
		data=[]
		string1=""
		string2=""
		for k in Discussion.objects.all():
			k.Email_Address1 = k.Email_Address1.replace("[", "")
			k.Email_Address1 = k.Email_Address1.replace("]", "")
			k.Email_Address1 = k.Email_Address1.replace("'", "")
			k.Email_Address2 = k.Email_Address2.replace("[", "")
			k.Email_Address2 = k.Email_Address2.replace("]", "")
			k.Email_Address2 = k.Email_Address2.replace("'", "")
			if Email_Address==k.Email_Address1:
				string1=k.Εmail_Field
				string2=k.Content_Discussion
			if Email_Address==k.Email_Address2:
				string1=k.Εmail_Field
				string2=k.Content_Discussion
		user = string1.split('-')
		messages = string2.split('-')
		for i in range(0,len(user)):
			if user[i]=="None":
				continue
			data.append(user[i])
			data.append(messages[i])
		return Response({"keywords":data})












class getConversation(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		data=[]
		string1=""
		string2=""
		Email_Address1=request.data['Email_Address1']
		Email_Address2=request.data['Email_Address2']
		for k in Discussion.objects.all():
			k.Email_Address1 = k.Email_Address1.replace("[", "")
			k.Email_Address1 = k.Email_Address1.replace("]", "")
			k.Email_Address1 = k.Email_Address1.replace("'", "")
			k.Email_Address2 = k.Email_Address2.replace("[", "")
			k.Email_Address2 = k.Email_Address2.replace("]", "")
			k.Email_Address2 = k.Email_Address2.replace("'", "")
			if k.Email_Address1==Email_Address1 or k.Email_Address2==Email_Address2 and k.Email_Address1==Email_Address2 or k.Email_Address2==Email_Address1:
				string1=k.Εmail_Field
				string2=k.Content_Discussion
		user = string1.split('-')
		messages = string2.split('-')
		for i in range(0,len(user)):
			if user[i]=="None":
				continue
			data.append(user[i])
			data.append(messages[i])
		return Response({"keywords":data})
















class DataOut(APIView):
	permission_classes = [AllowAny]
	def post(self, request, format=None):
		Export_Data=request.data['ExportData']
		Export_Data=Export_Data[1:]
		Button=request.data['Button']
		type_export=""
		if Button=="1":
			type_export="JSON"
		if Button=="2":
			type_export="XML"
		string1=""
		my_users = Export_Data.split(',')
		data={}
		if type_export=="JSON":
			for k in my_users:
				data={}
				for l in user.objects.all():
					l.Email_Address = l.Email_Address.replace("[", "")
					l.Email_Address = l.Email_Address.replace("]", "")
					l.Email_Address = l.Email_Address.replace("'", "")
					if l.Email_Address==k:
						data['Email_Address']=k
						data['Biography']=l.Biography
				for q in UserInfo.objects.all():
					q.Email_Address = q.Email_Address.replace("[", "")
					q.Email_Address = q.Email_Address.replace("]", "")
					q.Email_Address = q.Email_Address.replace("'", "")
					if q.Email_Address==k:
						data['Professional_Experience']=q.Professional_Experience
				for r in Article.objects.all():
					r.Email_Address = r.Email_Address.replace("[", "")
					r.Email_Address = r.Email_Address.replace("]", "")
					r.Email_Address = r.Email_Address.replace("'", "")
					if r.Email_Address==k:
						data['NameArticle']=r.NameArticle
						data['TextArticle']=r.TextArticle
				for r in AD.objects.all():
					r.Email_Address = r.Email_Address.replace("[", "")
					r.Email_Address = r.Email_Address.replace("]", "")
					r.Email_Address = r.Email_Address.replace("'", "")
					if r.Email_Address==k:
						data['NameAD']=r.NameAD
						data['TextAD']=r.TextAD
				for m in Friend_Status.objects.all():
					m.Email_Address = m.Email_Address.replace("[", "")
					m.Email_Address = m.Email_Address.replace("]", "")
					m.Email_Address = m.Email_Address.replace("'", "")
					if m.Email_Address==k:
						data['Friends']=m.Friend_List[5:]
				for n in Article.objects.all():
					string2=n.InterestingUsers
					if not string2:
						continue
					us22=string2.split('-')
					for z in us22:
						if z==k:
							data['LikeNameArticle']=n.NameArticle
							data['LikeTextArticle']=n.TextArticle
					string2=n.CommentUsers
					if not string2:
						continue
					us11=string2.split('-')
					pos=0
					for z in us11:
						if z==k:
							data['CommentNameArticle']=n.NameArticle
							data['CommentTextArticle']=n.TextArticle
							mydata=n.Comments
							usssss=mydata.split('-')
							coun=0
							for x in usssss:
								if coun==pos:
									data['Comment']=x
								coun=coun+1
						pos=pos+1
				with open('data.json', 'a', encoding='utf-8') as f:
					json.dump(data,f,ensure_ascii=False,indent=4)
		else:
			print("XML")
		return Response(status=status.HTTP_200_OK) 