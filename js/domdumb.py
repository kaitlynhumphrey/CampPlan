from requests import get

#hey everyone ik you see this python file, do not be alarmed I am just painfully slow and stupid

param = {
    "pagination[page]": 1
}
url = "https://bcparks.api.gov.bc.ca/api/sites"
res = get(url=url)

page_count = res.json()["meta"]["pagination"]["total"]

print(page_count)
for i in range(page_count-1):
    res1 = get(url=url, params=param)
    print("data : ",res1.json(), "page count: ",res1.json()["meta"]["pagination"]["page"])
    param["pagination[page]"] += 1
