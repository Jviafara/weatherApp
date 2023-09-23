import axios from 'axios';
import React, { useState } from 'react';
import weather from '../assets/01d.svg';

const CityInput = ({ setData, data, setList }) => {
    const [city, setCity] = useState('');
    const [placeholder, setPlaceholder] = useState('Enter a City...');

    const makeApiCall = async (city) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=59a2634a4c80e4f00583765f4401b432`
            );
            setData(response.data);
            setList(response.data.list);
            setPlaceholder('Enter a City...');
        } catch (error) {
            setPlaceholder('City was not found, try again...');
            console.log(error);
        }
    };

    const onKlickHandler = async (e) => {
        e.preventDefault();

        // check if input contains only letters after Enter was pressed
        if (/^[a-zA-ZäöüÄÖÜß ]+$/.test(city)) {
            makeApiCall(city);
        } else {
            setPlaceholder('Please enter a valid city name...');
        }

        setCity('');
    };

    return (
        <form
            onSubmit={onKlickHandler}
            className="w-full max-h-screen flex items-center justify-center">
            {data.city ? (
                <div className="w-1/3 absolute top-[10%] z-10">
                    <input
                        className="w-full py-[10px] pl-[30px] leading-[120%] rounded-[20px] outline-none text-[20px] top-4 bg-white"
                        type="text"
                        placeholder={placeholder}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
            ) : (
                <div className="w-1/2 h-1/2 absolute z-10 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-8 p-8 rounded-2xl backdrop-blur-xl border-[1px] border-pink-700 shadow-md shadow-pink-200">
                    <div className="flex gap-8 items-center">
                        <img src={weather} alt="Weather" />
                        <h1 className="text-6xl font-bold text-blue-900">
                            Weather App
                        </h1>
                    </div>
                    <input
                        className="w-2/3 py-[10px] pl-[30px] leading-[120%] rounded-[20px] outline-none text-[20px] bg-white border-[1px] border-pink-700"
                        type="text"
                        placeholder={placeholder}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
            )}
        </form>
    );
};

export default CityInput;
