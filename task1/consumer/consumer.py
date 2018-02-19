#!/usr/bin/env python
import pika
import logging

#logging.basicConfig(level=logging.INFO)

import time
time.sleep(30)

from peewee import *
psql_db = PostgresqlDatabase('postgres', user='guest', password='guest', host='db', port=5432)
psql_db.connect()

class BaseModel(Model):
    class Meta:
        database = psql_db

class Message(BaseModel):
    text = CharField()

MODELS = [Message]
psql_db.create_tables(MODELS)
    
logging.info('Consumer started')

connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq', port=5672))
channel = connection.channel()

channel.queue_declare(queue='hello')

def callback(ch, method, properties, body):
    logging.info("Received %r" % body)
    msg = Message(text=body)
    msg.save()

channel.basic_consume(callback,
                      queue='hello',
                      no_ack=True)

logging.info('Consuming started')
channel.start_consuming()

db.close()
