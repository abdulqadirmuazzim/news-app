from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import NewsArticle
from .serializers import NewsSerializer, UserSerializer, LoginSerializer
from .api import get_news, fields
from datetime import datetime

# from rest_framework.authtoken.views import ObtainAuthToken

class SaveArticle(generics.ListCreateAPIView):
    queryset = NewsArticle.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return NewsArticle.objects.filter(user=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(f"you have an error:\n {serializer.errors}")


class UnsaveArticle(generics.DestroyAPIView):
    serializer_class = NewsSerializer
    permission_classes = [AllowAny]  # Require authentication to delete notes

    def get_queryset(self):
        user = self.request.user
        return NewsArticle.objects.filter(author=user)

class ArticlesView(APIView):
    def post(self, request):
        data = self.request.data
        article = NewsArticle.objects.filter(article_id=data["article_id"], user=request.user)
        if article.exists():
            article[0].delete()
            return Response({"message": "Article unsaved successfully"}, status=status.HTTP_204_NO_CONTENT)
        else:
            data["pubDate"] = datetime.fromisoformat(data["pubDate"])
            print(data)
            serializer = NewsSerializer(data=data)

            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# creating a user
class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# Loggin in a user
class LogInView(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        # if there is no session, create one
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            
            # Optionally serialize user data to return
            user_serializer = UserSerializer(user)
            print(user_serializer.data)
            # store the information in the sessions
            self.request.session['user'] = user_serializer.data
            self.request.session['token'] = token.key
            # user test
            return Response({
                'token': token.key,
                'user': user_serializer.data
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# logging out
class LogOutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        self.request.user.auth_token.delete()
        return Response({"message": "You have logged out successfully"}, status=status.HTTP_204_NO_CONTENT)


class GetUserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# handling the api news call


class FetchNews(APIView):
    def get(self, request):
        # if there is no session, create one
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        # Expecting dictionary class
        response = get_news(**request.query_params)
        if response.get("status"):
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        else:
            print(request.query_params)
            next_page = response.get("nextPage", None)
            # store the next page in the session
            if next_page:
                request.session["nextPage"] = next_page
                request.session.modified = True
            return Response(response, status=status.HTTP_200_OK)
        
        


# when your coding like this it looks sooo coooooool!!!!