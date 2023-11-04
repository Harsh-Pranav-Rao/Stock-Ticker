from flask import Flask, json, has_request_context
from flask_cors import CORS
import finnhub
import os
import time
from SectorData import get_sectorData

app = Flask(__name__)
CORS(app)

# Function to fetch data for a specific number of companies
def fetch_company_data(sector, num_companies, start_index=0):
    SSData = get_sectorData()
    api_key = os.environ.get('API_KEY')
    fc = finnhub.Client(api_key=api_key)
    SSData = get_sectorData()

    data = {}
    end_index = min(start_index + num_companies, len(SSData[sector]))

    for i in range(start_index, end_index):
        symbol = SSData[sector][i]
        stock_data = fc.quote(symbol)
        data[symbol] = stock_data

    return sector, data, end_index

# Keep track of the current sector, batch size, and start index
current_sector = None
current_batch_size = 50
current_start_index = 0

# Route to handle fetching the next batch of data
@app.route('/api', methods=['GET'])
def get_next_batch_data():
    SSData = get_sectorData()
    global current_sector, current_batch_size, current_start_index

    if current_sector is None:
        # Initialize the current sector to the first sector
        sectors = list(SSData.keys())
        current_sector = sectors[0]

    if current_sector is not None and current_start_index >= len(SSData[current_sector]):
        # If we've processed all companies in the current sector, move to the next sector
        sectors = list(SSData.keys())
        current_sector_index = sectors.index(current_sector)
        if current_sector_index < len(sectors) - 1:
            current_sector = sectors[current_sector_index + 1]
            current_start_index = 0

    # Fetch data for the current sector and batch
    sector, data, current_start_index = fetch_company_data(current_sector, current_batch_size, current_start_index)

    # Create a response dictionary containing the sector name and data
    response_data = {
        "sector": sector,
        "data": data
    }

    # Serialize the response data to JSON and encode as bytes
    json_data = json.dumps(response_data).encode('utf-8')

    # Ensure a delay to respect the API rate limit
    time.sleep(1)

    # Check if there's an active request context and create one if not
    if not has_request_context():
        with app.app_context():
            return json_data
    else:
        return json_data

if __name__ == '__main__':
    # This is where the app is run
    app.run(debug=True)