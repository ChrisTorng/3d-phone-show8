"""
Flask 網站主程式，服務 3D 手機展示網站靜態資源與 JSON 下載。
"""

import os
from flask import Flask, send_from_directory, jsonify, abort

app = Flask(__name__, static_folder=".")

# 服務 index.html
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

# 服務靜態資源（js, css, images, models, etc.）
@app.route("/<path:filename>")
def static_files(filename):
    if os.path.exists(os.path.join(app.static_folder, filename)):
        return send_from_directory(app.static_folder, filename)
    abort(404)

# 服務 phones.json 下載
@app.route("/api/phones.json")
def phones_json():
    try:
        return send_from_directory(app.static_folder, "phones.json", as_attachment=True)
    except Exception:
        abort(404)

# 服務 models 目錄下的 glb 檔案
@app.route("/models/<path:model_name>")
def model_file(model_name):
    models_dir = os.path.join(app.static_folder, "models")
    if os.path.exists(os.path.join(models_dir, model_name)):
        return send_from_directory(models_dir, model_name)
    abort(404)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
