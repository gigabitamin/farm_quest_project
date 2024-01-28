const WeatherDisplay = ({ weatherData }) => {
    return (
      <div>
        <h2>Weather Information</h2>
        <pre>{JSON.stringify(weatherData, null, 2)}</pre>
      </div>
    );
  };

  export default WeatherDisplay;
