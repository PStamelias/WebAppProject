from rest_framework import serializers
from .models import user
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = user
        fields = '__all__'

    def get_passwd(self):
        return self.Password

    def validate(self, value):
        superusers = User.objects.filter(is_superuser=True).values_list('email')
        my_email=value['Email_Address']
        for email in superusers:
            print("value",my_email)
            print("email",email[0])
            if my_email==email[0]:
                print("enter here")
                raise serializers.ValidationError("Email Exists")
        if user.objects.filter(Email_Address=value).exists():
            raise serializers.ValidationError("Email Exists")
        else:
            return value


    def check_superuser(self,value):
        print("value+",value)
        Password=value['Password']
        Email=value['Email_Address']
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
        Email=value['Email_Address']
        if user.objects.filter(Email_Address=Email).exists():
            myuser = user.objects.filter(Email_Address=Email)
            user1 = myuser.filter(Password=Password)
            if user1:
                return True
            else:
                return False
        else:
            return False
        return False

