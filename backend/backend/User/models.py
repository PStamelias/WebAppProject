from django.db import models
from django.contrib.postgres.fields import ArrayField
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



class UserInfo(models.Model):
	Email_Address 			= models.EmailField(max_length=240,unique=True)
	Professional_Experience = models.TextField(null=True)
	Education				= models.TextField(null=True)
	Skills					= models.TextField(null=True)
	PrivateProf_Experience  = models.CharField(max_length=240,null=True)
	PrivateEducation		= models.CharField(max_length=240,null=True)
	PrivateSkills			= models.CharField(max_length=240,null=True)




class PersonAD(models.Model):
	Email_Address    = models.EmailField(max_length=240,unique=True)


class AD(models.Model):
	Email_Address    =  models.EmailField(max_length=240)
	NameAD           =  models.CharField(max_length=240,null=True)
	TextAD           =  models.TextField(null=True)
	ApplicationUsers =  models.ManyToManyField(PersonAD,blank=True)



class Connection_Request(models.Model):
	Email_Address_Sender    =  models.EmailField(max_length=240)
	Email_Address_Receiver  =  models.EmailField(max_length=240)



class PersonArticle(models.Model):
	Email_Address        = models.EmailField(max_length=240)
	Interesting			 = models.CharField(max_length=4)

class CommentArticle(models.Model):
	Email_Address        = models.EmailField(max_length=240)
	Comment              = models.TextField(null=True)

class Article(models.Model):
	Email_Address        =  models.EmailField(max_length=240)
	TextArticle          =  models.TextField(null=True)
	Current_date         =  models.TextField(null=True)
	Image         		 =  models.FileField(upload_to='article_images',blank=True,null=True)
	InterestingUsers     =  models.ManyToManyField(PersonArticle,blank=True)
	CommentUsers         =  models.ManyToManyField(CommentArticle,blank=True)
