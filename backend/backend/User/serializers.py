from rest_framework import serializers
from .models import user,UserInfo,AD,PersonAD,Connection_Request,PersonArticle,CommentArticle,Article,Friend_List,Friend_Status,Friend_Request
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = user
        fields = '__all__'


    def run_validation(self, value):
        print("mpika")
        superusers = User.objects.filter(is_superuser=True).values_list('email')
        my_email=value['Email_Address']
        for email in superusers:
            print("value",my_email)
            print("email",email[0])
            if my_email==email[0]:
                print("enter here")
                raise serializers.ValidationError("Email Exists")
        if user.objects.filter(Email_Address=my_email).exists():
            raise serializers.ValidationError("Email Exists")
        else:
            return value



    def check_superuser(self,value):
        print("value+",value)
        Password=value['Password']
        Email=value['email']
        kala=False
        superusers = User.objects.filter(is_superuser=True).values_list('email')
        for email_super in superusers:
            if Email==email_super[0]:
                print("iparxei")
                kala=True
        if kala==True:
            user = User.objects.get(email=Email)
            if not user.check_password(Password):
                print("lathos kwdikos")
            else:
                return True
        return False



    def check_user(self,value):
        print("value+",value)
        Password=value['Password']
        Email=value['email']
        print(Email)
        done=False
        specific_id=""
        i=0
        for p in user.objects.all():
            print("id=",p.id)
            #print(Email)
            #print(p.Email_Address)
            print("Password=",p.Password)
            print("Email=",p.Email_Address)
            p.Email_Address = p.Email_Address.replace("[", "")
            p.Email_Address = p.Email_Address.replace("]", "")
            p.Email_Address = p.Email_Address.replace("'", "")
            p.Password = p.Password.replace("[", "")
            p.Password = p.Password.replace("]", "")
            p.Password = p.Password.replace("'", "")
            print("verification_email=",Email)
            print("Password=",p.Password)
            print("Email=",p.Email_Address)
            if p.Email_Address==Email and p.Password==Password:
                print("mpikaaaaa")
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


class PersonADSerializer(serializers.ModelSerializer):
    class Meta:
        model  = PersonAD
        fields = '__all__'

    def run_validation(self, value):
        return value

class ADSerializer(serializers.ModelSerializer):
    class Meta:
        model  = AD
        fields = '__all__'

    def run_validation(self, value):
        print("mpika edw kiria mou")
        return value





class Connection_RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Connection_Request
        fields = '__all__'



class PersonArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model  = PersonArticle
        fields = '__all__'


class CommentArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model  = CommentArticle
        fields = '__all__'



class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Article
        fields =  '__all__'

    def run_validation(self, value):
        print("mpika edw kiria mou")
        return value




class Friend_ListSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Friend_List
        fields =   '__all__'

    def run_validation(self, value):
        print("mpika edw kiria mou")
        return value



class Friend_StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Friend_Status
        fields =   '__all__'
    
    def run_validation(self, value):
        print("mpika edw kiria mou")
        return value


class Friend_RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Friend_Request
        fields =   '__all__'
    def run_validation(self, value):
        print("mpika edw kiria mou")
        return value