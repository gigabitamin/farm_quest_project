import React from 'react';
// import SchedulerCalendar from './SchedulerCalendar';


class SchedulerFilter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        checkedItems: {},
      };
    }
  // 체크박스 변경
    handleCheckboxChange = (itemName) => {
      this.setState((prevState) => ({
        checkedItems: {
          ...prevState.checkedItems,
          [itemName]: !prevState.checkedItems[itemName],
        },
      }));
    };

  // 렌더링
    render() {
      const filterOptions = ['딸기', '토마토', '파프리카', '오이', '고추', '포도'];
  
      return (
        <div id="schedularFilter">
          <h2>선택 작목</h2>
          {filterOptions.map((option) => (
            <div id="schedularFilterUi" key={option}>
              <input
                type="checkbox"
                id={option}
                checked={this.state.checkedItems[option] || false}
                onChange={() => this.handleCheckboxChange(option)}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
  
          <div>
            <h3>선택된 옵션:</h3>
            {/* 예시 */}
            <ul>
              {filterOptions
                .filter((option) => this.state.checkedItems[option])
                .map((selectedOption) => (
                  <li key={selectedOption}>{selectedOption}</li>
                ))}
            </ul> 
            {/* 캘린더-우측 구현 */}
                  {/* <SchedulerCalendar /> */}
          </div>
        </div>
      );
    }
  }

export default SchedulerFilter;