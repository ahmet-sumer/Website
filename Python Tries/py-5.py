def asal(a):
    if a == 1:
        return False

    elif a == 2:
        return True
    else:
        for q in range(2,a):
            if a % q == 0:
                return False

        return True

while True:
    n = int(input("a: "))
    asal(n)

    if asal(n):
        print("Asal")

    else:
        print("Değil")