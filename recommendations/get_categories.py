#!/usr/bin/python
import mysql.connector
import requests

NOT_SUPPORTED = "NOT_SUPPORTED"

cat_mapping = {"art and entertainment": "Arts And Entertainment",
               "automotive and vehicles": "Autos And Vehicles",
               "business and industrial": "Finance",
               "education": "Career And Education",
               "family and parenting": "People And Society",
               "finance": "Finance",
               "food and drink": "Food And Drink",
               "health and fitness": "Beauty And Fitness",
               "hobbies and interests": "Recreation And Hobbies",
               "home and garden": "Recreation And Hobbies",
               "law, govt and politics": "News And Media",
               "news": "News And Media",
               "pets": "Pets And Animals",
               "real estate": "Finance",
               "religion and spirituality": "People And Society",
               "science": "Science",
               "shopping": "Shopping",
               "society": "People And Society",
               "sports": "Sports",
               "style and fashion": "Shopping",
               "technology and computing": "Computer And Electronics",
               "travel": "Travel"
               }

DB_HOST = '172.25.8.114'
DB_PORT = 3309
DB_PASSWORD = 'taboola'
DB_USER = 'trc'
DB_SCHEMA = 'disco'

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
        print(response)
        raise Exception("Alchemy status not ok")

    if len(response['taxonomy']) > 0:
        taxonomy = response['taxonomy'][0]['label']
        root_taxonomy = taxonomy.split('/')[1]
        category = cat_mapping.get(root_taxonomy, root_taxonomy)
    return category


if __name__ == "__main__":
    conn = mysql.connector.connect(host=DB_HOST,
                                   database=DB_SCHEMA,
                                   user=DB_USER,
                                   password=DB_PASSWORD,
                                   port=DB_PORT)

    cursor = conn.cursor(buffered=True)
    cursor = conn.cursor(buffered=True)


    select_query = "SELECT * FROM user_history;"

    update_query = "UPDATE user_history SET category=%s" \
            "WHERE user_id=%s AND title=%s AND url=%s AND page_url=%s"

    try:
        cursor.execute(select_query)
        views = []
        for view in cursor:
            views.append(view)
        for view in views:
            url = view[4]
            category = view[6]
            print(url, category)
            if category is None:
                try:
                    root_taxonomy = get_root_taxonomy(url)
                    args = [root_taxonomy] + list(view)[1:5]
                    print(args)
                    print(url, root_taxonomy)
                    print(view)
                    cursor.execute(update_query, args)

                except Exception, msg:
                    args = [NOT_SUPPORTED] + list(view)[1:5]
                    try:
                        print(args)
                        print(url, root_taxonomy)
                        print(view)
                        cursor.execute(update_query, args)
                    except Exception, msg:
                        print msg
                        conn.commit()
                    print msg
    except Exception, msg:
        print msg
    finally:
        conn.commit()
        conn.close()

# print(get_root_taxonomy("http://www.guidingtech.com/39723/dock-websites-panels-chrome/"))