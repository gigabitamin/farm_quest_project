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

    
# class SolutionAPIMixins(
#     mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView
# ):    
#     queryset = SolutionTb.objects.all()
#     serializer_class = SolutionTbSerializer
    
#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args, **kwargs)


# class SolutionListAPI(APIView):
#     queryset = SolutionTb.objects.objects.filter(Q(disease_code__contains=disease_code))
#     serializer_class = SolutionTbSerializer

#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args, **kwargs)

        
def solution_service(tf_predict_disease_list):  
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
            serializer = SolutionTbSerializer(solution_row, many=True)
            serialized_data = serializer.data
            solution_row_list.append(serialized_data)
            # print('solution_row_list = ', solution_row_list)
            
    tf_predict_result_list = [[dl, sl[0]] for dl, sl in zip(tf_predict_disease_list, solution_row_list)]
    print('tf_predict_result_list = ', tf_predict_result_list)
    tf_predict_result_list_sorted = sorted(tf_predict_result_list, key=lambda x: x[0][4], reverse=True)
    print('tf_predict_result_list_sorted = ', tf_predict_result_list_sorted)
    
    # for solution_row in solution_row_list:
    #     # serializer = SolutionTbSerializer(solution_row, many=True)
    #     serializer = SolutionTbSerializer(solution_row, many=True)
    #     solution_row_list_serialized.append(serializer.data)
        
    # print('solution_row_list_serialized', solution_row_list_serialized)        
    # return solution_row_list_serialized    
        
    # solution_row_list_serialized2의 각 OrderedDict를 딕셔너리로 변환
    # solution_row_list_serialized_dict = [dict(item) for item in solution_row_list_serialized]

    # 딕셔너리를 JSON으로 직렬화
    # json_data = json.dumps(solution_row_list_serialized_dict)

    # JSON 데이터를 클라이언트에게 전송
    return tf_predict_result_list_sorted



def detect(save_file_path, plant_name, user_select_plant):    
    pathlib.PosixPath = pathlib.WindowsPath
    serialized_results_list = []
    try: 
        print('save_file_path', save_file_path)       
        file_name, file_extension = os.path.splitext(os.path.basename(save_file_path))
        print('img_name', file_name)

        media_path = settings.MEDIA_ROOT
        print('media_path : ', media_path)
        
        img_path = os.path.join(media_path, save_file_path)
        print('img_path : ', img_path)
        
        project_path = os.path.join(media_path, os.path.dirname(save_file_path), 'result_img') 
        print('project_path : ', project_path)
        if not os.path.exists(project_path):
            os.mkdir(project_path)
                        
        
        serialized_results_path = os.path.join(media_path, os.path.dirname(img_path), 'result_json')
        print('serialized_results_path : ', serialized_results_path)
        serialized_results_file_path = os.path.join(serialized_results_path, file_name + '.json')
        print('serialized_results_file_path : ', serialized_results_file_path)
        if not os.path.exists(serialized_results_path):
            os.makedirs(serialized_results_path)
        print(plant_name)
            
        if plant_name == '고추':
            model = YOLO('yolo_model/pepper.pt')
        elif plant_name == '딸기':
            model = YOLO('yolo_model/strawberry.pt')
        elif plant_name == '시설포도':
            model = YOLO('yolo_model/grape.pt')
        elif plant_name == '오이':
            model = YOLO('yolo_model/cucumber.pt')
        elif plant_name == '토마토':
            model = YOLO('yolo_model/tomato.pt')
        elif plant_name == '파프리카':
            model = YOLO('yolo_model/paprika.pt')                                                
            
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
            result_path = os.path.join(project_path, os.path.basename(save_file_path))
            # print('result_path', result_path)
            im.save(result_path)
            # print('저장 완료')
            # print('result 추출 : ', result)
            sr_result = serialize_results(result, user_select_plant)
            # print('sr_result : ', sr_result)
            serialized_results_list.append(sr_result)
            # print('serialized_results_list : ', serialized_results_list)                
        
        # save_to_json(serialized_results_list, serialized_results_file_path)
                    
        # print(serialized_results_list[0])
        
        # print('뭐야')
        with open(serialized_results_file_path, 'w') as file:
            json.dump(serialized_results_list[0], file, indent=2)
            # print('json 저장완료')
            
        diagnosis_result_id_list = []        
        diagnosis_result_id_list = save_results_to_database(serialized_results_list)
        print('diagnosis_result_id_list : ', diagnosis_result_id_list)
        print('\njson db 저장완료\n')
        
        # print('serialized_results_list : ', serialized_results_list)
        
   
        
        print('test ex')
        
        # print('tf_pred_prob : ', tf_pred_prob,
        #       'predict_desease_list', tf_predict_desease_list)
        
        # tf_result = {'tf_pred_prob : ', tf_pred_prob,
        #       'predict_desease_list', tf_predict_desease_list}
        # print('tf_predict_desease_list_sorted = ', tf_predict_desease_list_sorted)
        
        tf_predict_disease_list, crops_path_list = tf_detect(serialized_results_list, plant_name, user_select_plant)
        
        tf_predict_result_list_sorted = solution_service(tf_predict_disease_list)
        print('tf_predict_result_list_sorted = ', tf_predict_result_list_sorted)
        
        
        
        
        
        
        # print('solution_row_list_serialized2 = ', solution_row_list_serialized)
                                                            
    except Exception as e:
        print(f"Error: {e}")
        
    detect_result = {'diagnosis_result_id_list': diagnosis_result_id_list,                
               'crops_path_list': crops_path_list, 
               'serialized_results_list': serialized_results_list,                
               'tf_predict_result_list_sorted': tf_predict_result_list_sorted,
            #    'tf_predict_result_list': tf_predict_result_list,
    }
    print ('전송')
        

    # return serialized_results_list, diagnosis_result_id_list, tf_predict_desease_list_sorted, crops_path_list, solution_row_list_serialized
    return detect_result
    # return serialized_results_list, diagnosis_result_id_list





