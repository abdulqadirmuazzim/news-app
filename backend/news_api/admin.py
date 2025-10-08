from django.contrib import admin
from .models import NewsArticle


class ModelNews(admin.ModelAdmin):
    model = NewsArticle
    list_display = ["user", "title", "article_id", "source_name"]


admin.site.register(NewsArticle, ModelNews)
