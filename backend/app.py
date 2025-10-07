from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return "Hello from Course Registration App!"

if __name__ == '__main__':
    app.run()
