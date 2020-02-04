from django import forms

class Basserrors(forms.ModelForm):#这里定义一个错误处理方法
    def get_errors(self):#就是当出现报错的时候会很友好的显示给前端
        errors=self.errors.get_json_data()
        #self.errors.get_json_data()拿到的数据是以下数据：
        #{'telephone': [{'message': 'This field is required.', 'code': 'required'}],
        # 'pwd2': [{'message': 'This field is required.', 'code': 'required'}],
        # 'username': [{'message': 'This field is required.', 'code': 'required'}],
        # 'pwd1': [{'message': 'This field is required.', 'code': 'required'}]}
        new_errors={}#然后使用循环读取key值和message_dicts的message值
        for key,message_dicts in errors.items():
            messages=[]
            for message_dict in message_dicts:
                message=message_dict["message"]
                messages.append(message)
            new_errors[key]=messages
        return new_errors