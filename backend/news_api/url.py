from django.urls import path
from . import views as v

urlpatterns = [
    # user
    path("create_user", v.CreateUserView.as_view()),
    path("get_users", v.GetUserView.as_view()),
    path("article", v.ArticlesView.as_view()),
    path("update_user", v.UpdateUserView.as_view()),
    path("delete_user", v.DeleteUser.as_view()),
    # News articles
    path("get_articles", v.GetArticlesView.as_view()),
    path("get_news", v.FetchNews.as_view()),
    # auth
    path("login", v.LogInView.as_view()),
    path("logout", v.LogOutView.as_view()),
    # password
    path("change_password", v.ChangePassword.as_view()),
]