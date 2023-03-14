import os.path, time
print("Last modified: %s" % time.ctime(os.path.getmtime("py-19.py")))
print("Created: %s" % time.ctime(os.path.getctime("py-19.py")))

