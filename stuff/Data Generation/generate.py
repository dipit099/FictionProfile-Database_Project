import requests
import pandas as pd

# Replace 'YOUR_API_KEY' with the actual API key you obtained from TMDb
api_key = '03571ead73aa850cefb8a796b9547e91'

# Define TMDb API endpoints for top-rated movies, TV shows, and people
movies_api_url = f'https://api.themoviedb.org/3/discover/movie?api_key={api_key}&sort_by=vote_count.desc&vote_count.gte=100&page='
tv_shows_api_url = f'https://api.themoviedb.org/3/discover/tv?api_key={api_key}&sort_by=vote_count.desc&vote_count.gte=100&page='
people_api_url = f'https://api.themoviedb.org/3/person/popular?api_key={api_key}&page='

def fetch_and_save_data(api_url, file_name):
    all_data = []

    # Fetch data from TMDb API (50 pages)
    for page_num in range(1, 100000):
        response = requests.get(api_url + str(page_num))
        if response.status_code == 200:
            data = response.json().get('results')
            all_data.extend(data)
        else:
            print(f"Failed to fetch data from page {page_num}")
            break

    # Create DataFrame with all available columns
    data_df = pd.DataFrame(all_data)

    # Write data to Excel file
    data_df.to_excel(file_name, index=False)
    print(f'Data extracted and saved to {file_name}')

# # Fetch and save data for movies
# fetch_and_save_data(movies_api_url, 'movies_all_columns.xlsx')

# Fetch and save data for TV shows
fetch_and_save_data(tv_shows_api_url, 'tv_shows_all_columns.xlsx')

# # Fetch and save data for people (actors)
# fetch_and_save_data(people_api_url, 'people_all_columns.xlsx')
