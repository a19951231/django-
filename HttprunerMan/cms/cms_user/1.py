import requests
import re

header={
    "content-type": "application/x-www-form-urlencoded",
    "cookie": "BAIDUID=BD0AEECE19623584E875DA439BDBB658:FG=1; BIDUPSID=BD0AEECE19623584E875DA439BDBB658; PSTM=1567844827; REALTIME_TRANS_SWITCH=1; FANYI_WORD_SWITCH=1; HISTORY_SWITCH=1; SOUND_SPD_SWITCH=1; SOUND_PREFER_SWITCH=1; BDUSS=VzbFdMSGFhQVhtLTdCNnpNMWR1TUxEb2FZOWMtRndONHoxQTBDcW5BMjdTcnBkSVFBQUFBJCQAAAAAAAAAAAEAAADqtCSTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALu9kl27vZJdel; BDORZ=FFFB88E999055A3F8A630C64834BD6D0; H_PS_PSSID=; Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1575337644,1575379683,1575431394,1575508402; Hm_lpvt_64ecd82404c51e03dc91cb9e8c025574=1575508402; yjs_js_security_passport=9b5f521dd6ac8948ad6c8cdd7d393bd61cc10db3_1575508403_js; to_lang_often=%5B%7B%22value%22%3A%22zh%22%2C%22text%22%3A%22%u4E2D%u6587%22%7D%2C%7B%22value%22%3A%22en%22%2C%22text%22%3A%22%u82F1%u8BED%22%7D%5D; from_lang_often=%5B%7B%22value%22%3A%22en%22%2C%22text%22%3A%22%u82F1%u8BED%22%7D%2C%7B%22value%22%3A%22vie%22%2C%22text%22%3A%22%u8D8A%u5357%u8BED%22%7D%2C%7B%22value%22%3A%22zh%22%2C%22text%22%3A%22%u4E2D%u6587%22%7D%5D; delPer=0; PSINO=7; BCLID=12302420731611489183; BDSFRCVID=cxAOJeC62wzLaV6wghn1Urrwaz63cRQTH6aIX15bHwOvDAGGl74TEG0PHx8g0Kubo1cCogKK3gOTH4AF_2uxOjjg8UtVJeC6EG0Ptf8g0M5; H_BDCLCKID_SF=tR-toDtKJKD3fJrYhPIV-PAt-U4Xat0XKKOLVbOy0l7keq8CDRJ0X-_ZjlJMaPCDQ6rHLbjLJDOjVxj2y5jHyqvLjf57-MRq3g6xKb45JUbpsIJMybAWbT8U5f5yJ4JmaKviaKOjBMb1MhjDBT5h2M4qMxtOLR3pWDTm_q5TtUJMeCnTDMFhe4tX-NFtJ5_efxK",
}

data={
    "from": "zh",
    "to": "en",
    "query": "描述",
    "transtype": "translang",
    "simple_means_flag": "3",
    "sign": "990085.784564",
    "token": "3517e4b039ea9af5d797ef6e82a6885d",
    }
res=requests.post(url="https://fanyi.baidu.com/v2transapi?from=zh&to=en",data=data,headers=header).json()
print(res)
a="描述"
c=re.findall(a,str(res))
if c=="":
    print("fail")
else:
    print("pass")
def dy(*args):
    print(args)
    if args=="":
        print("为空")
    else:
        d=[]
        for i in args:
            c1 = re.findall(i, str(res))
            if c1 ==[]:
                d.append("fail")
            else:
                d.append("pass")
        x=re.findall("fail",str(d))
        if x:
            print(x)
        else:
            print("pass")
dy("描述","xxxxxdsa请问x")
