from rest_framework import serializers
from .models import user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = user
        fields = '__all__'

    def validate_Email_Address(self, value):
        if value == '':
            raise serializers.ValidationError("Email cannot be empty.")
        if User.objects.filter(Email_Address=value).exists():
            raise serializers.ValidationError("This email already exists!.")
        return "Success"

    def check_email(self, value,password):
        if value == '':
            raise serializers.ValidationError("Email cannot be empty.")
        if User.objects.filter(Email_Address=value).exists():
            value=self.validated_data.get("Password")
            return value
        else:
            raise 'not-exist'




