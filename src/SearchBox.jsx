import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';
import { useState } from 'react';

export default function SearchBox({updateInfo}) {
    let [city, setCity] = useState("");
    let [error, setError] = useState("");

    const API_URL= "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

    let getWeatherInfo = async() => {
        try{
            let response = await fetch(
                `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
            );
            let Jsonresponse = await response.json();
            let result = {
                city: city,
                temp: Jsonresponse.main.temp,
                tempMin: Jsonresponse.main.temp_min,
                tempMax: Jsonresponse.main.temp_max,
                humidity: Jsonresponse.main.humidity,
                feelsLike: Jsonresponse.main.feels_like,
                weather: Jsonresponse.weather[0].description,
                }
                console.log(result);
                return result;
        }catch(err) {
            setError("The place you searched for, doesn't exist in our API!");
        }
        
    
    }


    let handleChange = (event) => {
        setCity(event.target.value);
    }

    let handleSubmit = async(event) => {
        try{
            event.preventDefault();
            console.log(city);
            setCity("");
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
        }catch(err){
            setError(true);
        }       
    };

    return(
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
                <TextField 
                    id="city" 
                    label="Place Name" 
                    variant="outlined" 
                    required 
                    value={city} 
                    onChange={handleChange}
                />
                <br></br>
                <br></br>
                <Button variant="contained" type="submit">
                    Search
                </Button>
                {error && <p style={{color: "red"}}>No such place exists!</p>}
            </form>            
        </div>
    )
}