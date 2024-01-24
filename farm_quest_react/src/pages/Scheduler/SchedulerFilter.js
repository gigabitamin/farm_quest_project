import React from 'react';

class SchedulerFilter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        checkedItems: {},
      };
    }
  
    handleCheckboxChange = (itemName) => {
      this.setState((prevState) => ({
        checkedItems: {
          ...prevState.checkedItems,
          [itemName]: !prevState.checkedItems[itemName],
        },
      }));
    };
  
    render() {
      const filterOptions = ['딸기', '토마토', '파프리카', '오이', '고추', '포도'];
  
      return (
        <div>
          <h2>Scheduler 필터</h2>
          {filterOptions.map((option) => (
            <div key={option}>
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
            <ul>
              {filterOptions
                .filter((option) => this.state.checkedItems[option])
                .map((selectedOption) => (
                  <li key={selectedOption}>{selectedOption}</li>
                ))}
            </ul>
          </div>
        </div>
      );
    }
  }

export default SchedulerFilter;