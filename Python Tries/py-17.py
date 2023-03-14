import sys

from PyQt5 import QtWidgets

def Pencere():
    app = QtWidgets.QApplication(sys.argv)

    pencere = QtWidgets.QWidget()

    pencere.setWindowTitle("ASAD")
    buton = QtWidgets.QPushButton(pencere)
    buton.setText("BUTON")
    buton.move(240,240)

    pencere.setGeometry(300,200,600,600)
    pencere.show()

    sys.exit(app.exec_())

Pencere()