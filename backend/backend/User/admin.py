from django.contrib import admin
from .models import user,UserInfo,AD,Connection_Request,Article,Friend_Status,Friend_Request
# Register your models here.
admin.site.register(user)
admin.site.register(UserInfo)
admin.site.register(AD)
admin.site.register(Connection_Request)
admin.site.register(Article)
admin.site.register(Friend_Status)
admin.site.register(Friend_Request)