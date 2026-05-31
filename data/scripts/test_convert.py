import geopandas as gpd

# Define file paths and layer
gdb_path = "C:\\Users\\jdglazer\\Downloads\\SMA_WM.gdb"
layer_name = "SurfaceMgtAgy_USFS"
output_shapefile_path = "C:\\Users\\jdglazer\\Downloads\\new_shapefile.shp"

# 1. Read the GDB layer into a GeoDataFrame
gdf = gpd.read_file(gdb_path, driver="OpenFileGDB", layer=layer_name)

# 2. Convert to the desired CRS (Example: EPSG 4326 for WGS 84)
# You can use EPSG codes, WKT strings, or Proj4 strings
projected_gdf = gdf.to_crs(epsg=4326)

# 3. Export to Shapefile
projected_gdf.to_file(output_shapefile_path, driver="ESRI Shapefile")

print(f"Successfully converted and reprojected to {output_shapefile_path}")
