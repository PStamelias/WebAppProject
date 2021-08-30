# Generated by Django 3.2.6 on 2021-08-30 01:04

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='user',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=240)),
                ('Surname', models.CharField(max_length=240)),
                ('Email_Address', models.EmailField(max_length=240, unique=True)),
                ('Image', models.ImageField(upload_to='')),
                ('Phone_Number', models.PositiveIntegerField()),
                ('Password', models.CharField(max_length=240, validators=[django.core.validators.RegexValidator('^[0-9a-zA-Z]*$', 'Only alphanumeric characters are allowed.')])),
                ('Biography', models.TextField()),
                ('Professional_Experience', models.TextField()),
                ('Notes_of_Interest', models.TextField()),
            ],
        ),
    ]
