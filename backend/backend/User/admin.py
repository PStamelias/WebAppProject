from django.contrib import admin
from .models import user,UserInfo,AD
# Register your models here.
admin.site.register(user)
admin.site.register(UserInfo)
admin.site.register(AD)