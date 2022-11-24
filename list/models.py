from django.db import models
from user.models import CustomUser

# Create your models here.
class List(models.Model):
    user= models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    item= models.CharField(max_length=200, blank=True, null=True)
