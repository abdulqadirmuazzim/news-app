import requests as re
import sys


api_key = "pub_f6d0357826694676bb8c2a5c15e710ff"
base_url = f"https://newsdata.io/api/1/latest"

response = re.get(
    base_url, params={"apikey": api_key, "language": "en", "q": "politics", "page": 1}
)

# Configure stdout to handle UTF-8 encoding
sys.stdout.reconfigure(encoding="utf-8")

print(response)
print(response.url)


response = response.json()

print(response["status"])

# for result in response["results"]:
#     print(result["article_id"])
#     print(result["title"])
#     print(result["link"])
#     print(result["description"])
#     print(result["source_name"])
#     print(result["language"])
#     print(result["country"])
#     print(result["category"])
#     print(result["pubDate"])
#     print(result["source_icon"])
#     print("\n")
