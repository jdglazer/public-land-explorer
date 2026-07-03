@echo off

IF NOT DEFINED BUILD_IMAGE_NAME CALL constants.bat

echo Removing build image
docker.exe rmi %BUILD_IMAGE_TAG%

IF %ERRORLEVEL%==1 (
    echo Error removing docker image. Exiting.
	exit /b 1
)