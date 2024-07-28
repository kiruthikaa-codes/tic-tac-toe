from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'thisisasecretkeyIdontknowforwhat'

    from .views import views
    from .auth import auth

    print("Registering views blueprint")
    app.register_blueprint(views, url_prefix="/")
    print("Registering auth blueprint")
    app.register_blueprint(auth, url_prefix="/")

    return app
