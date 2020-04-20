.DEFAULT_GOAL := build
build:
	npm run build
	docker build -t poc:latest -f ./Dockerfile ./../
	docker save --output poc.tar poc:latest
	open .

run:
	docker container stop poc || true && \
		 docker container rm poc || true
	docker load -i poc.tar
	docker run -d --name poc -p 8080:8080 -t poc:latest

stop:
	docker container stop poc