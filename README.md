# wine-review-project

## Data sources:
2 CSV files from:
https://www.kaggle.com/zynicide/wine-reviews#winemag-data-130k-v2.csv
originally scraped from winemag.com

## Transformations steps
1.    Load csv’s and JSON into pandas databases
2.    Narrow down columns to focus on:
-    Country (US/north America)
-    province
-    Point (ratings)
-    Price
-    Variety (type of wine)
-    Description
3.    Clean data
a.    Drop duplicates and unknowns
b.    Re-name columns as necessary
c.    Re-categorize as necessary

## Load Point
- Load databases into SQL as table

## Data endpoints:
-    Where the highest rated wines come from
-    Where the highest priced wines come from
-    Correlation between price and rating
-    What key words are used to describe wines the most
-    What key words are associated with the highest rated wines
-    Average overall rating of wine by state/region
-    Average price of wine by state/region
