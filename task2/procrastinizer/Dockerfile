FROM python:3.6

RUN mkdir /code
WORKDIR /code
 
# By copying over requirements first, we make sure that Docker will cache
# our installed requirements rather than reinstall them on every build
ADD requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/

#EXPOSE 8000
#CMD ["python", "manage.py", "runserver", "app:8421"] 
#RUN python manage.py makemigrations
#RUN python manage.py migrate
#CMD ["bash", "-c", "sleep 3"]
