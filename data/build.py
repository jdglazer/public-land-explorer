import zipfile
import shutil
import os

import shapefile
import geopandas
from shapely.geometry import Polygon
from scripts.utils import *

from pathlib import Path

SCRIPT_DIR_PATH = Path(__file__).resolve().parent
BUILD_DIR_PATH = os.path.join(SCRIPT_DIR_PATH, 'buildroot')

def cleanup():
    if os.path.exists(BUILD_DIR_PATH):
        shutil.rmtree(BUILD_DIR_PATH)

def build_dir():
    os.makedirs(BUILD_DIR_PATH)

URL_TO_LAND_USE_UNITS = "https://www.arcgis.com/sharing/rest/content/items/6bf2e737c59d4111be92420ee5ab0b46/data"
URL_TO_US_STATE_BOUNDARIES = "https://www.weather.gov/source/gis/Shapefiles/County/s_16ap26.zip"

STATE_BOUNDARIES_ZIP_PATH = os.path.join(BUILD_DIR_PATH, "us_state_boundaries_shp.zip")
LAND_MANAGEMENT_AREA_BOUNDARY_ZIP_PATH = os.path.join(BUILD_DIR_PATH, "sma_wm_shp.zip")

def download_datasets() -> None:
    if not os.path.exists(LAND_MANAGEMENT_AREA_BOUNDARY_ZIP_PATH):
        download_binary_file_http(remote_url=URL_TO_LAND_USE_UNITS, local_file_path=LAND_MANAGEMENT_AREA_BOUNDARY_ZIP_PATH)

    if not os.path.exists(STATE_BOUNDARIES_ZIP_PATH):
        download_binary_file_http(remote_url=URL_TO_US_STATE_BOUNDARIES, local_file_path=STATE_BOUNDARIES_ZIP_PATH)


US_STATES_SHAPE_EXTRACT_DIR_PATH = os.path.join(BUILD_DIR_PATH, 'us_state_boundaries_shp')

def extract_datasets() -> None:
    if not os.path.exists(US_STATES_SHAPE_EXTRACT_DIR_PATH):
        extract_zip(zip_path=STATE_BOUNDARIES_ZIP_PATH, extract_dir_path=US_STATES_SHAPE_EXTRACT_DIR_PATH)

    if not os.path.exists(LAND_MANAGEMENT_AREA_BOUNDARY_DIR_PATH):
        extract_zip(zip_path=LAND_MANAGEMENT_AREA_BOUNDARY_ZIP_PATH, extract_dir_path=BUILD_DIR_PATH)

TARGET_MAP_CRS = "EPSG:3857"

US_STATES_SHAPE_SHP = os.path.join(US_STATES_SHAPE_EXTRACT_DIR_PATH, 's_16ap26.shp')
US_STATES_SHAPE_SHX = os.path.join(US_STATES_SHAPE_EXTRACT_DIR_PATH, 's_16ap26.shx')
US_STATES_SHAPE_DBF = os.path.join(US_STATES_SHAPE_EXTRACT_DIR_PATH, 's_16ap26.dbf')
US_STATES_SHAPE_PRJ = os.path.join(US_STATES_SHAPE_EXTRACT_DIR_PATH, 's_16ap26.prj')
US_STATES_SHAPE_CPG = os.path.join(US_STATES_SHAPE_EXTRACT_DIR_PATH, 's_16ap26.cpg')

def convert_state_shape_file_to_epsg_3857() -> None:
    tmp_shp_file_path = os.path.join(US_STATES_SHAPE_EXTRACT_DIR_PATH, 'corrected-crs.shp')
    convert_shapefile_crs(shp_in = US_STATES_SHAPE_SHP, crs = TARGET_MAP_CRS , shp_out = tmp_shp_file_path)
    
    shutil.move(tmp_shp_file_path, US_STATES_SHAPE_SHP)
    
    tmp_dbf_file_path = os.path.join(US_STATES_SHAPE_EXTRACT_DIR_PATH, 'corrected-crs.dbf')
    shutil.move(tmp_dbf_file_path, US_STATES_SHAPE_DBF)
    
    tmp_shx_file_path = os.path.join(US_STATES_SHAPE_EXTRACT_DIR_PATH, 'corrected-crs.shx')
    shutil.move(tmp_shx_file_path, US_STATES_SHAPE_SHX)
    
    tmp_prj_file_path = os.path.join(US_STATES_SHAPE_EXTRACT_DIR_PATH, 'corrected-crs.prj')
    if os.path.exists(tmp_prj_file_path):
        shutil.move(tmp_prj_file_path, US_STATES_SHAPE_PRJ)

    tmp_cpg_file_path = os.path.join(US_STATES_SHAPE_EXTRACT_DIR_PATH, 'corrected-crs.cpg')
    if os.path.exists(tmp_cpg_file_path):
        shutil.move(tmp_cpg_file_path, US_STATES_SHAPE_CPG)


