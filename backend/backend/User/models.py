from django.db import models
from django.core.validators import RegexValidator
alphanumeric = RegexValidator(r'^[0-9a-zA-Z]*$', 'Only alphanumeric characters are allowed.')

# Create your models here.
class user(models.Model):
	Name                    = models.CharField(max_length=240,null=True)
	Surname       			= models.CharField(max_length=240,null=True)
	Email_Address 			= models.EmailField(max_length=240,unique=True)
	Image         			= models.FileField(upload_to='user_images',blank=True,null=True)
	Phone_Number  			= models.CharField(max_length=240,null=True)
	Password          		= models.CharField(max_length=240,validators=[alphanumeric])
	Biography     			= models.TextField(null=True)
	Professional_Experience = models.TextField(null=True)
	Notes_of_Interest 		= models.TextField(null=True)
