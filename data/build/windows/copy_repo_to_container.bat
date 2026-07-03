@echo off

IF NOT DEFINED BUILD_IMAGE_NAME CALL constants.bat

echo Copying repo to container...
docker.exe cp ..\ %BUILD_CONTAINER_NAME%:%BUILD_CONTAINER_ROOT_DIR%

IF %ERRORLEVEL%==1 (
    echo Error copying build root to docker container. Exiting.
	exit /b 1
)