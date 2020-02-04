a=[]
b=[]
for i in range(0,10):
    b.append("aa")
    for v in range(0,2):
        b.append("cc")
a.append(b)
print(a)