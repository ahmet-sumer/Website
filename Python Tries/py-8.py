def t(a):
	t_b = []
	for q in range(1,a):
		if a % q == 0:
			t_b.append(q)

	return t_b

while True:
	a = input("a: ")
	if a == "q":
		print("bye...")
		break

	else:
		a = int(a)
		print(t(a))