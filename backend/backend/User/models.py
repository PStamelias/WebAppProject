from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import RegexValidator
alphanumeric = RegexValidator(r'^[0-9a-zA-Z]*$', 'Only alphanumeric characters are allowed.')




# Create your models here.
class user(models.Model):
	Name                    = models.CharField(max_length=240)
	Surname       			= models.CharField(max_length=240)
	Email_Address 			= models.EmailField(max_length=240,unique=True)
	Image         			= models.FileField(upload_to='user_images',blank=True)
	Phone_Number  			= models.CharField(max_length=240)
	Password          		= models.CharField(max_length=240,validators=[alphanumeric])
	Biography     			= models.TextField()



class UserInfo(models.Model):
	Email_Address 			= models.EmailField(max_length=240,unique=True)
	Professional_Experience = models.TextField(null=True)
	Education				= models.TextField(null=True)
	Skills					= models.TextField(null=True)
	PrivateProf_Experience  = models.CharField(max_length=240,null=True)
	PrivateEducation		= models.CharField(max_length=240,null=True)
	PrivateSkills			= models.CharField(max_length=240,null=True)




class AD(models.Model):
	Email_Address    =  models.EmailField(max_length=240)
	NameAD           =  models.CharField(max_length=240,null=True)
	TextAD           =  models.TextField(null=True)
	ApplicationUsers =  models.TextField(null=True)



class Connection_Request(models.Model):
	Email_Address_Sender    =  models.EmailField(max_length=240)
	Email_Address_Receiver  =  models.EmailField(max_length=240)



class Article(models.Model):
	Email_Address        =  models.EmailField(max_length=240)
	TextArticle          =  models.TextField()
	Current_date         =  models.TextField()
	NameArticle          =  models.TextField()
	Image         		 =  models.FileField(upload_to='article_images',blank=True,null=True)
	InterestingUsers     =  models.TextField(null=True)
	CommentUsers         =  models.TextField(null=True)
	Comments             =  models.TextField(null=True)


class Friend_Status(models.Model):
	Email_Address        =  models.EmailField(max_length=240,null=True)
	Friend_List          =  models.TextField(null=True)




class Friend_Request(models.Model):
	Email_Address_Sender     =  models.EmailField(max_length=240)
	Email_Address_Receiver   =  models.EmailField(max_length=240)




class Discussion(models.Model):
	Email_Address1		                    =  models.EmailField(max_length=240)
	Email_Address2		                    =  models.EmailField(max_length=240)
	Εmail_Field                             =  models.TextField(null=True)
	Content_Discussion                      =  models.TextField(null=True)