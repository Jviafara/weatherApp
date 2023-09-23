import React, { useEffect, useState } from 'react';
// import { WiDayFog } from 'react-icons/wi';

const WeatherBox = ({ data, day, weekDays }) => {
    const [list, setList] = useState([]);
    const [daysIndexes, setDaysIndexes] = useState();
    const [days, setDays] = useState([]);
    const [iconBackground, setIconBackground] = useState('');

    const getDayIndices = (data) => {
        let dayIndices = [];
        dayIndices.push(0);

        let index = 0;
        let tmp = data?.list?.[index].dt_txt.slice(8, 10);

        for (let i = 0; i < 4; i++) {
            while (
                tmp === data?.list?.[index].dt_txt.slice(8, 10) ||
                data?.list?.[index].dt_txt.slice(11, 13) !== '15'
            ) {
                index++;
            }
            dayIndices.push(index);
            tmp = data?.list?.[index].dt_txt.slice(8, 10);
        }
        return dayIndices;
    };

    useEffect(() => {
        let array = [];
        if (data?.list) array = getDayIndices(data);
        setDaysIndexes(array);
        setList(data?.list);
        setIconBackground(
            data.list?.[0]?.weather?.[0].icon.includes('n')
                ? 'bg-gray-600'
                : 'bg-cyan-200'
        );
    }, [data]);

    useEffect(() => {
        const daysArray = [];
        for (let i = 0; i < 5; i++) {
            daysArray.push({
                date: data?.list?.[daysIndexes[i]].dt_txt,
                day: weekDays[
                    new Date(data?.list?.[daysIndexes[i]].dt_txt).getDay()
                ],
                weather_desc:
                    data?.list?.[daysIndexes[i]].weather?.[0].description,
                icon: data?.list?.[daysIndexes[i]].weather?.[0].icon,
                temp: Math.floor(
                    data?.list?.[daysIndexes[i]].main.temp - 273.15
                ),
                bgIconColor: data?.list?.[
                    daysIndexes[i]
                ].weather?.[0].icon.includes('n')
                    ? 'bg-gray-600'
                    : 'bg-cyan-200',
            });
        }
        setDays(daysArray);
    }, [daysIndexes]);

    return (
        <div>
            {data && list && (
                <div className="flex gap-4 absolute z-50 top-[50%] left-1/2 -translate-x-1/2">
                    {days.slice(1).map((day, index) => (
                        <div
                            key={index}
                            className="w-40 h-40 flex flex-col items-center justify-center p-4 rounded-[3.5rem]  bg-gray-300 bg-opacity-30 border-[1px] border-pink-700 shadow-md shadow-pink-200">
                            <h1 className="text-lg font-bold">{day.day}</h1>
                            <div className="flex-grow flex flex-col items-center justify-center gap-2">
                                <div className="rounded-full w-16 h-16 flex items-center justify-center bg-cyan-200">
                                    <img
                                        src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                                        alt="sun"
                                    />
                                </div>
                                <h1 className="text-2xl font-semibold">
                                    {day.temp}
                                    <span className="text-base font-semibold">
                                        °C
                                    </span>
                                </h1>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WeatherBox;
