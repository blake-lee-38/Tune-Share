from django.db import models
import string
import random

def generate_unique_code():
    length = 6

    while True:
        # Generates a random code that is length of "k" (6) made as ASCII characters
        code = ''.join(random.choices(string.ascii_uppercase, k=length))

        # Looks at all the Room objects currently in use, if a room already has that code, keep generating
        if Room.objects.filter(code=code).count() == 0:
            break
    
    return code

# Create your models here - Tables in Database
class Room(models.Model):
    #Creates a field in this table
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null = False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    current_song = models.CharField(max_length=50, null=True)