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
    permission_classes = [IsAuthenticated]  # Require authentication to delete notes

    def get_queryset(self):
        user = self.request.user
        return NewsArticle.objects.filter(author=user)

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

        print("Request data:", request.data)
        print("Self Request data:", self.request.data)
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
        return Response({"message": "You have logged out successfully"}, status=status.HTTP_201_NO_CONTENT)


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
        print(request.query_params)
        # store the next page in the session
        request.session["next_page"] = response["nextPage"]
        request.session.modified = True
        # if successful
        if response["status"] == "success":
            articles = response.get("results")  # A list of dictionaries
            categories = [element for a in articles for element in a["category"]]
            categories = list(set(categories))
            return Response(
                {"articles": articles, "categories": categories, "next_page": response['nextPage']}, status=status.HTTP_200_OK
            )
        else:
            print(response.get("results", "Key doesn't exist!"))
            return Response(
                {"error": "Failed to fetch news", **response},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

