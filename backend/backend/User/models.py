from django.db import models
from django.core.validators import RegexValidator
alphanumeric = RegexValidator(r'^[0-9a-zA-Z]*$', 'Only alphanumeric characters are allowed.')

# Create your models here.
class user(models.Model):
	Name                    = models.CharField(max_length=240)
	Surname       			= models.CharField(max_length=240)
	Email_Address 			= models.EmailField(max_length=240,unique=True)
	Image         			= models.ImageField()
	Phone_Number  			= models.PositiveIntegerField()
	Code          			= models.CharField(max_length=240,validators=[alphanumeric])
	Biography     			= models.TextField()
	Professional_Experience = models.TextField()
	Notes_of_Interest 		= models.TextField()