LAND_MANAGEMENT_AREA_BOUNDARY_DIR_PATH = os.path.join(BUILD_DIR_PATH, 'SMA_WM.gdb')
LAND_MANAGEMENT_AREA_BOUNDARY_SHP_DIR_PATH = os.path.join(BUILD_DIR_PATH, 'sma_wm_shp')
LAND_MANAGEMENT_LAYERS_CONVERSION = [
    ("SurfaceMgtAgy_USFS", "us_forest_service.shp"),
    ("SurfaceMgtAgy_STATE", "state.shp"),
    ("SurfaceMgtAgy_BLM", "blm.shp"),
    ("SurfaceMgtAgy_NPS", "nps.shp")
]

def convert_land_management_geodb_to_shapefiles() -> None:
    if not os.path.exists(LAND_MANAGEMENT_AREA_BOUNDARY_SHP_DIR_PATH):
        os.makedirs(LAND_MANAGEMENT_AREA_BOUNDARY_SHP_DIR_PATH)

    for layer_name, output_shapefile_name in LAND_MANAGEMENT_LAYERS_CONVERSION:
        output_shapefile = os.path.join(LAND_MANAGEMENT_AREA_BOUNDARY_SHP_DIR_PATH, output_shapefile_name)

        geodb_to_shapefile(gdb_path=LAND_MANAGEMENT_AREA_BOUNDARY_DIR_PATH, layer_name=layer_name, shp_out=output_shapefile, crs=TARGET_MAP_CRS)


US_STATES_SPLIT_LAND_MANAGEMENT_DIR_PATH = os.path.join(BUILD_DIR_PATH, 'us_state_land_management_shape_files')
def split_land_shape_files():

    if not os.path.exists(US_STATES_SPLIT_LAND_MANAGEMENT_DIR_PATH):
        os.makedirs(US_STATES_SPLIT_LAND_MANAGEMENT_DIR_PATH)

    def handle_state_record(record) -> None:
        polygons = record['geometry']
        state = record['STATE']
        
        state_lands_dir = os.path.join(US_STATES_SPLIT_LAND_MANAGEMENT_DIR_PATH, state)
        os.makedirs(state_lands_dir)

        for layer_name, output_shape_filename in LAND_MANAGEMENT_LAYERS_CONVERSION:
            shp_to_clip = os.path.join(LAND_MANAGEMENT_AREA_BOUNDARY_SHP_DIR_PATH, output_shape_filename)
            output_shapefile = os.path.join(state_lands_dir, output_shape_filename)
            
            try:
                clip_shapefile_to_single_polygon(shp_to_clip = shp_to_clip, shp_out = output_shapefile, polygons_overlap = polygons)
            except:
                print(f"Error creating clip: State: {state}, land shape file: {output_shape_filename}")
            
    iterate_shapefile_records(shp_in=US_STATES_SHAPE_SHP, func=handle_state_record)

if __name__ == '__main__':
    #cleanup()
    #build_dir()

    #download_datasets()
    extract_datasets()
    
    #convert_state_shape_file_to_epsg_3857()
    #convert_land_management_geodb_to_shapefiles()
    split_land_shape_files()

    # extract US state boundaries and convert to geojsons
    #extract_zip(US_STATES_SHAPE_ZIP_PATH, US_STATES_SHAPE_EXTRACT_DIR_PATH)
    #states_to_geojson()

    #extract_zip(US_PUBLIC_LANDS_SHAPE_ZIP_PATH, US_PUBLIC_LANDS_SHAPE_EXTRACT_DIR_PATH)
    #public_lands_to_geo_json()
