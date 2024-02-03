# my_tokenizer.py
from konlpy.tag import Okt

okt = Okt()
def tokenize_korean_text(text):
    return okt.morphs(text)