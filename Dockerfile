# base image
FROM python:3.10.6


ENV PYTHONUNBUFFERED=1 

RUN mkdir /code

# specifying the working dir 
WORKDIR /code

# copy work folders into the image
COPY . /code/

# install dependencies
RUN pip install -r requirements.txt