def serialize_results(results, user_select_plant):
    # JSON 직렬화 가능한 정보 추출
    serialized_boxes = []
    
    if results:  # 'results'가 비어있지 않은 경우에만 처리
        for result in results:
            
            # 테스트 용 for 문, 직렬화를 위해 개별 key 리스트로 처리
            # confidence_list = []
            # for box in result.boxes:
            #     confidence = box.conf.item()
            #     print('confidence:', confidence)
            #     confidence_list.append(confidence)
                
            # print('confidence_list : ', confidence_list)
            # print('result.boxes', result.boxes)
                    
            # confidence_values = getattr(result.boxes, 'conf', None)
            # confidence_values = confidence_values.tolist() if confidence_values is not None else [1.0] * len(result.boxes)
            
            confidence_values = result.boxes.conf.tolist() if hasattr(result.boxes, 'conf') else None
            label_values = result.boxes.cls.tolist() if hasattr(result.boxes, 'cls') else None
            xyxy_values = result.boxes.xyxy.tolist() if hasattr(result.boxes, 'xyxy') else None

            # confidence_values = result.get('boxes', {}).get('conf', []).tolist()
            # label_values = result.get('boxes', {}).get('cls', []).tolist()
            # xyxy_values = result.get('boxes', {}).get('xyxy', []).tolist()

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

    return serializable_data




def save_results_to_database(serialized_results_list):    
    result_instance_diagnosis_result_id_list = []
    for serialized_result in serialized_results_list:
        try:
            # user_select_plant 문자열에서 인스턴스로 변환
            plant_no = serialized_result.get('user_select_plant')
            user_select_plant = PlantTb.objects.get(plant_no=plant_no)

            # 나머지 데이터로 모델 인스턴스 생성 및 저장
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




