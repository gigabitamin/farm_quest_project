export const getDiseaseColor = (disease_code) => {
    const diseaseColorMap = {
      'a1': '#bfa5a5',
      'a2': '#f4cccc',
      'a3': '#ffe599',
      'a4': '#e799cd',
      'a5': '#f4cccc',
      'a6': '#bfa5a5',
      'a7': '#b4a7d6',
      'a8': '#f4cccc',
      'a9': '#8e7cc3',
      'a10': '#b4a7d6',
      'a11': '#b4a7d6',
      'a12': '#ffe599',
      'b1': '#9fc5e8',
      'b2': '#ff7661',
      'b3': '#93c47d',
      'b4': '#e06666',
      'b5': '#9fc5e8',
      'b6': '#f1c232',
      'b7': '#ce7e00',
      'b8': '#00e1ff',
    };
  
    // 질병 코드에 해당하는 색상이 매핑에 있는지 확인하고 반환
    return diseaseColorMap[disease_code] || 'defaultColor'; // 적절한 기본 색상을 지정하거나 기본값으로 설정
  };