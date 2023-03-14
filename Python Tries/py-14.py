def ekstra(fonk):

    def ekstra_ozellik():
        print("Mükemmel Sayılar: ")
        for q in range(1,1001):
            t = 0
            i = 1
            while i < q:
                if q % i == 0:
                    t += i
                i += 1
            if t == q:
                print(q)
        fonk()
    return ekstra_ozellik()

@ekstra
def asal_sayılar():
    print("Asal Sayılar...")
    for sayı in range(2, 1001):
        i = 2
        say = 0
        while (i < sayı):
            if (sayı % i == 0):
                say += 1
            i += 1
        if (say == 0):
            print(sayı)


asal_sayılar()