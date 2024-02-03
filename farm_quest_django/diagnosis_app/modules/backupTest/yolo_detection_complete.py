from ultralytics import YOLO
import os
from PIL import Image
import pathlib
from django.conf import settings
import numpy as np
import matplotlib.pyplot as plt
import cv2
import pprint

def detect(img_name):    
    pathlib.PosixPath = pathlib.WindowsPath
        
    try:
        media_path = settings.MEDIA_ROOT
        print('media_path : ', media_path)
        project_path = os.path.join(media_path, 'result_img') 
        print('project_path : ', project_path)
        
        if not os.path.exists(project_path):
            os.mkdir(project_path)
                
        img_path = os.path.join(media_path, img_name)
        print('img_path : ', img_path)                

        model = YOLO('yolo_model/pepper.pt')
        # model.info()
        print('모델 클래스 개수 : ', len(model.names))        
        print('모델 클래스 이름 : ', model.names)

        # 예측
        results = model.predict(
            source=img_path, 
            project=project_path, 
            # save=True, 
            imgsz=416, 
            conf=0.5,
            max_det=1000,
            show_labels=True,
            show_conf=True,
            show_boxes=True,
            ) # , show = True, name='result_img'
        
        # 예측 정보 출력                        
        for result in results:
            # ul 공식문서 참조 https://docs.ultralytics.com/ko/modes/predict/#__tabbed_1_1
            boxes = result.boxes  # Boxes object for bbox outputs
            masks = result.masks  # Masks object for segmentation masks outputs
            keypoints = result.keypoints  # Keypoints object for pose outputs
            probs = result.probs  # Probs object for classification outputs
            
            # 클래스 정보 출력
            uniq, cnt = np.unique(result.boxes.cls.cpu().numpy(), return_counts=True)  # Torch.Tensor -> numpy
            uniq_cnt_dict = dict(zip(uniq, cnt))
            print('class num : counts = ', uniq_cnt_dict,)
            for c in result.boxes.cls:
                print('class num = ', int(c), ', class_name =', model.names[int(c)])

        # 예측 결과 이미지 페이지에 출력
        for r in results:
            im_array = r.plot()
            im = Image.fromarray(im_array[..., ::-1]) 
            # im.show()
            result_path = os.path.join(project_path, img_name)
            print('result_path', result_path)
            im.save(result_path)               

    except Exception as e:
        print(f"Error: {e}")


