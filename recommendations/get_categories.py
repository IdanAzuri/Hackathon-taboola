#!/usr/bin/python

from pandas import read_csv
import urllib
import numpy as np
import pandas as pd
import requests


def alchemy_url_logic(input_url):
    url = 'http://access.alchemyapi.com/calls/url/URLGetRankedTaxonomy'
    headers = {
    'Content-Type': 'application/json;charset=iso-8859-1',
    'apikey': 'f3dc13c98b50068d78feff6b466c1c1b04a37c64',
    'url': input_url,
    'outputMode': 'json',
    }

    response = requests.post(url, headers)
    return response.json()

def get_root_taxonomy(input_url):
    response = alchemy_url_logic(input_url)
    if response['status'] != 'OK':
        raise Exception("Alchemy status not ok")

    if len(response['taxonomy']) > 0:
        taxonomy = response['taxonomy'][0]['label']
        root_taxonomy = taxonomy.split('/')[1]
    return root_taxonomy

print(get_root_taxonomy("http://www.guidingtech.com/39723/dock-websites-panels-chrome/"))