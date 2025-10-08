from django.urls import path
from . import views as v

urlpatterns = [
    path("", v.SaveArticle.as_view()),
    path("unsave_article", v.UnsaveArticle.as_view()),
    path("create_user", v.CreateUserView.as_view()),
    path("login", v.LogInView.as_view()),
    path("logout", v.LogOutView.as_view()),
    path("get_users", v.GetUserView.as_view()),
    path("get_news", v.FetchNews.as_view()),
]
