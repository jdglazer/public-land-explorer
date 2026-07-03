# Can run the following commands from root directory of project (Windows)
#   1. create docker image: docker build --tag public_lands_explorer_tile_builder:0.0.1 .
#   2. create and run docker container from image docker: docker run -dt --name tile_builder_container public_lands_explorer_tile_builder:0.0.1
#                         or if container exists already: docker start tile_builder_container
#   3. copy project to container: docker cp . tile_builder_container:/tmp
#   4. run terminal on container: docker exec -it tile_builder_container /bin/bash
#   5. copy dist folder to local machine: docker cp tile_builder_container:/tmp/dist .
FROM python:latest

# Install python geopackages needed
RUN pip3 install --no-cache-dir pyshp geopandas

# Install tilemaker's build and runtime dependencies
RUN DEBIAN_FRONTEND=noninteractive apt-get -y update && \
    apt-get -y install build-essential libboost-dev libboost-filesystem-dev libboost-program-options-dev libboost-system-dev lua5.3 liblua5.3-dev libshp-dev libsqlite3-dev rapidjson-dev

# Download and install tilemaker
RUN git clone https://github.com/systemed/tilemaker.git && \
    cd tilemaker && \
    make && \
    make install

# Copy data build to image
RUN mkdir -p /tmp/public-lands-explorer
COPY . /tmp/public-lands-explorer