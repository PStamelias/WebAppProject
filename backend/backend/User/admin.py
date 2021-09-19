from django.contrib import admin
from .models import user,UserInfo,AD,PersonAD,Connection_Request,PersonArticle,CommentArticle,Article,Friend_List,Friend_Status,Friend_Request
# Register your models here.
admin.site.register(user)
admin.site.register(UserInfo)
admin.site.register(AD)
admin.site.register(PersonAD)
admin.site.register(Connection_Request)
admin.site.register(PersonArticle)
admin.site.register(CommentArticle)
admin.site.register(Article)
admin.site.register(Friend_List)
admin.site.register(Friend_Status)
admin.site.register(Friend_Request)