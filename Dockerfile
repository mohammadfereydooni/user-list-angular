FROM ubuntu:latest
LABEL authors="hesam"

ENTRYPOINT ["top", "-b"]