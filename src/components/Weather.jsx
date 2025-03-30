import React, { useEffect,useState ,useRef} from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
// import clear_icon from '../assets/clear.png'
// import cloud_icon from '../assets/cloud.png'
// import drizzle_icon from '../assets/drizzle.png'
 import humidity_icon from '../assets/humidity.png'
// import rain_icon from '../assets/rain.png'
// import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'



const Weather = () => {
    const inputRef=useRef();
    const [weatherData,setWeatherData]=useState(false);
    const [error, setError] = useState(null); // Error state
    const search= async(city)=>{
        try {
            const url=`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_ID}&q=${city}`;
            const response= await fetch(url);
            const data = await response.json();
            console.log(data);
    setWeatherData({
        humidity: data.current.humidity,
        temp: Math.floor(data.current.temp_c),
        wind: data.current.wind_kph,
        city:data.location.name,
        icon:data.current.condition.icon,
    })
        } catch (error) {

            setError(error.message); // Set error message state

        }}
            
        
         useEffect(()=>{search("lahore") },[])

    // Function to handle Enter key press for search
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {  // Check if the Enter key was pressed
      e.preventDefault(); // Prevent the default action (like form submission)
      search(inputRef.current.value); // Trigger search with input value
    }
  };

  return (
    <div className='weather'>
        <div className="searchbar">
            <input ref={inputRef} type="text" placeholder='Search City' onKeyDown={handleKeyDown} />
            <img src={search_icon} alt="" onClick={()=> search(inputRef.current.value)} />
        </div>
         
                <img src={weatherData.icon} alt="" className='weather-icon' />
                <p className='temperature'>{weatherData.temp}°C </p>
                <p className='location'>{weatherData.city}</p>
                    <div className="weather-data">
                        <div className="col">
                            <img src={humidity_icon} alt="" />
                            <div>
                              <p> {weatherData.humidity}%</p> 
                              <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt="" />
                            <div>
                              <p>{weatherData.wind} kph</p> 
                              <span>Wind speed</span>
                            </div>
                        </div>
                    </div>     
        </div>
       
       
 
  )
}


export default Weather