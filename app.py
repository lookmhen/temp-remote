from flask import Flask, request, render_template, jsonify
from concurrent.futures import ThreadPoolExecutor
from waitress import serve
import subprocess
import socket
import os
import logging



app = Flask(__name__)
executor = ThreadPoolExecutor(max_workers=5)  # Adjust max_workers as needed

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

#route homepage
@app.route('/temp/')
def index():
    return render_template("index.html")

def execute_batch_file(value):
    try:
        subprocess.run(["temp.bat", value], shell=True, check=True)
        with open("batch_completion_flag.txt", "w") as flag_file:
            flag_file.write("Complete")
    except subprocess.CalledProcessError as e:
        with open("batch_completion_flag.txt", "w") as flag_file:
            flag_file.write("Error executing batch file: " + str(e))

#route for post value api
@app.route('/send-value', methods=['POST'])
def send_value():
    data = request.json
    value = data.get('value')

    if not value:
        return "No value provided.", 400

    # Remove previous flag file if it exists
    if os.path.exists("batch_completion_flag.txt"):
        os.remove("batch_completion_flag.txt")

    future = executor.submit(execute_batch_file, value)
    future.result()  # Wait for the batch file execution to complete

    # Check if the flag file exists
    if os.path.exists("batch_completion_flag.txt"):
        with open("batch_completion_flag.txt", "r") as flag_file:
            completion_status = flag_file.read()
            return completion_status, 200
    else:
        return "Batch file execution error.", 500



def start_server():
    """
    Start the Waitress server.
    """
    host = socket.gethostbyname(socket.gethostname())
    port = int(os.environ.get('PORT', 81))

    logger.info("Starting the Cleartemp server on %s:%d", host, port)
    serve(app, host=host, port=port)

if __name__ == '__main__':
    start_server()
