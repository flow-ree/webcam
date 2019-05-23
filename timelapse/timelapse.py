import cv2
import os
import numpy
import logging
from PIL import Image, ImageFont, ImageDraw

logging.basicConfig(level=logging.INFO)

img_array = []
day = '2019-05-22'
ROOT = os.path.join('')

image_path = os.path.join(ROOT, 'history', day)
output_path = os.path.join('/tmp', 'timelapse')
images = sorted(os.listdir(image_path))

FPS = 15 # video framerate

for filename in images:
    # add every single image from screenshot scheduler of one day to an image array
    if not 'thumb' in filename:
        pil_image = Image.open(os.path.join(image_path, filename))

        # format namestring based on YYYY-MM-DD_hh-mm-ss
        date_str = filename.split('_')[0].split('-')
        date_str = '{day}.{month}.{year}'.format(day=date_str[2], month=date_str[1], year=date_str[0])
        time_str = filename.split('_')[1].split('-')
        time_str = '{hour}:{minute} Uhr'.format(hour=time_str[0], minute=time_str[1])
        logging.info(date_str)
        logging.info(time_str)
        logging.info('------------------------')
        font_size = 48
        margin = 30
        draw = ImageDraw.Draw(pil_image)
        font = ImageFont.truetype("./unispace-bd.ttf", font_size)
        draw_width, draw_height = pil_image.size

        # draw date and time to image
        draw.text((draw_width - (font.getsize(time_str)[0] + margin), 2*margin + font.getsize(time_str)[1]), time_str, (255,255,255), font=font)
        draw.text((draw_width - (font.getsize(date_str)[0] + margin), margin), date_str, (255,255,255), font=font)

        img = cv2.cvtColor(numpy.array(pil_image), cv2.COLOR_RGB2BGR)
        height, width, layers = img.shape
        size = (width,height)
        img_array.append(img)

try:
    # save video
    output = os.path.join(output_path, '{day}_{FPS}.avi'.format(day=day, FPS=FPS))
    logging.info('OUTPUT ::: {output} :::'.format(output=output))
    out = cv2.VideoWriter(output, cv2.VideoWriter_fourcc(*'MJPG'), FPS, size)

    for i in range(len(img_array)):
        out.write(img_array[i])
    out.release()
except Exception as e:
    logging.error(repr(e))
