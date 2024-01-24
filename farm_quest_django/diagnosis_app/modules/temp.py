
def serialize_results(results):
    # JSON 직렬화 가능한 정보 추출
    serialized_boxes = []

    if results:  # 'results'가 비어있지 않은 경우에만 처리
        for result in results:
            if hasattr(result.boxes, 'confidence'):
                confidence_values = result.boxes.confidence.tolist()
            else:
                confidence_values = [1.0] * len(result.boxes)

            serialized_boxes.append({
                'confidence': confidence_values,
                'label': result.boxes.cls.tolist(),
                'xyxy': result.boxes.xyxy.tolist()
            })

    serialized_keypoints = []
    if results and hasattr(results[0], 'keypoints') and results[0].keypoints is not None:
        for result in results:
            # 'keypoints' 속성이 있는 경우에만 처리
            serialized_keypoints.append({
                'keypoints': result.keypoints.keypoints.tolist(),
                'scores': result.keypoints.scores.tolist(),
                'labels': result.keypoints.labels.tolist(),
            })

    serializable_data = {
        'boxes': serialized_boxes,
        'keypoints': serialized_keypoints if serialized_keypoints else None,
        'masks': None,  # 'masks'는 처리하지 않음
        'names': results[0].names if results else None,
        'orig_img': results[0].orig_img.tolist() if results else None,
        'orig_shape': results[0].orig_shape if results else None,
        'path': results[0].path if results else None,
        'probs': results[0].probs.tolist() if results else None,
        'save_dir': results[0].save_dir if results else None,
        'speed': results[0].speed if results else None,
    }

    return serializable_data
