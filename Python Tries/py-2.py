u_n = "hello"
u_p = "asdf"
e = 3
while True:
    k_a = input("user name: ")
    k_p = input("user pass:")

    if k_a == u_n and k_p != u_p:
        print("something wrong pls try again.")
        e -= 1

    elif k_a != u_n and k_p == u_p:
        print("something wrong pls try again")


    elif k_a != u_n and k_p != u_p:
        print("something wrong pls try again")
        e -= 1

    else:
        print("Welcome back")
        break

    if e == 0:
        x = input("Do you want to change your pass?..(y/n): ")
        if x == "y":
            u_p = input("pass pls: ")

        else:
            print("you don't have any chance bye...")
            break