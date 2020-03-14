import requests
import json

header1={
    "User-Agent":"okhttp/3.12.0",
    "Content-Type": "application/json",
    "Connection":"Keep-Alive",
    "Content-Length": "24",
    "Access-Token":"N0YwMEI3QTNFMjBCQjhGQjYxOTc1NTFCNjQ0OEM5RDFFMDlDN0Y2NDFGREVCNzk1RjFBODFEQUE5NEY5NDBCNQ==",
}
url='http://iot.vatti.com.cn/v2/user/1999247146'

data1={
    "nickname":"TOM55555"
}
data2=json.dumps(data1)

a=requests.put(url=url,headers=header1,data=data2).json()
print(a)