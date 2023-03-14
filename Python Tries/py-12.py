import time
import random


class Kumanda():

    def __init__(self,tv_durum= "Kapalı", tv_ses = 0, kanal_listesi = ["Trt"], kanal = "Trt"):
        self.tv_durum = tv_durum
        self.tv_ses = tv_ses
        self.kanal_listesi = kanal_listesi
        self.kanal = kanal

    def tv_ac(self):
        if self.tv_durum == "Kapalı":
            self.tv_durum = "Açık"
            print("Tv Açıldı")

        elif self.tv_durum == "Açık":
            self.tv_durum = "Kapalı"
            print("Tv Kapandı")

    def ses_degis(self):
        while True:
            c = input("Ses Açmak için '>'\nSes Kapamak için '<'\nÇıkış Yapmak için 'q'ya basınız")

            if c == ">":
                if self.tv_ses != 31:
                    self.tv_ses += 1
                    print("Ses:",self.tv_ses)

            elif c == "<":
                if self.tv_ses != 0:
                    self.tv_ses -= 1
                    print("Ses:",self.tv_ses)
            else:
                break

    def ke(self, yk):
        time.sleep(0.5)
        print("Kanal Eklendi")
        self.kanal_listesi.append(yk)

    def ras(self):

        rastgele = random.randint(1,len(self.kanal_listesi)-1)
        self.kanal = self.kanal_listesi[rastgele]
        print("Şuanki Kanal {}".format(self.kanal))

    def __len__(self):
        return len(self.kanal_listesi)

    def __str__(self):
        return "Tv durumu: {}\nSes Durumu: {}\nKanal Listesi: {}\nKanal: {}".format(self.tv_durum,self.tv_ses,self.kanal_listesi,self.kanal)
kumanda = Kumanda()
print("""
1- Tv Aç/Kapat

2- Ses Ayarları

3- Kanal Ekle

4- Kanal Sayısını Öğrenme

5- Rastgele Kanal

6- Kanal Bilgisi

Çıkmak için 'q'ya basın
""")

while True:
    i = input("İşleminizi Seçiniz")

    if i == "q":
        print("Program Sonlandırılıyor")
        break

    elif i == "1":
        kumanda.tv_ac()

    elif i == "2":
        kumanda.ses_degis()

    elif i == "3":
        kanal_isimleri = input("Kanalları ','ile ayırarak giriniz: ")

        kanal_listesi = kanal_isimleri.split(",")

        for eklenecekler in kanal_listesi:
            kumanda.ke(eklenecekler)

    elif i == "4":

        print("Kanal Sayısı", len(kumanda))

    elif i == "5":
        kumanda.ras()

    elif i == "6":
        print(kumanda)

    else:
        print("Geçersiz İşlem")