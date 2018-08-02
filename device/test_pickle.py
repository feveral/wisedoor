import os
import pickle

classifier_filename_exp = os.path.expanduser('test.pkl')
infile = open(classifier_filename_exp, 'rb')
(emb_array, labels, class_names) = pickle.load(infile)

print(type(emb_array))
print(labels)
print(class_names)

count = 0

def ccc():
    count = 1


ccc()
print(count)
