import sys
from os import path
import numpy as np
from PIL import Image
from wordcloud import WordCloud, STOPWORDS

currdir = path.dirname(__file__)

def create_wordCloud(text):
    img_mask = np.array(Image.open("Trump.jpg"))


    #array([[0, 0, 0, ..., 0, 0, 0],
    #   [0, 0, 0, ..., 0, 0, 0],
    #   [0, 0, 0, ..., 0, 0, 0],
    #  ...,
    #The way the masking functions works is that it requires all white part of the mask should be 255 not 0 (integer type).
    #This value represents the "intensity" of the pixel.
    #Values of 255 are pure white, whereas values of 1 are black.
    #Here, you can use the provided function below to transform your mask if your mask has the same format as above.
    #Notice if you have a mask that the background is not 0, but 1 or 2, adjust the function to match your mask.

    #def transform_format(val):
    #   if val == 0:
    #        return 255
    #    else:
    #        return val


    stopwords = set(STOPWORDS)
    wc = WordCloud(background_color = "white", max_words=200, mask=img_mask, stopwords=stopwords, contour_width=3)
    wc.generate(text)
    wc.to_file(path.join(currdir, "wc01252020.png"))


t = open("Output.txt", encoding="utf8").read()    
create_wordCloud(t)
