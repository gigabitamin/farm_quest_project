

def tf_detect(serialized_results_list, plant_name, user_select_plant, img_path, disease_dict, disease_names, disease_codes):
    plant = ['고추', '딸기', '포도', '오이', '토마토', '파프리카']    
    box = [0]
    tf_disease_predict_list = []
    crops_path_list = []
    X_t = []
    Y_t = []
    pred_prob = []
    crops_path_list = []
    disease_predict_probability = []
    tf_disease_predict_list = []
            
    path_origin = serialized_results_list[0]['path']
        
    if serialized_results_list[0]['boxes']:
        box = serialized_results_list[0]['boxes'] 
        print(len(box))

    if len(box) > 0:
        label_key = int(box[0]['label'][0])
        print('4', label_key)        
        names = serialized_results_list[0]['names']
        name = names[label_key]
        conf = box[0]['confidence']
        label = names[label_key]
        path_dir = os.path.dirname(path_origin)
        path_file = os.path.basename(path_origin)        
        file_name, file_extension = os.path.splitext(path_file)                

        crops_all = os.path.join(path_dir, 'result_img', file_name, 'crops', '**', '*.jpg')        
        crops_all_list = glob.glob(crops_all)        
                
        for crops_path in crops_all_list:
            if crops_path.split(os.sep)[-2] not in plant:
                crops_path_list.append(crops_path)

    image_size_x = 512
    image_size_y = 512

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

    if len(box) > 0:            
        for fname in crops_path_list:
            img = Image.open(fname).convert("RGB").resize((image_size_x, image_size_y))
            data = (np.asarray(img).astype('float32'))
            X_t.append(data)
            crop_name = fname.split(os.sep)[-2]
            Y_t.append(crop_name)
    else:
        img = Image.open(img_path).convert("RGB").resize((image_size_x, image_size_y))
        data = (np.asarray(img).astype('float32'))
        X_t.append(data)
    
    X_t = np.array(X_t)
            
    if len(X_t) > 0:
        pred_prob = tf_model.predict(X_t)  
                        
    if len(pred_prob) > 0:
        for pred in pred_prob[0]:
            disease_predict_prob = [float(number.replace(',', '')) for number in str(pred).strip('[]').split()]
            disease_predict_probability.append(disease_predict_prob[0])


    for dc, dn, dp in zip(disease_codes, disease_names, disease_predict_probability):
        tf_disease_predict_list.append([user_select_plant, plant_name, dc, dn, dp])                
    return tf_disease_predict_list, crops_path_list

def tf_solution_service(tf_predict_disease_list):  
    solution_row_list = []

    for i in range(len(tf_predict_disease_list)):
        plant_no = tf_predict_disease_list[i][0]
        disease_code = tf_predict_disease_list[i][2]
            
        if disease_code != '0':            
            solution_row = SolutionTb.objects.filter(Q(disease_code__contains=disease_code) & Q(plant_no__contains=plant_no))            
            serializer = SolutionTbSerializer(solution_row, many=True)            
            serialized_data = serializer.data            
            solution_row_list.append(serialized_data)    
    
    tf_predict_result_list = [[dl, sl[0]] for dl, sl in zip(tf_predict_disease_list, solution_row_list)]        
    tf_predict_result_list_sorted = sorted(tf_predict_result_list, key=lambda x: x[0][4], reverse=True)        
    
    return tf_predict_result_list_sorted
