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

from db_settings import DjangoServer
os.environ['CUDA_VISIBLE_DEVICES'] = 'cpu'
from .yolo_class import plant_select_result
from .tf_detection import *



def detect(save_file_path, plant_name, user_select_plant):        
    disease_dict, disease_codes, disease_names, disease_items, yolo_model, yolo_class = plant_select_result(plant_name)
    serialized_results_list = []
    tf_predict_disease_list = []
    tf_predict_result_list_sorted = []
    crops_path_list = []
    serialized_results_lists = []
    diagnosis_result_id_list = []    
    
    try:         
        file_name, file_extension = os.path.splitext(os.path.basename(save_file_path))
        media_path = settings.MEDIA_ROOT        
        img_path = os.path.join(media_path, save_file_path)
        project_path = os.path.join(media_path, os.path.dirname(save_file_path), 'result_img')         
        if not os.path.exists(project_path):
            os.mkdir(project_path)
        
        serialized_results_path = os.path.join(media_path, os.path.dirname(img_path), 'result_json')        
        serialized_results_file_path = os.path.join(serialized_results_path, file_name + '.json')
        if not os.path.exists(serialized_results_path):
            os.makedirs(serialized_results_path)        

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
        
        for result in results:

            im_array = result.plot()
            im = Image.fromarray(im_array[..., ::-1])            
            result_path = os.path.join(project_path, os.path.basename(save_file_path))            
            im.save(result_path)

            sr_result, serialized_boxes = yolo_results(result, user_select_plant, disease_dict, disease_codes, disease_names, disease_items, yolo_class)
            serialized_results_lists.append(sr_result)
   

        serialized_results_list = yolo_solution_service(serialized_results_lists)

        with open(serialized_results_file_path, 'w') as file:
            json.dump(serialized_results_list[0], file, indent=2)

        if len(serialized_boxes) > 0 :
            tf_predict_disease_list, crops_path_lists = tf_detect(serialized_results_list, plant_name, user_select_plant, img_path, disease_dict, disease_names, disease_codes)        
        tf_predict_result_list_sorted = tf_solution_service(tf_predict_disease_list)
        
        for path in crops_path_lists:
            modified_path = f'{DjangoServer}/media/{Path(path).as_posix().split("media/", 1)[-1]}'
            crops_path_list.append(modified_path)        
        
                                                
    except Exception as e:
        print(f"Error: {e}")
        
        
    detect_result = {        
               'crops_path_list': crops_path_list, 
               'serialized_results_list': serialized_results_list,                
               'tf_predict_result_list_sorted': tf_predict_result_list_sorted,            
    }

    return detect_result    


def yolo_results(results, user_select_plant, disease_dict, disease_names, disease_codes, disease_items, yolo_class):    
    serialized_boxes = []
    disease_codes_list = []
    serialized_boxes = []
    
    if results:
        for result in results:
  
            confidence_values = result.boxes.conf.tolist() if hasattr(result.boxes, 'conf') else None
            label_values = result.boxes.cls.tolist() if hasattr(result.boxes, 'cls') else None
            xyxy_values = result.boxes.xyxy.tolist() if hasattr(result.boxes, 'xyxy') else None
                        
            if label_values is not None:
                label_values = [int(float(label)) for label in label_values]
            
            disease_codes_list = []
            for label_value in label_values:
                try:
                    label_value = int(float(label_value))
                except ValueError:
                    pass                
   
                class_name = yolo_class[label_value]

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

        serialized_keypoints = []
        if results and hasattr(results[0], 'keypoints') and results[0].keypoints is not None:
            for result in results:                
                keypoints_values = result.keypoints.keypoints.numpy().tolist() if hasattr(result.keypoints, 'keypoints') else None                
                scores_values = result.keypoints.scores.numpy().tolist() if hasattr(result.keypoints, 'scores') else None                
                labels_values = result.keypoints.labels.numpy().tolist() if hasattr(result.keypoints, 'labels') else None                
                serialized_keypoints.append({
                    'keypoints': keypoints_values,
                    'scores': scores_values,
                    'labels': labels_values,
                })
  
        print('데이타')

        serializable_data = {
            # 'diagnosis_result_id':diagnosis_result_id,
            'user_select_plant':user_select_plant,
            'boxes': serialized_boxes,
            'keypoints': serialized_keypoints if serialized_keypoints else None,
            'masks': None, 
            'names': results[0].names if results and hasattr(results[0], 'names') else None,        
            'orig_shape': results[0].orig_shape if results else None,
            'path': results[0].path if results else None,
            'probs': results[0].probs if results and hasattr(results[0], 'probs') else None,
            'save_dir': results[0].save_dir if results else None,
            'speed': results[0].speed if results else None,
            # 'orig_img': orig_img_base64,
        }   

        return serializable_data, serialized_boxes

def yolo_solution_service(serialized_results_lists):    
    solution_info_list = []
    solution_info_id_list = []
        
    for box in serialized_results_lists[0]['boxes']:
        disease_code = box['disease_code'][0]
                
        if disease_code != '0':
            plant_no = str(serialized_results_lists[0]['user_select_plant'])        
            solution_row = SolutionTb.objects.filter(Q(disease_code__contains=disease_code) & Q(plant_no__contains=plant_no))                        
            serializer = SolutionTbSerializer(solution_row, many=True)
            serialized_data = serializer.data
            
            solution_info_id_list.append(serialized_data[0]['solution_id'])
            solution_info_list.append(serialized_data[0])
            box['solution_info_id'] = serialized_data[0]['solution_id']
            box['solution_info'] = serialized_data[0]
        else:
            solution_info_id_list.append(None)
            solution_info_list.append(None)
        
    return serialized_results_lists


def save_results_to_database(serialized_results_list):    
    result_instance_diagnosis_result_id_list = []
    for serialized_result in serialized_results_list:
        try:            
            plant_no = serialized_result.get('user_select_plant')
            user_select_plant = PlantTb.objects.get(plant_no=plant_no)
            
            result_instance = DiagnosisResult.objects.create(              
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
                                    
            print(f"Result {result_instance.diagnosis_result_id} saved successfully")
        except Exception as e:
            print(f"Error saving result to database: {e}")
            
        result_instance_diagnosis_result_id_list.append(result_instance.diagnosis_result_id)
        
    return result_instance_diagnosis_result_id_list


        