# 카메라 실시간 영상 스트리밍 객체탐지 테스트 용
from flask import Flask, render_template
from flask_socketio import SocketIO
import cv2
import base64
import threading
import time

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

def emit_frames():
    while True:
        ret, frame = cap.read()
        if not ret:
            print('Cam Error')
            break

        _, buffer = cv2.imencode('.jpg', frame)
        data = base64.b64encode(buffer).decode('utf-8')

        socketio.emit('frame', data)
        time.sleep(0.05)

@app.route('/')
def yolo_cv2_page():
    return render_template('book_app/yolo_cv2.html')

if __name__ == '__main__':
    threading.Thread(target=emit_frames, daemon=True).start()
    socketio.run(app, debug=True, port=5001)  # Different port than Django
