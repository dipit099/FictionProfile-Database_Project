# import requests
# from openpyxl import Workbook

# # Replace 'YOUR_API_KEY' with your actual Comic Vine API key
# api_key = '12cd57e5d14fb13dbeb5a2b0eb5ff2b37a55202c'

# # Initialize Excel workbook and sheet
# workbook = Workbook()
# sheet = workbook.active
# sheet.append([
#     'ID', 'Name', 'Aliases', 'Description', 'Number of Issue Appearances',
#     'Date Added', 'Date Last Updated', 'API Detail URL', 'Image URL'
# ])

# url = f"https://comicvine.gamespot.com/api/characters/?api_key={api_key}"
# response = requests.get(url)

# if response.status_code == 200:
#     data = response.json()
#     for character in data['results']:
#         sheet.append([
#             character['id'], character['name'], character['aliases'],
#             character['description'], character['count_of_issue_appearances'],
#             character['date_added'], character['date_last_updated'],
#             character['api_detail_url'], character['image']['main_url']
#         ])

#     workbook.save('comic_characters.xlsx')
#     print("Data has been saved to comic_characters.xlsx")
# else:
#     print(f"Failed to fetch data. Status code: {response.status_code}")


# import pandas as pd

# # Replace 'data.json' with the path to your JSON file
# with open('character_comic_1.json', 'r', encoding='utf-8') as file:
#     data = file.read()

# # Load JSON data
# json_data = pd.read_json(data)

# # Create a Pandas DataFrame
# df = pd.DataFrame(json_data['results'])

# # Replace NaN values with an empty string
# df = df.fillna('')

# # Save DataFrame to an XLS file
# df.to_excel('output.xlsx', index=False, engine='openpyxl')


import pandas as pd



