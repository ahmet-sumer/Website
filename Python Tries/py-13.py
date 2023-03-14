s = "djfkgadshgfkjdsahfkjlhsdkfbadsf"

a = dict()

for q in s:
    if q in a:
        a[q] += 1
    else:
        a[q] = 1

for i,p in a.items():
    print(i,p)