def tf_detect(serialized_results_list, plant_name, user_select_plant):
    # print('1', serialized_results_list)
    path_origin = serialized_results_list[0]['path']
    # print('2', serialized_results_list[0])
    box = serialized_results_list[0]['boxes']
    print('3',box)
    label_key = int(box[0]['label'][0])
    print('4', label_key)        
    names = serialized_results_list[0]['names']
    print('5', names)
    name = names[label_key]
    # print('6', name)
    conf = box[0]['confidence']
    print('7', conf)
    label = names[label_key]
    print('8', label)
    
    # 기본경로
    path_dir = os.path.dirname(path_origin)
    path_dir

    # 파일명
    path_file = os.path.basename(path_origin)
    path_file

    # 파일명 확장자 분리
    file_name, file_extension = os.path.splitext(path_file)
    file_name, file_extension

    # result path
    result_path = 'result_img'
    
    # crops folder
    crops_folder = 'crops'

    # label
    label = label

    # crops path    
    crops_path = os.path.join(path_dir, result_path, file_name, crops_folder, label, file_name+'.jpg')
    crops_path

    crops_all = os.path.join(path_dir, 'result_img', file_name, 'crops', '*', file_name+'.jpg')
    crops_all

    crops_all_list = glob.glob(crops_all)
    crops_all_list

    plant = ['고추', '딸기', '시설포도', '오이', '토마토', '파프리카']
    
    print('tf test 1')
    
    crops_path_list = []
    for crops_path in crops_all_list:
        if crops_path.split(os.sep)[-2] not in plant:
            crops_path_list.append(crops_path)
            print('tf test 2')

    print('crops_path_list', crops_path_list)
    print('plant_name', plant_name)

    if plant_name == '고추':
        model = load_model('tf_model/pepper.keras')
    elif plant_name == '딸기':
        model = load_model('tf_model/strawberry.keras')
    elif plant_name == '시설포도':
        model = load_model('tf_model/grape.keras')
    elif plant_name == '오이':
        model = load_model('tf_model/cucumber.keras')
    elif plant_name == '토마토':
        model = load_model('tf_model/tomato.keras')
    elif plant_name == '파프리카':
        model = load_model('tf_model/paprika.keras')
    
    # model.summary()
    print('test 1')
    # 테스트 샘플 이미지 전처리 
    image_size_x = 512
    image_size_y = 512

    X_t = []
    Y_t = []

    # 이미지 전처리
    for fname in crops_path_list:
        img = Image.open(fname).convert("RGB").resize((image_size_x, image_size_y))
        data = (np.asarray(img).astype('float32')) / 255
        X_t.append(data)
        crop_name = fname.split(os.sep)[-2]
        Y_t.append(crop_name)
    
    X_t = np.array(X_t)
    # X_t
    # print('X_t', X_t)
    print('Y_t', Y_t)
    # 예측 실행 
    pred_prob = model.predict(X_t)        
            
    disease_dict = {'1':{'a1':'딸기잿빛곰팡이병','a2':'딸기흰가루병','b1':'냉해피해','b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)','c1':'딸기잿빛곰팡이병반응', 'c2':'딸기흰가루병반응'},
           '2':{'a5':'토마토흰가루병','a6':'토마토잿빛곰팡이병','b2':'열과','b3':'칼슘결핍','b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)','c5':'토마토흰가루병반응','c6':'토마토잿빛곰팡이병반응',},
            '2':{'b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)','a6':'토마토잿빛곰팡이병','a5':'토마토흰가루병','b3':'칼슘결핍','b2':'열과','c6':'토마토잿빛곰팡이병반응','c5':'토마토흰가루병반응',},
            '3':{'a9':'파프리카흰가루병','a10':'파프리카잘록병','b3':'칼슘결핍','b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)','c9':'파프리카흰가루병반응'},
            '4':{'a3':'오이노균병','a4':'오이흰가루병','b1':'냉해피해','b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)', 'c3':'오이노균병반응', 'c4':'오이흰가루병반응'},
            '5':{'a7':'고추탄저병','a8':'고추흰가루병','b3':'칼슘결핍','b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)','c7':'고추탄저병반응'},
            '6':{'a11':'시설포도탄저병','a12':'시설포도노균병','b4':'일소피해','b5':'축과병', 'c11':'시설포도탄저병반응', 'c12':'시설포도노균병반응'}}    
    
    if plant_name == '고추':
        disease = disease_dict['5']
    elif plant_name == '딸기':
        disease = disease_dict['1']
    elif plant_name == '시설포도':
        disease = disease_dict['6']
    elif plant_name == '오이':
        disease = disease_dict['4']
    elif plant_name == '토마토':
        disease = disease_dict['2']
    elif plant_name == '파프리카':
        disease = disease_dict['3']

    print('disease = ', disease)        
    print()
    print('pred_prob = ', pred_prob)
    
    disease_codes = list(disease.keys())
    disease_codes.append('0')
    # disease_keys.insert(0, '0')
    print('disease_codes = ', disease_codes)
    disease_names = list(disease.values())
    print('disease_values = ',disease_names)
    # disease_items = list(disease.items())
    # print('disease_items = ', disease_items)
    
    disease_predict_probability = pred_prob[0]
    disease_predict_probability = str(disease_predict_probability).strip('[]').split()
    disease_predict_probability = [float(number.replace(',', '')) for number in disease_predict_probability]
    
    # tf_desease_predict_list = [[dc, dn, dp] for dc, dn, dp in zip(disease_codes, disease_names, desease_predict_probability)]
    
    tf_disease_predict_list = [[user_select_plant, plant_name, dc, dn, dp] for dc, dn, dp in zip(disease_codes, disease_names, disease_predict_probability)]


    # print('tf_desease_predict_list = ', tf_desease_predict_list)
    # tf_desease_predict_list_sorted = sorted(tf_disease_predict_list, key=lambda x: x[4], reverse=True)
    # print('tf_desease_predict_list_sorted = ', tf_desease_predict_list_sorted)
                            

    for idx, pred in enumerate(pred_prob):        
        max_idx = pred.argmax()

        print('테스트 파일 : ', crops_path_list[idx])
        print('Yolo : ', Y_t[idx])
        print('Yolo : ', Y_t[idx].split('_')[0])        
        print('예측 : ', disease_codes[max_idx])
        print('예측 : ', disease_names[max_idx])
        # print('예측 : ', disease_items[max_idx])

        
        # predict_desease_list = [dict(zip(disease_keys, p.tolist())) for p in pred_prob]        
        # sorted_predict_desease_values = dict(sorted(zip(disease_values, pred.tolist()), key=lambda item: item[1], reverse=True))
        # sorted_predict_desease_keys = dict(sorted(zip(disease_keys, pred.tolist()), key=lambda item: item[1], reverse=True))
        # sorted_predict_desease_items = dict(sorted(zip(disease_items, pred.tolist()), key=lambda item: item[1], reverse=True))
        # sorted_predict_desease = dict(sorted_predict_desease_keys, sorted_predict_desease_values)
        # predict_desease_list.append(sorted_predict_desease)
        
        # predict_desease = dict(zip(disease_values, p.tolist()))
        # predict_desease_list.append(predict_desease)        
        
        if Y_t[idx].split('_')[0] == disease_names[max_idx]:
            print('--> True')
        else:
            print('--> False')
            
    print(len(tf_disease_predict_list))
    for result in tf_disease_predict_list:
        print(len(result), end=', ')
        print()
                
        
    return tf_disease_predict_list, crops_path_list
        