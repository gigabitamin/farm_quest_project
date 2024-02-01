export const getDiseaseColor = (disease_code) => {
    const diseaseColorMap = {
      'a1': '#b88b8b',
      'a2': '#496349',
      'a3': '#89b9ab',
      'a4': '#e799cd',
      'a5': '#1f6148',
      'a6': '#c7c979',
      'a7': '#7c78b3',
      'a8': '#c5845e',
      'a9': '#29e09a',
      'a10': '#63f863',
      'a11': '#c22561',
      'a12': '#3e70cc',
      'b1': '#442222',
      'b2': '#094b09',
      'b3': '#130e31',
      'b4': '#95aa20',
      'b5': '#2eb185',
      'b6': '#697069',
      'b7': '#a4a712',
      'b8': '#00e1ff',
    };
  
    // 질병 코드에 해당하는 색상이 매핑에 있는지 확인하고 반환
    return diseaseColorMap[disease_code] || 'defaultColor'; // 적절한 기본 색상을 지정하거나 기본값으로 설정
  };