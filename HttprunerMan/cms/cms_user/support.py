"""一些支持方法，比如签名、加密"""
import hashlib
import re

class EncryptError(Exception):
    pass

# 签名函数
def sign(sign_dict, private_key=None, encrypt_way='MD5'):
    """传入待签名的字典，返回签名后字符串
    1.字典排序
    2.拼接，用&连接，最后拼接上私钥
    3.MD5加密"""
    dict_keys=(sign_dict.keys())#sign_dict是传入的是字典，然后使用keys()来获取这个传入的字典的key值
    dict_keys=list(dict_keys)#然后把dict_keys类型转义成列表
    dict_keys.sort()#然后使用sort()对这个列表进行排序
    #https://www.runoob.com/python/att-list-sort.html
    print(dict_keys)

    string = ''#设置一个空数值
    for key in dict_keys:#然后循环读取dict_keys这个列表，[2222,3333]
        if sign_dict[key] is None:#如果对应的key值没有value值就跳过
            pass
        else:
            string += '{0}={1}&'.format(key, sign_dict[key])#这里把key值和value值传入{}={}&进行组合
            print(string)#2222=123456&3333=3423323&
    string = string[0:len(string) - 1]#然后减去&
    print(string)#这里把我们的签名都组合了
    string = string.replace(' ', '')#replace(' ','')方法就是把空格替换掉，怕用户输入空格导出结果错误

    return encrypt(string, salt=private_key, encrypt_way=encrypt_way)#然后把我们传入的签名进行加密

# 加密函数
def encrypt(string, salt='', encrypt_way='MD5'):#这个方法的encrypt_way值默认为MD5加密的
    u"""根据输入的string与加密盐，按照encrypt方式进行加密，并返回加密后的字符串"""
    string += salt
    if encrypt_way.upper() == 'MD5':#upper()方法是把字符串的小写转义成大写。
        hash_string = hashlib.md5()#进行md5加密
    elif encrypt_way.upper() == 'SHA1':
        hash_string = hashlib.sha1()#进行shal加密
    else:#如果错误打印日志并且返回false
        print(EncryptError('请输入正确的加密方式，目前仅支持 MD5 或 SHA1'))
        return False

    hash_string.update(string.encode())
    #string.encode()意思是对传入的数据进行编码，encode()默认为encoding="UTF-8"
    #然后进行添加到hash_string这个定义加密方式里
    return hash_string.hexdigest()#然后返回一个加密的内容

if __name__ == '__main__':
    print(encrypt('1',encrypt_way='MD5').upper())
    print(sign(sign_dict={"a19951231":"a19951231"},private_key='',encrypt_way="MD5"))