#!/usr/bin/env python
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import SocketServer
import json
import cgi
import logging
import os

logging.basicConfig(level=logging.INFO)

SCREENSHOT_ROOT = ''
TIMELAPSE_ROOT = ''


class Server(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_HEAD(self):
        self._set_headers()

    def do_GET(self):
        self._set_headers()
        if self.path == '/api/timelapse':
            # response list of timelapse videos directory
            self.wfile.write(json.dumps(os.listdir(os.path.join(TIMELAPSE_ROOT))))
        elif self.path == '/api':
            # response list of available screenshots and folders
            data = {}
            for item in os.listdir(os.path.join(SCREENSHOT_ROOT)):
                data[item] = [os.path.splitext(f)[0] for f in os.listdir(os.path.join(SCREENSHOT_ROOT, item)) if os.path.isfile(os.path.join(SCREENSHOT_ROOT, item, f))]
            self.wfile.write(json.dumps(data))

def run(server_class=HTTPServer, handler_class=Server, port=8008):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)

    logging.info('Starting httpd on port %d...' % port)
    httpd.serve_forever()

if __name__ == "__main__":
    from sys import argv

    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()
