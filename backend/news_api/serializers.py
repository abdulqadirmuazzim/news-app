from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import NewsArticle


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsArticle
        extra_kwargs = {"user": {"read_only": True}}
        fields = "__all__"
        # exclude = [] # this is used when you want to include all fields and exclude certian ones
        # It can only be used alone and not with the fields attribute


class UserSerializer(serializers.ModelSerializer):
    # confimation password
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "password2"]
        extra_kwargs = {"password": {"write_only": True}, "email": {"required": True}}

    def validate(self, attrs):
        if attrs.get("password") != attrs.get("password2"):
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )

        return attrs
    
    def create(self, validated_data):
        validated_data.pop("password2", None)
        user = User.objects.create_user(**validated_data) # use "create_user" else the password won't hash and you can't login
        return user

class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=100, required=True)
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ["username", "password"]

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        if username and password:
            user = authenticate(username=username, password=password)
            print(user)
            if user:
                data["user"] = user
            else:
                raise serializers.ValidationError("User Doesn't exsist, wrong username or password")
        else:
            raise serializers.ValidationError("Login failed, wrong username or password")
        return data

class ChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(required=True, write_only=True)
    password = serializers.CharField(required=True, write_only=True)
    confirm_password = serializers.CharField(required=True, write_only=True)
    
    class Meta:
        model = User
        fields = ["password", "old_password", "confirm_password"]

    def validate(self, data):
        # here data is expected to be a dictionary
        password = data.get("password")
        confirm_password = data.get("confirm_password")
        if (data.get("password") == data.get("confirm_password")):
            return data
        else:
            raise serializers.ValidationError({"Error": "passwords don't match"})