from rest_framework.response import Response
from django.http import JsonResponse
import pandas as pd
import matplotlib.image as mpimg
from ..models import DiagnosisResult, PlantTb

import base64
import numpy as np
import matplotlib.pyplot as plt
import cv2
import pprint
import glob

from ultralytics import YOLO
import os
from PIL import Image
import pathlib
from django.conf import settings
import json

from keras.models import load_model
from tensorflow import keras
import tensorflow as tf

from ..models import SolutionTb
from django.db.models import Q
from ..serializers import SolutionTbSerializer

from rest_framework import mixins, generics
from rest_framework import status

from pathlib import Path
# import platform 
# import pathlib 
# plt = platform.system() 
# if plt == 'Linux': pathlib.WindowsPath = pathlib.PosixPath


os.environ['CUDA_VISIBLE_DEVICES'] = 'cpu'


def plant_select_result(plant_name):
        
    yolo_class = ['딸기', 
    '토마토', 
    '파프리카', 
    '오이', 
    '고추', 
    '포도', 
    '딸기잿빛곰팡이병_초기', 
    '딸기잿빛곰팡이병_중기',
    '딸기잿빛곰팡이병_말기',
    '딸기흰가루병_초기',
    '딸기흰가루병_중기',
    '딸기흰가루병_말기',
    '오이노균병_초기',
    '오이노균병_중기',
    '오이노균병_말기',
    '오이흰가루병_초기',
    '오이흰가루병_중기',
    '오이흰가루병_말기',
    '토마토흰가루병_초기',
    '토마토흰가루병_중기',
    '토마토흰가루병_말기',
    '토마토잿빛곰팡이병_초기',
    '토마토잿빛곰팡이병_중기',
    '토마토잿빛곰팡이병_말기',
    '고추탄저병_초기',
    '고추탄저병_중기',
    '고추탄저병_말기',
    '고추흰가루병_초기',
    '고추흰가루병_중기',
    '고추흰가루병_말기',
    '파프리카흰가루병_초기',
    '파프리카흰가루병_중기',
    '파프리카흰가루병_말기',
    '파프리카잘록병_초기',
    '파프리카잘록병_중기',
    '파프리카잘록병_말기',
    '시설포도탄저병_초기',
    '시설포도탄저병_중기',
    '시설포도탄저병_말기',
    '시설포도노균병_초기',
    '시설포도노균병_중기',
    '시설포도노균병_말기',
    '냉해피해_초기',
    '냉해피해_중기',
    '냉해피해_말기',
    '열과_초기',
    '열과_중기',
    '열과_말기',
    '칼슘결핍_초기',
    '칼슘결핍_중기',
    '칼슘결핍_말기',
    '일소피해_초기',
    '일소피해_중기',
    '일소피해_말기',
    '축과병_초기',
    '축과병_중기',
    '축과병_말기',
    '다량원소결핍 (N)_초기',
    '다량원소결핍 (N)_중기',
    '다량원소결핍 (N)_말기',
    '다량원소결핍 (P)_초기',
    '다량원소결핍 (P)_중기',
    '다량원소결핍 (P)_말기',
    '다량원소결핍 (K)_초기',
    '다량원소결핍 (K)_중기',
    '다량원소결핍 (K)_말기',
    '딸기잿빛곰팡이병반응_초기',
    '딸기잿빛곰팡이병반응_중기',
    '딸기잿빛곰팡이병반응_말기',
    '딸기흰가루병반응_초기',
    '딸기흰가루병반응_중기',
    '딸기흰가루병반응_말기',
    '오이노균병반응_초기',
    '오이노균병반응_중기',
    '오이노균병반응_말기',
    '오이흰가루병반응_초기',
    '오이흰가루병반응_중기',
    '오이흰가루병반응_말기',
    '토마토흰가루병반응_초기',
    '토마토흰가루병반응_중기',
    '토마토흰가루병반응_말기',
    '토마토잿빛곰팡이병반응_초기',
    '토마토잿빛곰팡이병반응_중기',
    '토마토잿빛곰팡이병반응_말기',
    '고추탄저병반응 _초기',
    '고추탄저병반응 _중기',
    '고추탄저병반응 _말기',
    '파프리카흰가루병반응_초기',
    '파프리카흰가루병반응_중기',
    '파프리카흰가루병반응_말기',
    '시설포도탄저병반응_초기',
    '시설포도탄저병반응_중기',
    '시설포도탄저병반응_말기',
    '시설포도노균병반응_초기',
    '시설포도노균병반응_중기',
    '시설포도노균병반응_말기'
    ]
    
    disease_dict = {'1':{'a1':'딸기잿빛곰팡이병','a2':'딸기흰가루병','b1':'냉해피해','b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)','c1':'딸기잿빛곰팡이병반응', 'c2':'딸기흰가루병반응'},
        '2':{'a5':'토마토흰가루병','a6':'토마토잿빛곰팡이병','b2':'열과','b3':'칼슘결핍','b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)','c5':'토마토흰가루병반응','c6':'토마토잿빛곰팡이병반응',},
        '2':{'b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)','a6':'토마토잿빛곰팡이병','a5':'토마토흰가루병','b3':'칼슘결핍','b2':'열과','c6':'토마토잿빛곰팡이병반응','c5':'토마토흰가루병반응',},
        '3':{'a9':'파프리카흰가루병','a10':'파프리카잘록병','b3':'칼슘결핍','b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)','c9':'파프리카흰가루병반응'},
        '4':{'a3':'오이노균병','a4':'오이흰가루병','b1':'냉해피해','b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)', 'c3':'오이노균병반응', 'c4':'오이흰가루병반응'},
        '5':{'a7':'고추탄저병','a8':'고추흰가루병','b3':'칼슘결핍','b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)','c7':'고추탄저병반응'},
        '6':{'a11':'시설포도탄저병','a12':'시설포도노균병','b4':'일소피해','b5':'축과병', 'c11':'시설포도탄저병반응', 'c12':'시설포도노균병반응'}}            

    if plant_name == '고추':
        disease = disease_dict['5']
        yolo_model = YOLO('yolo_model/pepper.pt')
    elif plant_name == '딸기':
        disease = disease_dict['1']
        yolo_model = YOLO('yolo_model/strawberry.pt')
    elif plant_name == '포도':
        disease = disease_dict['6']
        yolo_model = YOLO('yolo_model/grape.pt')
    elif plant_name == '오이':
        disease = disease_dict['4']
        yolo_model = YOLO('yolo_model/cucumber.pt')
    elif plant_name == '토마토':
        disease = disease_dict['2']
        yolo_model = YOLO('yolo_model/tomato.pt')
    elif plant_name == '파프리카':
        disease = disease_dict['3']
        yolo_model = YOLO('yolo_model/paprika.pt')
                                       
    print('disease = ', disease)        
    disease_codes = list(disease.keys())
    disease_codes.append('0')
    # disease_keys.insert(0, '0')
    # print('disease_codes = ', disease_codes)
    disease_names = list(disease.values())
    # print('disease_values = ',disease_names)
    disease_items = list(disease.items())
    # print('disease_items = ', disease_items)
    
    return disease_dict, disease_codes, disease_names, disease_items, yolo_model, yolo_class


