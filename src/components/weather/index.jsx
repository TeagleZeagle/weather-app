import Search from "../search";
import {useEffect, useState} from "react";

export default function Weather() {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    async function fetchWeatherData(param) {
        setLoading(true)
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=14b25450755f5c92abdcc81f9abc50a0`
            );

            const data = await response.json();

            console.log(data, "data");
            if (data) {
                setWeatherData(data)
                setLoading(false)
            }
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }

    function handleSearch() {

        fetchWeatherData(search)

    }

    function getCurrentDate() {
        return new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
    }

    useEffect(() => {

        fetchWeatherData('istanbul');


    }, []);

    console.log(weatherData)

    return (
        <div>
            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div>
                    <div className="city-name">
                        <h2>
                            {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
                        </h2>
                    </div>
                    <div className="date">
                        <span>{getCurrentDate()}</span>
                    </div>
                    <div className="temp">{weatherData?.main?.temp}</div>
                    <p className="description">
                        {weatherData && weatherData.weather && weatherData.weather[0]
                            ? weatherData.weather[0].description
                            : ""}
                    </p>
                    <div className="weather-info">
                        <div className="column">
                            <div>
                                <p className="wind">{weatherData?.wind?.speed}</p>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                        <div className="column">
                            <div>
                                <p className="humidity">{weatherData?.main?.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}