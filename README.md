The purpose of this project is to analyze the correlations, if any, between ratings and various characteristics (price, variety, state) of US-made wines.

# The ETL Process
Code is located in file 'cleaning data columns.ipynb'
## Extracting Data
For this ETL portion of this project, the focus is on wine reviews and ratings. The data was extracted, transformed and loaded using Jupyter Notebook libraries and MySQL. The data was sourced in the form of 2 CSV files from https://www.kaggle.com/zynicide/wine-reviews#winemag-data-130k-v2.csv, originally scraped from winemag.com. 

## Transforming Data
Both CSV files were uploaded to Jupyter Notebook and manipulated using the Pandas library. The files were converted into dataframes, cleaned, and narrowed down in the following ways for analysis: 

- Columns selected:
  description, 
  points, 
  country, 
  province, 
  variety, 
  price. 

- Only US wines were kept for analysis. 
- All wines that had a null value for price were dropped.

After cleaning, the dataframe was converted back into a final CSV.

## Loading Data
MySQL was used to create a database with a single table reflecting the information in the final csv file. This was done using the “to_sql”, with an ID column as the primary key. 

# The Visualization Process


# Technology Used:
- Python
- Pandas
- SQLAlchemy
- PyMySQL
- MySQL
