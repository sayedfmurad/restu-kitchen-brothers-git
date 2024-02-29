import requests


def GetResturs():
  print("Start Fetching")
  restus = "http://angebote-restu.s3-website.eu-central-1.amazonaws.com/restus.json"

  # Sending a GET request to the JSON URL
  response = requests.get(restus)

  # Checking if the request was successful (status code 200)
  if response.status_code == 200:
      # Getting JSON data from the response
      json_data = response.json()

      # Now you can work with the JSON data
      return json_data
def CheckIfPassRestu(search,website):
  # URL to send the request to
  # url = "https://www.google.com/search?q=City+Pizza+Express+M%C3%B6nchengladbach"

  # Sending a GET request to the URL
  response = requests.get(search)

  # Checking if the request was successful (status code 200)
  if response.status_code == 200:
      # Reading the fetched data
      data = response.text
      print(">Website<" in data, ">Website< in data")
      print(website in data, "website in data")

  else:
      print("Failed to fetch data. Status code:", response.status_code)

# CheckIfPassRestu("https://www.google.com/search?q=miramare1+Mönchengladbach","miramare1.com")
data = GetResturs()
print(data)
for g in data:
  if "search" in data[g] and "website" in data[g]:
    CheckIfPassRestu(data[g]["search"],data[g]["website"])
    print(data[g]["key"])