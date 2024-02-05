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



def detect(save_file_path, plant_name, user_select_plant):    
    pathlib.PosixPath = pathlib.WindowsPath
    serialized_results_list = []
    try:        
        file_name, file_extension = os.path.splitext(os.path.basename(save_file_path))

        media_path = settings.MEDIA_ROOT
        # print('media_path : ', media_path)
        
        img_path = os.path.join(media_path, save_file_path)
        # print('img_path : ', img_path)
        
        project_path = os.path.join(media_path, os.path.dirname(save_file_path), 'result_img') 
        # print('project_path : ', project_path)
        if not os.path.exists(project_path):
            os.mkdir(project_path)
                        
        serialized_results_path = os.path.join(media_path, os.path.dirname(save_file_path), 'result_json')
        serialized_results_file_path = os.path.join(serialized_results_path, os.path.basename(save_file_path) + '.json')
        print('serialized_results_file_path : ', serialized_results_file_path)
        if not os.path.exists(serialized_results_path):
            os.mkdir(serialized_results_path)
        print('plant 플랜드 : ', plant_name)
            
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
        
        tf_pred_prob, tf_predict_desease_list, crops_path_list = tf_detect(serialized_results_list, plant_name)
        
        print('test ex')
        
        # print('tf_pred_prob : ', tf_pred_prob,
        #       'predict_desease_list', tf_predict_desease_list)
        
        # tf_result = {'tf_pred_prob : ', tf_pred_prob,
        #       'predict_desease_list', tf_predict_desease_list}
                                                    
    except Exception as e:
        print(f"Error: {e}")
        
    return serialized_results_list, diagnosis_result_id_list, tf_pred_prob, tf_predict_desease_list, crops_path_list
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
                        
            # 저장된 결과 확인
            print(f"Result {result_instance.diagnosis_result_id} saved successfully.")
        except Exception as e:
            print(f"Error saving result to database: {e}")
            
        result_instance_diagnosis_result_id_list.append(result_instance.diagnosis_result_id)
        
    return result_instance_diagnosis_result_id_list




def tf_detect(serialized_results_list, plant_name):
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
    print('6', name)
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
    
    model.summary()
    
    # 테스트 샘플 이미지 전처리 
    image_size_x = 256
    image_size_y = 256

    X_t = []
    Y_t = []

    # 이미지 전처리
    for fname in crops_path_list:
        img = Image.open(fname).convert("RGB").resize((image_size_x, image_size_y))
        data = (np.asarray(img).astype('float32')) / 255
        X_t.append(data)
        Y_t.append(fname)

    X_t = np.array(X_t)
    # X_t
    
    # 예측 실행 
    pred_prob = model.predict(X_t)
    pred_prob[0]
        
    disease_dict = {'1':{'a1':'딸기잿빛곰팡이병','a2':'딸기흰가루병','b1':'냉해피해','b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)','c1':'딸기잿빛곰팡이병반응', 'c2':'딸기흰가루병반응'},
           '2':{'a5':'토마토흰가루병','a6':'토마토잿빛곰팡이병','b2':'열과','b3':'칼슘결핍','b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)','c5':'토마토흰가루병반응','c6':'토마토잿빛곰팡이병반응',},
           '3':{'a9':'파프리카흰가루병','a10':'파프리카잘록병','b3':'칼슘결핍','b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)','c9':'파프리카흰가루병반응'},
           '4':{'a3':'오이노균병','a4':'오이흰가루병','b1':'냉해피해','b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)', 'c3':'오이노균병반응', 'c4':'오이흰가루병반응'},
           '5':{'a7':'고추탄저병','a8':'고추흰가루병','b3':'칼슘결핍','b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)','c7':'고추탄저병반응'},
           '6':{'a11':'시설포도탄저병','a12':'시설포도노균병','b4':'일소피해','b5':'축과병', 'c11':'시설포도탄저병반응', 'c12':'시설포도노균병반응'}}
    disease_dict
    
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
        
    disease_keys = list(disease.keys())    
    disease_keys.insert(0, '0')
    disease_keys
    
    import matplotlib.image as mpimg
    
    predict_desease_list = []
        
    for idx, p in enumerate(pred_prob):
        plt.figure(figsize=(4, 3))
        plt.imshow(mpimg.imread(crops_path_list[idx]))
        # plt.show()
        
        max_idx = p.argmax() # 예측 확률이 가장 큰 값의 인덱스                
        
        print('테스트 파일 : ', crops_path_list[idx])        
        print('예측 : ', disease_keys[max_idx])        
        predict_desease_list.append(disease_keys[max_idx])
        
    return pred_prob, predict_desease_list, crops_path_list
        
        