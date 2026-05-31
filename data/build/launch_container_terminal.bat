@echo off

IF NOT DEFINED BUILD_IMAGE_NAME CALL constants.bat

docker.exe exec -it %BUILD_CONTAINER_NAME% /bin/bash