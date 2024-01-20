import json

# JSON 파일 읽기
json_file_path = r"C:\FINAL_PROJECT\farm_quest_project\upload\diagnosis\yolo\result_json\829b11fdcec644f89b405645159b671f_고추병충해탄저병_3.png.json"

with open(json_file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# JSON 데이터 출력
print(json.dumps(data, indent=2, ensure_ascii=False))
