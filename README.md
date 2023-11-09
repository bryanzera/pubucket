# Pubucket

A Docker based project using `ngrok` to run a short-lived, publicly-addressable HTTP server for file transfers over the internet.

## Requirements:
- Docker

## Usage:
1. If this is your first time using the tool, run `./build.sh`
2. Run `./start.sh`.  This will create a new temporary public URL using `ngrok` and tunnel it to the running container.
3. `POST` a file  to the URL provided at the start.  
```
~ > curl -d@path/to/file.txt [TEMPORARY-URL]
```
4. Stop the container.
4. Posted file will appear in `./uploads` directory.

## To Do: 
- Environment variable to close server, stop container after N requests, or a certain amount of time.