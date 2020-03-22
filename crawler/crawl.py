import requests
from bs4 import BeautifulSoup
from datetime import date
from datetime import timedelta
import re
import string
import pymongo
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
import sys
import os

os.environ['MONGO_USER'] = 'admin'
os.environ['MONGO_PW'] = 'root'
os.environ['MONGO_HOST'] = 'localhost'
os.environ['MONGO_PORT'] = '27018'

client = pymongo.MongoClient(
    "mongodb://" + os.environ['MONGO_USER'] + ":" + os.environ['MONGO_PW'] + "@" + os.environ['MONGO_HOST'] + ":" +
    os.environ['MONGO_PORT'] + "/")
db = client['crawler']

geolocator = Nominatim(user_agent="crawler")


def blood_spider():
    run = 0
    today = date.today().strftime("%d.%m.%Y")
    day_after_tomorrow = (date.today() + timedelta(days=4)
                          ).strftime("%d.%m.%Y")
    meckpomm_url = 'https://www.blutspendemv.de/infos-zur-blutspende/blutspende-termine/rss/feed.php?kreis_eingabe=&plz_ort_' \
                   'eingabe=&plz_eingabe=&ort_eingabe=&wann_eingabe=&d_v_eingabe=' + today + \
                   '&d_b_eingabe=' + day_after_tomorrow + '&umkreis='

    nordost_url = 'https://www.blutspende-nordost.de/blutspendetermine/termine.rss'
    nstob_url = 'https://www.blutspende-leben.de/blutspendetermine/termine.rss'
    west_url = 'https://www.blutspendedienst-west.de/blutspendetermine/termine.rss'
    bwhe_url = 'https://www.blutspende.de/blutspendetermine/termine.rss'
    bsd_url = 'https://www.blutspendedienst.com/blutspendetermine/suche.rss'

    urls = [
        meckpomm_url,
        nordost_url,
        nstob_url,
        west_url,
        bwhe_url,
        bsd_url
    ]

    collection = db['donation.information']

    for url in urls:

        if url == meckpomm_url:
            region = 'Mecklenburg-Vorpommern'
        elif url == nordost_url:
            region = 'Nord-Ost'
        elif url == nstob_url:
            region = 'Niedersachsen-Sachsen-Anhalt-Thüringen-Oldenburg-Bremen'
        elif url == west_url:
            region = 'West'
        elif url == bwhe_url:
            region = 'Baden-Württemberg-Hessen'
        else:
            region = 'Bayern'

        source_code = requests.get(url)
        plain_text = source_code.text
        soup = BeautifulSoup(plain_text)

        for item in soup.findAll('item'):
            adresse = " ".join(item.description.contents[0].split()).strip(' -').replace(' -', ',')

            regex_adresse = re.compile(
                '([A-ZÄÖÜ]*[a-zäöüss]*, )?(([A-ZÄÖÜ]*[a-zäöüss]*-)+)?(([A-ZÄÖÜ]*[a-zäöüss]* )+)?[A-ZÄÖÜ]*[a-zäöüss]*(.)?( )?[0-9]+[A-Za-zss]?')
            filtered_adresse = regex_adresse.search(adresse)
            if filtered_adresse is None:
                continue

            strasse = filtered_adresse.group()

            regex_plz = re.compile('^[0-9]{5}$')
            plz = list(filter(regex_plz.search,
                              item.title.contents[0].split()))[0]

            regex_ort = re.compile(
                '[A-ZÄÜÖäüö][a-zäüö]*(-[A-ZÄÜÖäüö][a-zäüö]*)?')
            ort = list(filter(regex_ort.search, item.title.contents[0].split()))[
                0].lower()

            regex_date = re.compile(
                '^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*\,?$')
            datum = list(filter(regex_date.search, item.title.contents[0].split()))[
                0].replace(',', '')

            regex_uhr = re.compile('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')
            uhrzeit = list(
                filter(regex_uhr.search, item.title.contents[0].split()))
            uhrzeit_von = uhrzeit[0]
            uhrzeit_bis = uhrzeit[1]

            try:
                location = geolocator.geocode(strasse + ' ' + plz, timeout=10)
                if location is None:
                    continue
                longitude = location.longitude
                latitude = location.latitude

                item_doc = {
                    'region': region,
                    'strasse': strasse,
                    'location': {
                        'type': "Point",
                        'coordinates': [latitude, longitude],
                    },
                    'plz': plz,
                    'ort': ort,
                    'datum': datum,
                    'uhrzeit_von': uhrzeit_von,
                    'uhrzeit_bis': uhrzeit_bis,
                }
                print("At number: "+str(run))
                run += 1
                print("Inserting Item: "+str(item_doc))
                
                collection.insert_one(item_doc)
            except GeocoderTimedOut as e:
                print("Error: geocode failed on input %s with message %s" % (strasse + ' ' + plz, e.message))


def check_env():
    if os.environ.get('MONGO_HOST') is None:
        print("Please set ENV Variable MONGO_HOST")
        sys.exit()
    if os.environ.get('MONGO_USER') is None:
        print("Please set ENV Variable MONGO_USER")
        sys.exit()
    if os.environ.get('MONGO_PW') is None:
        print("Please set ENV Variable MONGO_PW")
        sys.exit()
    if os.environ.get('MONGO_PORT') is None:
        print("Please set ENV Variable MONGO_PORT")
        sys.exit()


check_env()
blood_spider()
