def a(z):
    if z == 1 :
        return False
    elif z == 2:
        return True
    else:
        for q in range(2,z):
            if z % q == 0:
                return False
            else:
                return True

while True:
    z = input("z:")

    if z == "q":
        print("byee..")
        break

    else:
        z = int(z)

        if a(z):
            print("asal")
        else:
            print("değil")