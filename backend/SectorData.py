import pandas as pd

def get_sectorData():

    excelFile = 'data.xlsx'
    df = pd.read_excel(excelFile)

    symbols = df['Symbols'].tolist()
    sectors = df['Sectors'].tolist()

    dict = {}

    for i in range(0,len(sectors)):
        if sectors[i] not in dict:
            dict[sectors[i]] = set()
            
        dict[sectors[i]].add(symbols[i])

    data = {key: list(value) for key, value in dict.items()}


    for value in data.values():
        value.sort()

    return data



get_sectorData()



        