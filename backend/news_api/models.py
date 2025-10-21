from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


# this will be the saved articles of users
class NewsArticle(models.Model):
    article_id = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=300)
    link = models.URLField()
    description = models.TextField()
    source_name = models.CharField(max_length=255)
    language = models.CharField(max_length=15)
    video_url = models.URLField(blank=True, null=True, max_length=500) 
    image_url = models.URLField(blank=True, null=True, max_length=500)
    country = models.CharField(max_length=50)
    category = models.CharField(max_length=20)
    source_icon = models.URLField()
    pubDate = models.DateTimeField(blank=True, null=True)
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.title}"
