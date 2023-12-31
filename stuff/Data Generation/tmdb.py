import requests
import pandas as pd

# TMDb API endpoint for top-rated movies
api_key = '03571ead73aa850cefb8a796b9547e91'
api_url = f'https://api.themoviedb.org/3/discover/movie?api_key={api_key}&sort_by=vote_count.desc&vote_count.gte=1000&page='

all_movies = []

# Fetch top 5000 movies (100 movies per page, 50 pages)
for page_num in range(1, 51):
    response = requests.get(api_url + str(page_num))
    if response.status_code == 200:
        movies_data = response.json().get('results')
        all_movies.extend(movies_data)
    else:
        print(f"Failed to fetch data from page {page_num}")

# Create DataFrame with selected columns
movies_df = pd.DataFrame(all_movies, columns=['title', 'vote_count', 'vote_average', 'release_date', 'overview'])

# Write data to Excel file
excel_file = 'top_5000_movies.xlsx'
movies_df.to_excel(excel_file, index=False)
print(f'Data extracted and saved to {excel_file}')
