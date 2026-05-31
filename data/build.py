import zipfile
import shutil
import os

import shapefile
import geopandas
from shapely.geometry import Polygon
from scripts.utils import split_shape_polygon_parts

from pathlib import Path

SCRIPT_DIR_PATH = Path(__file__).resolve().parent
BUILD_DIR_PATH = os.path.join(SCRIPT_DIR_PATH, 'buildroot')

RAW_DATA_DIR_PATH = os.path.join(SCRIPT_DIR_PATH, 'raw_data')
RAW_DATA_DIR_GEO_REGIONS_PATH = os.path.join(RAW_DATA_DIR_PATH, 'georegions')
RAW_DATA_DIR_LAND_USES_PATH = os.path.join(RAW_DATA_DIR_PATH, 'landuses')

US_STATES_SHAPE_ZIP_PATH = os.path.join(RAW_DATA_DIR_GEO_REGIONS_PATH, 's_16ap26.zip')
US_STATES_SHAPE_EXTRACT_DIR_PATH = os.path.join(BUILD_DIR_PATH, 's_16ap26')
US_STATES_SHAPE_SHP = os.path.join(US_STATES_SHAPE_EXTRACT_DIR_PATH, 's_16ap26.shp')
US_STATES_SHAPE_SHX = os.path.join(US_STATES_SHAPE_EXTRACT_DIR_PATH, 's_16ap26.shx')
US_STATES_SHAPE_DBF = os.path.join(US_STATES_SHAPE_EXTRACT_DIR_PATH, 's_16ap26.dbf')

US_PUBLIC_LANDS_SHAPE_ZIP_PATH = os.path.join(RAW_DATA_DIR_LAND_USES_PATH, 'usa_public_lands_shapefile_datasets.zip')
US_PUBLIC_LANDS_SHAPE_EXTRACT_DIR_PATH = os.path.join(BUILD_DIR_PATH, 'usa_public_lands_shapefile_datasets')

GEOJSON_OUT_DIR_PATH = os.path.join(BUILD_DIR_PATH, 'geojson')
GEOJSON_OUT_POLITICAL_BOUNDARIES_PATH = os.path.join(GEOJSON_OUT_DIR_PATH, 'politicalboundaries') # political boundary polygons
GEOJSON_OUT_PUBLIC_LAND_BOUNDARIES_PATH = os.path.join(GEOJSON_OUT_DIR_PATH, 'publiclandboundaries') # public land polygons

def cleanup():
    if os.path.exists(BUILD_DIR_PATH):
        shutil.rmtree(BUILD_DIR_PATH)

def build_dir():
    os.makedirs(BUILD_DIR_PATH)
    
def extract_zip(zip_path: str, extract_dir_path: str):
    with zipfile.ZipFile(zip_path) as statezip:
        statezip.extractall(path=extract_dir_path)

def states_to_geojson():
    if not os.path.exists(GEOJSON_OUT_POLITICAL_BOUNDARIES_PATH):
        os.makedirs(GEOJSON_OUT_POLITICAL_BOUNDARIES_PATH, exist_ok=True)

    with shapefile.Reader(shp=US_STATES_SHAPE_SHP, shx=US_STATES_SHAPE_SHX, dbf=US_STATES_SHAPE_DBF) as shapereader:
        for shape_record in shapereader.iterShapeRecords():

            record = shape_record.record
            statename = record[1]

            shape = shape_record.shape
            parts = split_shape_polygon_parts(shape.points, shape.parts)

            polygon = Polygon(shell=parts[0], holes=parts[1:]) if len(parts) > 1 else Polygon(shell=parts[0])
            data_frame = geopandas.GeoDataFrame(data={"name": statename, "type": "state", "geometry":[polygon]})
            output_geojson_path = os.path.join(GEOJSON_OUT_POLITICAL_BOUNDARIES_PATH, f"{statename}.geojson")
            data_frame.to_file(output_geojson_path, driver="GeoJSON")

USA_PUBLIC_LANDS_DIR_PATH = os.path.join(BUILD_DIR_PATH, 'usa_public_lands_shapefile_datasets')

PUBLIC_LANDS_SHAPES = [
    {
     "file_root": os.path.join(USA_PUBLIC_LANDS_DIR_PATH, 'us_forest_service', 'us_forest_service_land'),
     "type": "National Forest",
     "geojson_out_root": os.path.join(GEOJSON_OUT_PUBLIC_LAND_BOUNDARIES_PATH, 'us_forest_service'),
     "property_record_mappings": [("name", 1)]
    }
]

GEO_JSON_PUBLIC_LANDS_OUT_ROOT_PATH = ''

def public_lands_to_geo_json():
    if not os.path.exists(GEOJSON_OUT_PUBLIC_LAND_BOUNDARIES_PATH):
        os.makedirs(GEOJSON_OUT_PUBLIC_LAND_BOUNDARIES_PATH, exist_ok=True)

    for public_land in PUBLIC_LANDS_SHAPES:
        file_root = public_land["file_root"]

        with shapefile.Reader(shp=file_root+".shp", shx=file_root+".shx", dbf=file_root+".dbf") as shapereader:
            for index in range(0, len(shapereader)):
                record = shapereader.record(index)
                shape = shapereader.shape(index)

                parts = split_shape_polygon_parts(shape.points, shape.parts)

                polygon = Polygon(shell=parts[0], holes=parts[1:]) if len(parts) > 1 else Polygon(shell=parts[0])
                data = {"geometry": [polygon]}
                for prop in public_land["property_record_mappings"]:
                    data[prop[0]] = record[prop[1]]

                data_frame = geopandas.GeoDataFrame(data=data)
                output_geojson_path = f"{public_land['geojson_out_root']}.{index}.geojson"
                data_frame.to_file(output_geojson_path, driver="GeoJSON")
                break

if __name__ == '__main__':
    #cleanup()
    #build_dir()

    # extract US state boundaries and convert to geojsons
    #extract_zip(US_STATES_SHAPE_ZIP_PATH, US_STATES_SHAPE_EXTRACT_DIR_PATH)
    #states_to_geojson()

    #extract_zip(US_PUBLIC_LANDS_SHAPE_ZIP_PATH, US_PUBLIC_LANDS_SHAPE_EXTRACT_DIR_PATH)
    public_lands_to_geo_json()
