@echo off

IF NOT DEFINED BUILD_IMAGE_NAME CALL constants.bat

echo Running docker container...
docker.exe run -qdit --name %BUILD_CONTAINER_NAME% %BUILD_IMAGE_TAG%

IF %ERRORLEVEL%==1 (
    echo Error running docker container. Exiting.
	exit /b 1
)
