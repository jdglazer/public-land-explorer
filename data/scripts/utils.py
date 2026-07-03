import geopandas as gpd
import math
import os
import zipfile

from typing import List, Any, Callable, Tuple
from urllib.request import urlopen
from shapely.geometry.multipolygon import MultiPolygon
from pandas import Series

"""
PROJECT_ROOT_DIRECTORY = os.path.pardir

def order_items_indexes_ascending(items: List[Any], value_getter: Callable[[Any], Any]) -> List[int]:
    ordered_ascending_indexes: List[int] = [0]

    for coor_index in range(1, len(items)):
        current_value = value_getter(items[coor_index])

        start_index = 0
        end_index = len(ordered_ascending_indexes) - 1

        end_value = value_getter(items[ordered_ascending_indexes[end_index]])
        if current_value >= end_value:
            ordered_ascending_indexes.append(coor_index)
            continue

        start_value = value_getter(items[ordered_ascending_indexes[start_index]])
        if current_value <= start_value:
            ordered_ascending_indexes.insert(0, coor_index)
            continue

        while end_index - start_index > 1:
            middle_index: int = math.floor((end_index + start_index) / 2)
            middle_value = value_getter(items[ordered_ascending_indexes[middle_index]])

            if current_value >= middle_value:
                start_index = middle_index
            elif current_value < middle_value:
                end_index = middle_index

        ordered_ascending_indexes.insert(end_index, coor_index)

    return ordered_ascending_indexes

def split_shape_polygon_parts(points: List[Tuple[int]], parts_start_indexes: List[int]) -> List[List[Tuple[float, float]]]:
    parts_points = []
    part_len = len(parts_start_indexes)
    for index in range(0, part_len):
        if part_len == (index + 1):
            parts_points.append(points[parts_start_indexes[index]:-1])
        else:
            parts_points.append(points[parts_start_indexes[index]:parts_start_indexes[index + 1] - 1])

    return parts_points

"""

def download_binary_file_http(remote_url: str, local_file_path: str) -> None:
    with urlopen(url=remote_url) as response:

        if response.status >= 300:
            print(f"Error status returned attempting to download file: {remote_url}")

        buffer = bytearray(2000)

        with open(local_file_path, 'wb') as local_file:

            while (bytes_read := response.readinto(buffer)) > 0:
                local_file.write(buffer[:bytes_read])


def extract_zip(zip_path: str, extract_dir_path: str) -> None:
    with zipfile.ZipFile(zip_path) as z:
        z.extractall(path=extract_dir_path)


def geodb_to_shapefile(gdb_path: str, layer_name: str, shp_out: str, crs: str = "EPSG:4326"):

    # 1. Read the GDB layer into a GeoDataFrame
    gdf = gpd.read_file(gdb_path, driver="OpenFileGDB", layer=layer_name)

    # 2. Convert to the desired CRS (Example: EPSG 4326 for WGS 84)
    # You can use EPSG codes, WKT strings, or Proj4 strings
    projected_gdf = gdf.to_crs(crs=crs)

    # 3. Export to Shapefile
    projected_gdf.to_file(shp_out, driver="ESRI Shapefile")

    print(f"Successfully converted and reprojected to {shp_out}")


def convert_shapefile_crs(shp_in: str, crs: str, shp_out: str) -> None:
    # Load your shapefile
    gdf = gpd.read_file(shp_in)

    # Convert to a new CRS (e.g., EPSG:3857 for WGS 84 latitude/longitude)
    gdf_reprojected = gdf.to_crs(crs=crs)

    # Save the converted GeoDataFrame back to a new shapefile
    gdf_reprojected.to_file(shp_out)


def clip_shapefile_to_single_polygon(shp_to_clip: str, shp_out: str, polygons_overlap: MultiPolygon, polygon_crs: str) -> None:

    # 1. Load the shapefile you want to clip
    gdf_to_clip = gpd.read_file(shp_to_clip)

    if polygon_crs != gdf_to_clip:
        print("CRS do not match, skipping!")
        return

    # 2. Perform the clip
    clipped_gdf = gpd.clip(gdf_to_clip, polygons_overlap)

    if clipped_gdf.empty:
        print("clipped shapefile is empty, will not write: {shp_out}")
        return

    # 3. Save the resulting GeoDataFrame to a new shapefile
    clipped_gdf.to_file(shp_out)


def iterate_shapefile_records(shp_in: str, func: Callable[[Series], None]) -> None:
    gdf = gpd.read_file(shp_in)

    for s in gdf.iloc:
        func(s)