# from flask import request, jsonify
from pollination import app  # , bcrypt, db


@app.route('/api/test', methods=['GET', 'POST'])
def test():
    return "This works"
