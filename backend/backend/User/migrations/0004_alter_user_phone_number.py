# Generated by Django 3.2.6 on 2021-08-31 03:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0003_auto_20210830_1622'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='Phone_Number',
            field=models.CharField(max_length=240, null=True),
        ),
    ]