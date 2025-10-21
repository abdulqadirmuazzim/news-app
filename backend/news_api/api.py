import requests as req
import dotenv
import os
import sys
from datetime import datetime

# load .env file
dotenv.load_dotenv()


api_key = os.getenv("API_KEY")
base_url = os.getenv("BASE_URL")


# Configure stdout to handle UTF-8 encoding
sys.stdout.reconfigure(encoding="utf-8")


fields = [
    "article_id",
    "title",
    "link",
    "description",
    "source_name",
    "language",
    "country",
    "category",
    "pubDate",
    "image_url",
    "video_url",
    "source_icon",
]

# WRITE A FUNCTION THAT CALLS THE API AND RETURNS THE RESPONSE AS JSON


def get_news(language="en", page=None, country=None, category=None, query=None):
    params = {
        "apikey": api_key,
        "language": language,
        "page": page,
        "country": country,
        "category": category,
        "q": query,
    }
    response = req.get(base_url, params=params).json()

    if response["status"] == "success":
        articles = response.get("results")  # A list of dictionaries
        # we get the categories to render on the web page
        categories = list({element for a in articles for element in a["category"]})
        # categories = (set(categories))
        print(categories)
        # parse the articles
        article_list = []
        for article in articles:
            data = {}
            for field in fields:
                value = article.get(field, '')
                if isinstance(value, list):
                    data[field] = ", ".join(value)
                else: 
                    data[field] = article.get(field, "")
            article_list.append(data)
        return {"articles": article_list, "categories": categories, "nextPage": response.get("nextPage")}           
    else:
        return response.json()  # returns a dictionary with the response