def detect(save_file_path, plant_name, user_select_plant):    
    # pathlib.PosixPath = pathlib.WindowsPath
    
    disease_dict, disease_codes, disease_names, disease_items, yolo_model, yolo_class = plant_select_result(plant_name)
        
    serialized_results_list = []
    tf_predict_disease_list = []
    tf_predict_result_list_sorted = []
    crops_path_list = []
    serialized_results_lists = []
    diagnosis_result_id_list = []    
    
    try: 
        # print('save_file_path', save_file_path)       
        file_name, file_extension = os.path.splitext(os.path.basename(save_file_path))
        # print('img_name', file_name)

        media_path = settings.MEDIA_ROOT
        # print('media_path : ', media_path)
        
        img_path = os.path.join(media_path, save_file_path)
        # print('img_path : ', img_path)

        project_path = os.path.join(media_path, os.path.dirname(save_file_path), 'result_img') 
        # print('project_path : ', project_path)
        if not os.path.exists(project_path):
            os.mkdir(project_path)
        
        serialized_results_path = os.path.join(media_path, os.path.dirname(img_path), 'result_json')
        # print('serialized_results_path : ', serialized_results_path)
        serialized_results_file_path = os.path.join(serialized_results_path, file_name + '.json')
        # print('serialized_results_file_path : ', serialized_results_file_path)
        if not os.path.exists(serialized_results_path):
            os.makedirs(serialized_results_path)
        # print(plant_name)
            
        # model.info()
        # print('모델 클래스 개수 : ', len(model.names))        
        # print('모델 클래스 이름 : ', model.names)

        # 예측
        results = yolo_model.predict(
            source=img_path, 
            project=project_path, 
            name=file_name,
            save=True, 
            imgsz=640, 
            conf=0.4,
            max_det=1000,
            # show_labels=True,
            # show_conf=True,
            show_boxes=True,
            save_txt=True,
            save_json=True,
            save_crop=True, 
            save_dir=True,
            ) # , show = True, name='result_img'
                         
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
        print('뭐야 대체')
        # 예측 결과 이미지 서버 media/result_img 에 저장
        
        for result in results:
            print('되냐')
            im_array = result.plot()
            im = Image.fromarray(im_array[..., ::-1])
            # im.show()
            result_path = os.path.join(project_path, os.path.basename(save_file_path))
            # print('result_path', result_path)
            im.save(result_path)
            # print('저장 완료')
            # print('result 추출 : ', result)
            sr_result, serialized_boxes = yolo_results(result, user_select_plant, disease_dict, disease_codes, disease_names, disease_items, yolo_class)
            # print('sr_result : ', sr_result)
            serialized_results_lists.append(sr_result)
            
            print('되냐고')
        
        # save_to_json(serialized_results_list, serialized_results_file_path)
        # print('serialized_results_list[0] = ', serialized_results_list[0])

        serialized_results_list = yolo_solution_service(serialized_results_lists)
        # print('serialized_results_list : ', serialized_results_list)
        # print('뭐야')
        with open(serialized_results_file_path, 'w') as file:
            json.dump(serialized_results_list[0], file, indent=2)
            print('json 저장완료')
                
        # diagnosis_result_id_list = save_results_to_database(serialized_results_list)
        # print('diagnosis_result_id_list : ', diagnosis_result_id_list)
        # print('\njson db 저장완료\n')
        
        # print('serialized_results_list : ', serialized_results_list)
                   
        print('test ex')

        if len(serialized_boxes) > 0 :
            tf_predict_disease_list, crops_path_lists = tf_detect(serialized_results_list, plant_name, user_select_plant, img_path, disease_dict, disease_names, disease_codes)
            # print('tf_predict_disease_list', tf_predict_disease_list)
        
        tf_predict_result_list_sorted = tf_solution_service(tf_predict_disease_list)
        
        print('crops_path_list 미디어', crops_path_lists)        


        for path in crops_path_lists:            
            modified_path = f'http://localhost:8000/media/{Path(path).as_posix().split("media/", 1)[-1]}'
            crops_path_list.append(modified_path)
        
        print('crops_path_list 미디어', crops_path_list)
                                                            
    except Exception as e:
        print(f"Error: {e}")
        
        
    detect_result = {
                # 'diagnosis_result_id_list': diagnosis_result_id_list,                
               'crops_path_list': crops_path_list, 
               'serialized_results_list': serialized_results_list,                
               'tf_predict_result_list_sorted': tf_predict_result_list_sorted,            
    }
    print ('전송')
            
    return detect_result    


