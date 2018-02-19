#!/usr/bin/env python
import pika
import logging
import sys

#logging.basicConfig(level=logging.INFO)

import time
time.sleep(30)

connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq', port=5672))
channel = connection.channel()

channel.queue_declare(queue='hello')

#channel.basic_publish(exchange='',
#                      routing_key='hello',
#                      body='Hello World!')
#logging.info("Sent 'Hello World!'")

while True:
    try:
        line = input()
    except EOFError:
        break
    
    logging.debug("Sending '%s'"%line)
    channel.basic_publish(exchange='',
                        routing_key='hello',
                        body=line)
    logging.info("Sent '%s'"%line)
connection.close()
