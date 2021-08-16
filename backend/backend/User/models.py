from django.db import models

# Create your models here.
class User(models.Model):
	Name    = models.CharField(max_length=240)
	Surname = models.CharField(max_length=240)
	Email_Address = models.EmailField(max_length=240,unique=True)
