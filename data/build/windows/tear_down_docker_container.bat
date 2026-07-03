@echo off

IF NOT DEFINED BUILD_IMAGE_NAME CALL constants.bat

echo Stopping docker container...
docker.exe container stop %BUILD_CONTAINER_NAME%

IF %ERRORLEVEL%==1 (
    echo Error stoping docker build container. Exiting.
	exit /b 1
)

echo Removing build container
docker.exe rm %BUILD_CONTAINER_NAME%

IF %ERRORLEVEL%==1 (
    echo Error removing docker build container. Exiting.
	exit /b 1
)