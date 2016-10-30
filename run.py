from flask import Flask, request, render_template, Blueprint
from users import *

app = Flask(__name__)
app.register_blueprint(users)

@app.route("/")
def init():
    return render_template('index.html')

if __name__ == "__main__":
    app.run()