def yolo_results(results, user_select_plant, disease_dict, disease_names, disease_codes, disease_items, yolo_class):    
    serialized_boxes = []
    disease_codes_list = []
    serialized_boxes = []
    
    # print('sr 없냐')
    if results:
        # print('sr 진짜 없냐')
            
        for result in results:
            # print('sr 진짜 진짜 없냐')
            
            confidence_values = result.boxes.conf.tolist() if hasattr(result.boxes, 'conf') else None
            label_values = result.boxes.cls.tolist() if hasattr(result.boxes, 'cls') else None
            xyxy_values = result.boxes.xyxy.tolist() if hasattr(result.boxes, 'xyxy') else None
            
            # 이 부분 수정
            if label_values is not None:
                label_values = [int(float(label)) for label in label_values]
            
            disease_codes_list = []  # 각 박스에 대한 disease 코드를 저장하는 리스트
            for label_value in label_values:
                try:
                    label_value = int(float(label_value))
                except ValueError:
                    pass                
                
                # print('label_value', label_value)        
                class_name = yolo_class[label_value]
                # print('class_name', class_name)
                if '_' in class_name:
                    class_name = class_name.split('_')[0]                
                else:
                    print('없')
                disease_code = '0'
                for code, name in disease_items:
                    if name == class_name:
                        disease_code = code
                        break

                disease_codes_list.append(disease_code)
            
            serialized_boxes.append({
                'confidence': confidence_values,
                'label': label_values,
                'xyxy': xyxy_values,
                'disease_code': disease_codes_list,
            })

        # print('serialized_boxes : ', serialized_boxes)

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

        print('데이타')
        
        # 'orig_img'를 Base64로 인코딩하여 추가
        # orig_img_base64 = None
        # if results and hasattr(results[0], 'orig_img') and results[0].orig_img is not None:
        #     orig_img_base64 = base64.b64encode(results[0].orig_img.tobytes()).decode('utf-8')
        
        serializable_data = {
            # 'diagnosis_result_id':diagnosis_result_id,
            'user_select_plant':user_select_plant,
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

        return serializable_data, serialized_boxes

def yolo_solution_service(serialized_results_lists):    
    solution_info_list = []
    solution_info_id_list = []
    
    # print("serialized_results_lists[0]['boxes']", serialized_results_lists[0]['boxes'])
    # print("len(serialized_results_lists[0]['boxes'])",len(serialized_results_lists[0]['boxes']))

    for box in serialized_results_lists[0]['boxes']:
        disease_code = box['disease_code'][0]
                
        if disease_code != '0':
            plant_no = str(serialized_results_lists[0]['user_select_plant'])
            # print('1plant_no', plant_no)
            solution_row = SolutionTb.objects.filter(Q(disease_code__contains=disease_code) & Q(plant_no__contains=plant_no))            
            # print('2solution_row-1', solution_row['solution_id'])
            serializer = SolutionTbSerializer(solution_row, many=True)
            # print('3serializer', serializer)
            serialized_data = serializer.data
            # print('4', serialized_data)
            
            solution_info_id_list.append(serialized_data[0]['solution_id'])
            solution_info_list.append(serialized_data[0])
            box['solution_info_id'] = serialized_data[0]['solution_id']
            box['solution_info'] = serialized_data[0]
        else:
            solution_info_id_list.append(None)
            solution_info_list.append(None)
        
    print('sr_solution 완료')
    return serialized_results_lists


def save_results_to_database(serialized_results_list):    
    result_instance_diagnosis_result_id_list = []
    for serialized_result in serialized_results_list:
        try:            
            plant_no = serialized_result.get('user_select_plant')
            user_select_plant = PlantTb.objects.get(plant_no=plant_no)
            
            result_instance = DiagnosisResult.objects.create(
                # diagnosis_result_id=serialized_result.get('diagnosis_result_id'),                
                user_select_plant=user_select_plant,
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
                                    
            print(f"Result {result_instance.diagnosis_result_id} saved successfully.")
        except Exception as e:
            print(f"Error saving result to database: {e}")
            
        result_instance_diagnosis_result_id_list.append(result_instance.diagnosis_result_id)
        
    return result_instance_diagnosis_result_id_list


def tf_detect(serialized_results_list, plant_name, user_select_plant, img_path, disease_dict, disease_names, disease_codes):
    plant = ['고추', '딸기', '포도', '오이', '토마토', '파프리카']
    
    box = []
    tf_disease_predict_list = []
    crops_path_list = []
    X_t = []
    Y_t = []
    pred_prob = []
    crops_path_list = []
    disease_predict_probability = []
    tf_disease_predict_list = []
        
    # print("serialized_results_list[0]['boxes']", serialized_results_list[0]['boxes'])
    
    path_origin = serialized_results_list[0]['path']
        
    if serialized_results_list[0]['boxes']:
        box = serialized_results_list[0]['boxes'] 
        print(len(box))
    
    # print('3',box)
        
    if len(box) > 0:
        label_key = int(box[0]['label'][0])
        print('4', label_key)        
        names = serialized_results_list[0]['names']
        # print('5', names)
        name = names[label_key]
        # print('6', name)
        conf = box[0]['confidence']
        # print('7', conf)
        label = names[label_key]
        print('8', label)
                
        path_dir = os.path.dirname(path_origin)
        path_file = os.path.basename(path_origin)        
        file_name, file_extension = os.path.splitext(path_file)                
        result_path = 'result_img'
        crops_folder = 'crops'
        label = label
        crops_path = os.path.join(path_dir, result_path, file_name, crops_folder, label, file_name+'.jpg')        
        crops_all = os.path.join(path_dir, 'result_img', file_name, 'crops', '*', file_name+'.jpg')                
        crops_all_list = glob.glob(crops_all)        
                
        for crops_path in crops_all_list:
            if crops_path.split(os.sep)[-2] not in plant:
                crops_path_list.append(crops_path)
        # print('crops_path_list', crops_path_list)
                
    # print('plant_name', plant_name)

    image_size_x = 256
    image_size_y = 256

    if plant_name == '고추':
        tf_model = load_model('tf_model/pepper.keras')        
    elif plant_name == '딸기':        
        tf_model = load_model('tf_model/strawberry.keras')
    elif plant_name == '포도':
        image_size_x = 512
        image_size_y = 512
        tf_model = load_model('tf_model/grape.keras')
    elif plant_name == '오이':
        tf_model = load_model('tf_model/cucumber.keras')
    elif plant_name == '토마토':
        image_size_x = 512
        image_size_y = 512
        tf_model = load_model('tf_model/tomato.keras')
    elif plant_name == '파프리카':
        tf_model = load_model('tf_model/paprika.keras')
    
    # model.summary()
    # print('test 1')

    if len(box) > 0:            
        for fname in crops_path_list:
            img = Image.open(fname).convert("RGB").resize((image_size_x, image_size_y))
            data = (np.asarray(img).astype('float32')) / 255
            X_t.append(data)
            crop_name = fname.split(os.sep)[-2]
            Y_t.append(crop_name)
    else:
        img = Image.open(img_path).convert("RGB").resize((image_size_x, image_size_y))
        data = (np.asarray(img).astype('float32')) / 255
        X_t.append(data)
    
    X_t = np.array(X_t)
    
    # print('X_t', X_t)
    # print('Y_t', Y_t)
            
    if len(X_t) > 0:
        pred_prob = tf_model.predict(X_t)  
                    
    # print('pred_prob = ', pred_prob)
        
    if len(pred_prob) > 0:
        for pred in pred_prob[0]:
            # print('오우야')
            disease_predict_prob = [float(number.replace(',', '')) for number in str(pred).strip('[]').split()]
            disease_predict_probability.append(disease_predict_prob[0])

    # print('disease_predict_probability', disease_predict_probability)
        
    for dc, dn, dp in zip(disease_codes, disease_names, disease_predict_probability):
        tf_disease_predict_list.append([user_select_plant, plant_name, dc, dn, dp])
                
    return tf_disease_predict_list, crops_path_list


def tf_solution_service(tf_predict_disease_list):  
    solution_row_list = []
    # solution_row_list_serialized = []
    # print('len = ', len(tf_predict_desease_list_sorted))
    
    for i in range(len(tf_predict_disease_list)):
        plant_no = tf_predict_disease_list[i][0]
        disease_code = tf_predict_disease_list[i][2]
    
        # print('disease_code = ', disease_code)
        if disease_code != '0':
            # solution_row = SolutionTb.objects.filter(Q(disease_code__contains=disease_code))            
            solution_row = SolutionTb.objects.filter(Q(disease_code__contains=disease_code) & Q(plant_no__contains=plant_no))
            # print('solution_row', solution_row)
            serializer = SolutionTbSerializer(solution_row, many=True)
            # print('serializer', serializer)
            serialized_data = serializer.data
            # print('serialized_data', serialized_data)
            solution_row_list.append(serialized_data)
    # print('solution_row_list = ', solution_row_list)
    
    tf_predict_result_list = [[dl, sl[0]] for dl, sl in zip(tf_predict_disease_list, solution_row_list)]    
    # print('tf_predict_result_list = ', tf_predict_result_list)
    tf_predict_result_list_sorted = sorted(tf_predict_result_list, key=lambda x: x[0][4], reverse=True)    
    # print('tf_predict_result_list_sorted = ', tf_predict_result_list_sorted)
    
    return tf_predict_result_list_sorted


        