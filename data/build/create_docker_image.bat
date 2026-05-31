@echo off

IF NOT DEFINED BUILD_IMAGE_NAME CALL constants.bat

SET DOCKER_ROOT_DIR=..\

echo Building docker container...
docker.exe build --tag %BUILD_IMAGE_NAME% %DOCKER_ROOT_DIR%

IF %ERRORLEVEL%==1 (
    echo Error building docker build image. Exiting.
	exit /b 1
)