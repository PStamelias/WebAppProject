from rest_framework import serializers
from .models import user,UserInfo,AD,Connection_Request,Article,Discussion,Friend_Status,Friend_Request
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = user
        fields = '__all__'


    def run_validation(self, value):
        superusers = User.objects.filter(is_superuser=True).values_list('email')
        my_email=value['Email_Address']
        for email in superusers:
            if my_email==email[0]:
                raise serializers.ValidationError("Email Exists")
        if user.objects.filter(Email_Address=my_email).exists():
            raise serializers.ValidationError("Email Exists")
        else:
            return value



    def check_superuser(self,value):
        Password=value['Password']
        Email=value['email']
        kala=False
        superusers = User.objects.filter(is_superuser=True).values_list('email')
        for email_super in superusers:
            if Email==email_super[0]:
                kala=True
        if kala==True:
            user = User.objects.get(email=Email)
            if not user.check_password(Password):
                print("lathos kwdikos")
            else:
                return True
        return False



    def check_user(self,value):
        Password=value['Password']
        Email=value['email']
        done=False
        specific_id=""
        i=0
        for p in user.objects.all():
            p.Email_Address = p.Email_Address.replace("[", "")
            p.Email_Address = p.Email_Address.replace("]", "")
            p.Email_Address = p.Email_Address.replace("'", "")
            p.Password = p.Password.replace("[", "")
            p.Password = p.Password.replace("]", "")
            p.Password = p.Password.replace("'", "")
            if p.Email_Address==Email and p.Password==Password:
                specific_id=p.id
                done=True
                break
        if done==True:
            return specific_id
        if done==False:
            return "null"



class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model  = UserInfo
        fields = '__all__'

    def run_validation(self, value):
        return value


 

class ADSerializer(serializers.ModelSerializer):
    class Meta:
        model  = AD
        fields = '__all__'

    def run_validation(self, value):
        return value





class Connection_RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Connection_Request
        fields = '__all__'







class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Article
        fields =  '__all__'

    def run_validation(self, value):
        return value






class Friend_StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Friend_Status
        fields =   '__all__'
    
    def run_validation(self, value):
        return value


class Friend_RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Friend_Request
        fields =   '__all__'

    def run_validation(self, value):
        return value


class DiscussionSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Discussion
        fields =   '__all__'

    def run_validation(self, value):
        return value