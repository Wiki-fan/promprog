FROM archlinux/base

RUN mkdir /code
WORKDIR /code
 
# By copying over requirements first, we make sure that Docker will cache
# our installed requirements rather than reinstall them on every build
ADD requirements.txt /code/
ADD package.json /code/
ADD . /code/

# Удивительно, но не работает. Если отдельно руками выполнять, то всё ок.
RUN ["/bin/bash", "-c", "pacman -Sy --noconfirm"]
RUN ["/bin/bash", "-c", "pacman -S --noconfirm python python-pip python-virtualenv npm git"]
RUN ["/bin/bash", "-c", "mkdir env"]
RUN ["/bin/bash", "-c", "python -m venv env/"]
RUN ["/bin/bash", "-c", "source env/bin/activate"]
RUN ["/bin/bash", "-c", "pip install -r requirements.txt"]
RUN ["/bin/bash", "-c", "until npm i; do echo 'Trying again'; sleep 1; done"]
RUN ["/bin/bash", "-c", "npm run build"]
RUN ["/bin/bash", "-c", "python3 manage.py makemigrations"]
RUN ["/bin/bash", "-c", "python3 manage.py migrate"]

#EXPOSE 8000
#CMD ["python", "manage.py", "runserver", "app:8421"] 
#RUN python manage.py makemigrations
#RUN python manage.py migrate
#CMD ["bash", "-c", "sleep 3"]
