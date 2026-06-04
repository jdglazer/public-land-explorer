from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.services.tables_db import TablesDB
from appwrite.id import ID

client = Client()
client.set_endpoint('https://tor.cloud.appwrite.io/v1') # Your API Endpoint
client.set_project('6a11fbaf0025f245fc1c')                 # Your project ID
client.set_key('')                   # Your secret API key

tables_db = TablesDB(client)
"""
dbId = ID.unique()

result = tables_db.create(
    database_id=dbId, 
    name='datasets'
)

tableId = ID.unique()

# Create the table
tables_db.create_table(
    database_id=dbId,
    table_id=tableId,
    name='geopolygons'
)

tables_db.create_polygon_column(
    database_id = dbId,
    table_id = tableId,
    key = 'polygon',
    required = True
)

tableId = ID.unique()

tables_db.create_table(
    database_id = dbId,
    table_id = tableId,
    name='landdesignation'
)

tables_db.create_varchar_column(
    database_id = dbId,
    table_id = tableId,
    key = 'displayname',
    size = 255,
    required = True,
    array = False, # optional
    encrypt = False # optional
)
"""