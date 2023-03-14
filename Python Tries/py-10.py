from math import*

print("""
        Hesap Makinesine Hoşgeldiniz
        1 -) Faktöriyel
        2 -) Toplama
        3 -) Çıkarma
        4 -) Çarpma
        5 -) log2 değerini bulma
        6 -) log10 değerini bulma
        Programı bitirmek için q' ya basınız
        """)

while True:

    soru = input("Yapmak istediğiniz işlemi giriniz:")

    def cikarma(c, d):
        print("Cevap: ", c - d)

    def top(a , b):
        print("Cevap: ", a+b)

    def carp(e,f):
        print("Cevap: ", e*f)


    if soru == "q":
        print("Hoşçakalın")
        break

    while True:

        if soru == "1":
            a = int(input("Faktöriyelini bulmak istedğiniz sayıyı giriniz: "))
            print(factorial(a))
            break

        elif soru == "2":
            a = int(input("1. Sayıyı giriniz: "))
            b = int(input("2. Sayıyı giriniz: "))
            top(a,b)
            break

        elif soru == "3":
            a = int(input("1. Sayıyı giriniz: "))
            b = int(input("2. Sayıyı giriniz: "))
            cikarma(a,b)
            break

        elif soru == "4":
            a = int(input("1. Sayıyı giriniz: "))
            b = int(input("2. Sayıyı giriniz: "))
            carp(a,b)
            break

        elif soru == "5":
            a = int(input("Log2 değerini bulmak istediğiniz sayıyı giriniz: "))
            print(log2(a))
            break

        elif soru == "6":
            a = int(input("Log10 değerini bulmak istediğiniz sayıyı giriniz"))
            print(log10(a))
            break

        else:
            print("1 ile 6 arasında sayı giriniz...\nBaşka işlem yoktur.")
        break

