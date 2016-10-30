from flask import Blueprint, jsonify, request

import json
import urllib
import urllib2
import sqlite3

users = Blueprint('users', __name__, template_folder="templates")

@users.route('/add', methods=["POST"])
def add():
	try:
		fb_oauth = request.get_json()["fb"]

		## get other fb data/name etc from oauth

		c = sqlite3.connect('app.db')
		conn = c.cursor()
		conn.execute('select * from users where username=?' (username,))
		if not conn.fecthone():
			conn.execute('insert into users values (?,?,?,?)', (username, password, name, fb_oauth))
		else:
			c.commit()
			c.close()
			return jsonify({"message": "Username already taken"}), 400
		c.commit()
		c.close()
		return jsonify({"message": "Success."}), 200
	except:
		return jsonify({"message": "There was an error."}), 400


@users.route('/ping', methods=["POST"])
def ping():
	fb = request.get_json()["fb"]
	lat = request.get_json()["lat"]
	lon = request.get_json()["long"]
	time = request.get_json()["time"]
	radius = request.get_json()["radius"]
	
	c = sqlite3.connect('app.db')
	conn = c.cursor()

	conn.execute('update users set lat=?, long=?, time=?, radius=? where fbid=?', (lat, lon, time, radius, fb,))

	c.commit()
	c.close()

	try:
		return jsonify({"Success"}), 200
		
	except:
		return jsonify({"Error"}), 400


@users.route('/fb', methods=["POST"])
def friends():
	try:
		fb = request.get_json()["fb"]

		friends = urllib2.urlopen('http://graph.facebook.com/v2.2/' + fb + '/friends').read()
		
		c = sqlite3.connect('app.db')
		conn = c.cursor()

		results = []

		for f in friends["data"]:
			i = friends["data"][f]["id"]
			conn.execute('select * from users where fbid = ?' (i,))
			f = conn.fetchone()
			if(f):
				results.append(f)
		
		c.commit()
		c.close()

		return jsonify({"rows": results}), 200
	except:
		return jsonify({"message": "There was an error."}), 400


