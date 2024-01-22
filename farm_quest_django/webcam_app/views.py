from django.shortcuts import render
import cv2
from django.http import StreamingHttpResponse
import datetime
from ultralytics import YOLO
from deep_sort_realtime.deepsort_tracker import DeepSort

CONFIDENCE_THRESHOLD = 0.6
GREEN = (0, 255, 0)
WHITE = (255, 255, 255)

plant = open('C:/AIWorkspace/source_code/plant_list.txt', 'r')
data = plant.read()
class_list = data.split('\n')
plant.close()

model = YOLO('C:/AIWorkspace/source_code/yolov8n.pt')
tracker = DeepSort(max_age=50)

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

def generate():
    while True:
        start = datetime.datetime.now()

        ret, frame = cap.read()
        if not ret:
            print('카메라 오류')
            break

        detection = model.predict(source=[frame], save=False)[0]
        results = []

        for data in detection.boxes.data.tolist():
            confidence = float(data[4])
            if confidence < CONFIDENCE_THRESHOLD:
                continue

            xmin, ymin, xmax, ymax = int(data[0]), int(data[1]), int(data[2]), int(data[3])
            label = int(data[5])
            results.append([[xmin, ymin, xmax - xmin, ymax - ymin], confidence, label])

        tracks = tracker.update_tracks(results, frame=frame)

        for track in tracks:
            if not track.is_confirmed():
                continue

            track_id = track.track_id
            ltrb = track.to_ltrb()
            xmin, ymin, xmax, ymax = int(ltrb[0]), int(ltrb[1]), int(ltrb[2]), int(ltrb[3])
            cv2.rectangle(frame, (xmin, ymin), (xmax, ymax), GREEN, 2)
            cv2.rectangle(frame, (xmin, ymin - 20), (xmin + 20, ymin), GREEN, -1)
            cv2.putText(frame, str(track_id), (xmin + 5, ymin - 8), cv2.FONT_HERSHEY_SIMPLEX, 0.5, WHITE, 2)

        end = datetime.datetime.now()
        total = (end - start).total_seconds()
        fps = f'FPS: {1 / total:.2f}'
        cv2.putText(frame, fps, (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

        _, jpeg = cv2.imencode('.jpg', frame)
        frame_bytes = jpeg.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n\r\n')

def webcam_feed(request):
    return StreamingHttpResponse(generate(), content_type='multipart/x-mixed-replace; boundary=frame')

def index(request):
    return render(request, 'webcam_app/index.html')
