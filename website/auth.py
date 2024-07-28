from flask import Blueprint,render_template

auth = Blueprint('auth', __name__)

@auth.route('/welcome')
def welcome():
    return render_template("welcome.html")

@auth.route('/playy')
def playgame():
    return render_template("game.html")