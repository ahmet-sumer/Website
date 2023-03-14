while True:

    def fak(num):
        f = 1
        for q in range(1,num+1):
            f *= q
        print(f)
        print("*"*len(str(f)))
    n = int(input("num: "))

    fak(n)