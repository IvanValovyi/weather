import React from "react";
import './weather.css'

function Weather(props){
    let data = props.data.main_info

    return(
        <div className='weather'>
            {data && (
                <div className="preview">
                    <div className="city_name">
                        <span>{data.name}</span>
                    </div>

                    <div className="temperature">
                        <span>{data.main.temp}°C</span>
                    </div>

                    <div className="sky">
                        <span>{data.weather[0].description}</span>
                        <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt='*'/>
                    </div>

                    <div className="wind">
                        <span>{data.wind.speed} M/S</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 10h-5v-2h5c.552 0 1-.448 1-1s-.448-1-1-1c-.403 0-.747.242-.905.587l-1.749-.956c.499-.965 1.494-1.631 2.654-1.631 3.971 0 3.969 6 0 6zm7 7c0-1.656-1.344-3-3-3h-7v2h7c.552 0 1 .448 1 1s-.448 1-1 1c-.403 0-.747-.242-.905-.587l-1.749.956c.499.965 1.494 1.631 2.654 1.631 1.656 0 3-1.344 3-3zm1.014-7.655c.082-.753.712-1.345 1.486-1.345.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5h-8.5v2h8.5c1.932 0 3.5-1.568 3.5-3.5s-1.568-3.5-3.5-3.5c-1.624 0-2.977 1.116-3.372 2.617l1.886.728zm-9.014 1.655h-8v2h8v-2zm-4 3h-6v2h6v-2zm-2-6h-4v2h4v-2z"/></svg>
                    </div>

                    <div className="my_location" onClick={props.setGetLoc}>
                        <span>My Location</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Weather