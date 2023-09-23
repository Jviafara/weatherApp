import React, { useEffect, useState } from 'react';
import { BsThermometerSnow, BsThermometerSun } from 'react-icons/bs';
import { FaArrowsAltH } from 'react-icons/fa';
import { FaTemperatureArrowDown, FaTemperatureArrowUp } from 'react-icons/fa6';
import { WiHumidity } from 'react-icons/wi';

const WeatherToday = ({ data, setDay }) => {
    const [list, setList] = useState([]);
    const [today, setToday] = useState({});
    const [temp, setTemp] = useState(null);
    const [iconBackground, setIconBackground] = useState('');

    useEffect(() => {
        setList(data.list);
        setToday(data.list?.[0]);
        setTemp(Math.floor(data.list?.[0]?.main?.temp - 273.15));
        setDay(new Date(data.list?.[0].dt_txt).getDay());
        setIconBackground(
            data.list?.[0]?.weather?.[0].icon.includes('n')
                ? 'bg-gray-600'
                : 'bg-cyan-200'
        );
    }, [data, setDay]);

    return (
        <div className="flex justify-center mx-auto">
            {data && list && (
                <div className="w-1/2 h-1/2 absolute top-[15%] px-12  rounded-2xl backdrop-blur-xl border-[1px] border-pink-700 shadow-md shadow-pink-200 mt-8">
                    <div className="w-full h-2/3 flex gap-16 items-center justify-between">
                        <div className={'rounded-full ' + iconBackground}>
                            <img
                                src={`https://openweathermap.org/img/wn/${today?.weather?.[0].icon}@4x.png`}
                                alt="sun"
                            />
                        </div>

                        <div className="flex flex-col gap-4 flex-grow">
                            <div className="text-3xl font-semibold flex gap-3">
                                <h1>Today</h1>
                                <p>({data?.city?.country})</p>
                            </div>
                            <h1 className="text-7xl font-bold">
                                {data?.city?.name}
                            </h1>
                            <p className="text-3xl font-semibold capitalize text-gray-700">
                                {today?.weather?.[0].description}
                            </p>
                        </div>
                        <div className="flex-grow-0 flex flex-col gap-4 items-center justify-center">
                            <div className="flex items-center gap-2">
                                {temp < 12 ? (
                                    <BsThermometerSnow size={36} />
                                ) : (
                                    <BsThermometerSun size={36} />
                                )}
                                <p className="text-5xl font-bold">
                                    {temp}
                                    <span className="text-2xl">°C</span>
                                </p>
                            </div>
                            <div className="flex gap-4 items-center">
                                <div className="flex gap-2 items-center">
                                    <FaTemperatureArrowDown size={20} />
                                    <p className="text-xl font-bold">
                                        {Math.floor(
                                            today?.main?.temp_min - 273.15
                                        )}
                                        <span className="text-base">°C</span>
                                    </p>
                                </div>
                                <FaArrowsAltH />
                                <div className="flex gap-2 items-center">
                                    <FaTemperatureArrowUp size={20} />
                                    <p className="text-xl font-bold">
                                        {Math.floor(
                                            today?.main?.temp_max - 273.15
                                        )}
                                        <span className="text-base">°C</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <WiHumidity size={36} />
                                <p className="text-5xl font-bold">
                                    {today?.main?.humidity}
                                    <span className="text-2xl">%</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherToday;
