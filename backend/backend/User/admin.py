from django.contrib import admin
from .models import user,UserInfo,AD,PersonAD,Connection_Request,PersonArticle,CommentArticle,Article

# Register your models here.
admin.site.register(user)
admin.site.register(UserInfo)
admin.site.register(AD)
admin.site.register(PersonAD)
admin.site.register(Connection_Request)
admin.site.register(PersonArticle)
admin.site.register(CommentArticle)
admin.site.register(Article)