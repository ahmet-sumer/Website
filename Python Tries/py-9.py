import random
import time

print("""**************************

Sayı Tahmin Etme Progamına Hoşgeldiniz
1 ile 70 arasında bir sayı seçiniz
tahmin hakkınız 13'tür

**************************
"""
)
s = random.randint(1,70)

t_h = 13

while True:
    t = int(input("Sayı Giriniz:"))

    if t < s:
        print("Daha büyük bir sayı seçiniz")
        t_h -= 1
        time.sleep(0.5)

    elif t > s:
        print("Daha küçük bir sayı seçiniz")
        t_h -= 1
        time.sleep(0.5)

    else:
        print("Doğru tahmin")
        break
    if t_h == 0:
        print("Tahmin Hakkınız bitmiştir")

        break
