import requests
import csv
import pandas as pd
api_key = 'AIzaSyCL5Sry_bnKQyL5strg_nyoO-To8ptt9xQ'

df = pd.read_csv('../../wine_sample.csv')

lat = []
lng = []

for row in df['province']:
    province = df['province']
    url = f"https://maps.googleapis.com/maps/api/geocode/json?address={province}&key={api_key}"
    r = requests.get(url)
    json = r.json()
    lat.append(json['results'][0]['geometry']['location']['lat'])
    lng.append(json['results'][0]['geometry']['location']['lng'])

lat_column = pd.DataFrame({'lat': lat})
lng_column = pd.DataFrame({'lng': lng})
df = df.merge(lat_column, left_index = True, right_index = True)
df = df.merge(lng_column, left_index = True, right_index = True)
df.to_csv(r'Resources/us_wines_coords.csv')

