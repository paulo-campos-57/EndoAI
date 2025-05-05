from flask import Blueprint, jsonify

routes_bp = Blueprint("routes", __name__)


@routes_bp.route("/api/salute", methods=["GET"])
def salute():
    return jsonify({"message": "Integrado com sucesso"})
