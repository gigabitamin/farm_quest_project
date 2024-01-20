from ..models import DiagnosisResult

import base64
import numpy as np
import matplotlib.pyplot as plt
import cv2
import pprint

from ultralytics import YOLO
import os
from PIL import Image
import pathlib
from django.conf import settings
import json



def detect(img_name):    
    pathlib.PosixPath = pathlib.WindowsPath
        
    try:
        file_name, file_extension = os.path.splitext(os.path.basename(img_name))

        media_path = settings.MEDIA_ROOT
        # print('media_path : ', media_path)
        
        img_path = os.path.join(media_path, img_name)
        # print('img_path : ', img_path)
        
        project_path = os.path.join(media_path, os.path.dirname(img_name), 'result_img') 
        # print('project_path : ', project_path)
        if not os.path.exists(project_path):
            os.mkdir(project_path)
                        
        serialized_results_path = os.path.join(media_path, os.path.dirname(img_name), 'result_json')
        serialized_results_file_path = os.path.join(serialized_results_path, os.path.basename(img_name) + '.json')
        # print('serialized_results_file_path : ', serialized_results_file_path)
        if not os.path.exists(serialized_results_path):
            os.mkdir(serialized_results_path)
            
    
        model = YOLO('yolo_model/pepper.pt')
        # model.info()
        # print('모델 클래스 개수 : ', len(model.names))        
        # print('모델 클래스 이름 : ', model.names)

        # 예측
        results = model.predict(
            source=img_path, 
            project=project_path, 
            name=file_name,
            save=True, 
            imgsz=416, 
            conf=0.4,
            max_det=1000,
            show_labels=True,
            show_conf=True,
            show_boxes=True,            
            save_txt=True,
            save_json=True,
            save_crop=True, 
            save_dir=True,  
            ) # , show = True, name='result_img'
        
        # 예측 결과 리스트를 직렬화
            
         
        # # 예측 정보 출력                        
        # for result in results:
        #     # ul 공식문서 참조 https://docs.ultralytics.com/ko/modes/predict/#__tabbed_1_1
        #     boxes = result.boxes  # Boxes object for bbox outputs
        #     print('boxes : ', boxes)
        #     masks = result.masks  # Masks object for segmentation masks outputs
        #     print('masks : ', masks)
        #     keypoints = result.keypoints  # Keypoints object for pose outputs
        #     print('keypoints : ', keypoints)
        #     probs = result.probs  # Probs object for classification outputs
        #     print('probs : ', probs)
            
        #     # 클래스 정보 출력
        #     uniq, cnt = np.unique(result.boxes.cls.cpu().numpy(), return_counts=True)  # Torch.Tensor -> numpy
        #     uniq_cnt_dict = dict(zip(uniq, cnt))
        #     print('class num : counts = ', uniq_cnt_dict,)
        #     for c in result.boxes.cls:
        #         print('class num = ', int(c), ', class_name =', model.names[int(c)])

        # 예측 결과 이미지 서버 media/result_img 에 저장
        serialized_results_list = []
        for result in results:
            im_array = result.plot()
            im = Image.fromarray(im_array[..., ::-1])
            # im.show()
            result_path = os.path.join(project_path, os.path.basename(img_name))
            # print('result_path', result_path)
            im.save(result_path)
            # print('저장 완료')
            sr_result = serialize_results(result)
            # print('sr_result : ', sr_result)
            serialized_results_list.append(sr_result)
            # print('serialized_results_list : ', serialized_results_list)                
        
        # save_to_json(serialized_results_list, serialized_results_file_path)
                    
        # print(serialized_results_list[0])
        
        # print('뭐야')
        with open(serialized_results_file_path, 'w') as file:
            json.dump(serialized_results_list[0], file, indent=2)
            # print('json 저장완료')

        save_results_to_database(serialized_results_list)
        print('\njson db 저장완료')
                                            
    except Exception as e:
        print(f"Error: {e}")
        
    return serialized_results_list



def serialize_results(results):
    # JSON 직렬화 가능한 정보 추출
    serialized_boxes = []

    if results:  # 'results'가 비어있지 않은 경우에만 처리
        for result in results:
            confidence_values = getattr(result.boxes, 'confidence', None)
            confidence_values = confidence_values.tolist() if confidence_values is not None else [1.0] * len(result.boxes)

            label_values = result.boxes.cls.tolist() if hasattr(result.boxes, 'cls') else None
            xyxy_values = result.boxes.xyxy.tolist() if hasattr(result.boxes, 'xyxy') else None

            serialized_boxes.append({
                'confidence': confidence_values,
                'label': label_values,
                'xyxy': xyxy_values
            })
            # print('serialized_boxes : ', serialized_boxes)

    # print('키포인트')
    serialized_keypoints = []
    if results and hasattr(results[0], 'keypoints') and results[0].keypoints is not None:
        for result in results:
            # 'keypoints' 속성이 있는 경우에만 처리
            keypoints_values = result.keypoints.keypoints.numpy().tolist() if hasattr(result.keypoints, 'keypoints') else None
            # print('1 : ', keypoints_values)
            scores_values = result.keypoints.scores.numpy().tolist() if hasattr(result.keypoints, 'scores') else None
            # print('2 : ', scores_values)
            labels_values = result.keypoints.labels.numpy().tolist() if hasattr(result.keypoints, 'labels') else None
            # print('3 : ', labels_values)
            serialized_keypoints.append({
                'keypoints': keypoints_values,
                'scores': scores_values,
                'labels': labels_values,
            })
            # print('serialized_keypoints : ', serialized_keypoints)

    # print('데이타')
    
    # 'orig_img'를 Base64로 인코딩하여 추가
    # orig_img_base64 = None
    # if results and hasattr(results[0], 'orig_img') and results[0].orig_img is not None:
    #     orig_img_base64 = base64.b64encode(results[0].orig_img.tobytes()).decode('utf-8')
    
    serializable_data = {
        'boxes': serialized_boxes,
        'keypoints': serialized_keypoints if serialized_keypoints else None,
        'masks': None,  # 'masks'는 처리하지 않음        
        'names': results[0].names if results and hasattr(results[0], 'names') else None,        
        'orig_shape': results[0].orig_shape if results else None,
        'path': results[0].path if results else None,
        'probs': results[0].probs if results and hasattr(results[0], 'probs') else None,
        'save_dir': results[0].save_dir if results else None,
        'speed': results[0].speed if results else None,
        # 'orig_img': orig_img_base64,
        
    }
    # print('serializable_data : ', serializable_data)

    return serializable_data





def save_results_to_database(serialized_results_list):
    for serialized_result in serialized_results_list:
        try:
            # 이미지 데이터가 문자열인 경우
            # image_data_str = serialized_result.get('orig_img')
            # image_data_binary = image_data_str.encode('utf-8')            
            # 모델 인스턴스 생성 및 데이터 저장
            result_instance = DiagnosisResult.objects.create(
                boxes=serialized_result.get('boxes'),
                keypoints=serialized_result.get('keypoints'),
                masks=serialized_result.get('masks'),
                names=serialized_result.get('names'),
                orig_shape=serialized_result.get('orig_shape'),
                path=serialized_result.get('path'),
                probs=serialized_result.get('probs'),
                save_dir=serialized_result.get('save_dir'),
                speed=serialized_result.get('speed'),
                # orig_img=image_data_binary
            )

            # 저장된 결과 확인
            print(f"Result {result_instance.id} saved successfully.")
        except Exception as e:
            print(f"Error saving result to database: {e}")

