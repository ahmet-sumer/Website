class e():

    def __init__(self, name, number):
        self.name = name
        self.number = number

    def s(self):
        print("""
        name = {}
        
        number ={}
        
        """.format(self.name, self.number,))

class k(e):

    def __init__(self, name, number, rpn):

        super().__init__(name, number)

        self.rpn = rpn

    def a(self):
        print("""
        name = {}
    
        number ={}
        
        rpn = {}
        """.format(self.name, self.number, self.rpn))
