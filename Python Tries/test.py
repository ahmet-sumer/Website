i = """
1 = +
2 = -
3 = *
4 = /
5 = **
"""

print(i)


while True:
    a = int(input("1. sayıyı giriniz: "))
    b = int(input("2. Sayıyı giriniz: "))
    p = input("Girmek istediğiniz işlemi giriniz.İşlemi Bitirmek için \"q\" ya ve \"enter\" a basınız: ")


    if p == "q":
        print("Çıkılıyor...")
        break


    elif p == "1":
        print(a, "+", b, "=", a+b)


    elif p =="2":
        print(a, "-", b, "=", a-b)


    elif p == "3":
        print(a, "x", b, "=", a*b)


    elif p == "4":
        print(a, "/", b, "=", a/b)


    elif p == "5":
        print(a, "^", b, "=", a**b)


    else:
        print("Başla işlem yoktur...")
        print("Lütfen aşağıdaki sayılardan birini giriniz", i)