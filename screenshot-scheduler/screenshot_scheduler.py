#!/usr/bin/env python
import datetime
import time
import os
import logging
import requests
from pytz import timezone
from PIL import Image
from twisted.internet import reactor, task
from io import BytesIO

logging.basicConfig(level=logging.INFO)

INTERVAL = 5 # minutes

# root directory and URL
SCREENSHOT_ROOT = ''
URL = ''

def takeScreenshot():
    try:
        # create directory based on time
        # structure:
        # --/history/%Y-%m-%d_%H-%M-%S
        # --/history/%Y-%m-%d_%H-%M-%S/thumbs
        now = datetime.datetime.now(timezone('Europe/Berlin'))

        date_str = now.strftime("%Y-%m-%d_%H-%M-%S")
        filename = '{filename}.{ext}'.format(filename=date_str, ext='jpg')
        foldername = now.strftime("%Y-%m-%d")
        folderpath = os.path.join(SCREENSHOT_ROOT, foldername)
        if not os.path.isdir(folderpath):
            os.makedirs(folderpath)
        filepath = os.path.join(folderpath, filename)
        logging.info('Filepath {name}'.format(name=filepath))

        response = requests.get(URL)
        image = Image.open(BytesIO(response.content))
        image.save(os.path.join(filepath), optimize=True)
        thumb_name = '{base}_thumb.jpg'.format(base=os.path.splitext(filename)[0])
        thumb_path = os.path.join(SCREENSHOT_ROOT, foldername, '.thumbnails')
        if not os.path.isdir(thumb_path):
            os.makedirs(thumb_path)
        image.thumbnail((300, 225), Image.ANTIALIAS)
        image.save(os.path.join(thumb_path, thumb_name), optimize=True)
        image.close()
        logging.info('Screenshot taken [{name}]'.format(name=date_str))
    except Exception as e:
        logging.error('error taking screenshot')
        logging.error(repr(e))

def startLoop():
    loop = task.LoopingCall(takeScreenshot)
    loop.start(INTERVAL*60) # call every INTERVAL minutes

start = datetime.datetime.now(timezone('Europe/Berlin'))
timer = 0
if start.minute % INTERVAL == 0:
    pass
else:
    # start scheduling on next minute % 5 = 0
    timer = (INTERVAL - (start.minute % INTERVAL)) * 60 - start.second

reactor.callLater(timer, startLoop)
reactor.run()
