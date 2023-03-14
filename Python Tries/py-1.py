import time
while True:
    x = int(input("x: "))


    if x == 0:
        print("x = 0")
        break

    else:
        while True:
            if x > 0:
                print("*" * x)
                time.sleep(0.3)
                x += 1
            else:
                print("Lütfen pozitif bir sayı giriniz")