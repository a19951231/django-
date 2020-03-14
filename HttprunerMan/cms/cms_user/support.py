"""一些支持方法，比如签名、加密"""
import hashlib
import re

class EncryptError(Exception):
    pass

# 签名函数
def sign(sign_dict, private_key=None, encrypt_way='MD5'):
    dict_keys=(sign_dict.keys())
    dict_keys=list(dict_keys)
    dict_keys.sort()
    print(dict_keys)

    string = ''
    for key in dict_keys:
        if sign_dict[key] is None:
            pass
        else:
            string += '{0}={1}&'.format(key, sign_dict[key])
            print(string)
    string = string[0:len(string) - 1]
    string = string.replace(' ', '')

    return encrypt(string, salt=private_key, encrypt_way=encrypt_way)

# 加密函数
def encrypt(string, salt='', encrypt_way='MD5'):
    string += salt
    if encrypt_way.upper() == 'MD5':
        hash_string = hashlib.md5()
    elif encrypt_way.upper() == 'SHA1':
        hash_string = hashlib.sha1()
    else:
        print(EncryptError('请输入正确的加密方式，目前仅支持 MD5 或 SHA1'))
        return False

    hash_string.update(string.encode())
    return hash_string.hexdigest()#然后返回一个加密的内容

if __name__ == '__main__':
    print(encrypt('1',encrypt_way='MD5').upper())
    print(sign(sign_dict={"a19951231":"a19951231"},private_key='',encrypt_way="MD5"))