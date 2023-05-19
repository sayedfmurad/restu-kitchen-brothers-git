
import requests
organization = "org-ZDT5SOGov5wWSAiOUWw75NHd"
api_key = "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"


url = "https://api.openai.com/v1/chat/completions"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer "+api_key
}


def getText(t):
    data = {
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": t}]
    }

    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    generated_text = response.json()["choices"][0]["message"]["content"]
    return generated_text
g = "hi"
while True:
    i = getText(g)
    g = input(i+"\n")