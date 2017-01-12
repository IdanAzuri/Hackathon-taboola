#!/usr/bin/python
import hmac
from hashlib import sha1
import urllib

import os
import mysql.connector

def urlbox(args):
    apiKey = "4fca7d97-0607-4e46-b1c1-f9776ddd925c"
    apiSecret = "22d591d8-27a0-4a89-bfbe-93f930c9ebf5"
    queryString = urllib.urlencode(args)
    hmacToken = hmac.new(apiSecret, queryString, sha1)
    token = hmacToken.digest().encode('hex')
    return "https://api.urlbox.io/v1/%s/%s/png?%s" % (apiKey, token, queryString)

DB_HOST = '172.25.8.114'
DB_PORT = 3309
DB_PASSWORD = 'taboola'
DB_USER = 'trc'
DB_SCHEMA = 'disco'

CATEGORIES_RAWDATA_DIRECTORY = "by_category"

if __name__ == "__main__":
    conn = mysql.connector.connect(host=DB_HOST,
                                   database=DB_SCHEMA,
                                   user=DB_USER,
                                   password=DB_PASSWORD,
                                   port=DB_PORT)

    cursor = conn.cursor()

    insert_query = "INSERT INTO recommendations (category, rank, url, screenshot_url) " \
            "VALUES(%s,%s,%s,%s)"

    print(os.listdir(CATEGORIES_RAWDATA_DIRECTORY))
    try:
        for category in os.listdir(CATEGORIES_RAWDATA_DIRECTORY):
            with open(os.path.join(CATEGORIES_RAWDATA_DIRECTORY, category), "r") as recs_file:
                print category
                for line in recs_file:
                    url = line.split()[1]
                    argsDict = {'url': url};
                    screenshot_url = urlbox(argsDict)
                    args = [category] + line.split() + [screenshot_url]
                    try:
                        cursor.execute(insert_query, args)
                    except Exception, msg:
                        print msg
                    print(args)
    except Exception, msg:
        print msg
    finally:
        conn.commit()
        conn.close()