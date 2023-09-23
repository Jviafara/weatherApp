import { useState } from 'react';
import WeatherBox from './WeatherBox';
import WeatherToday from './WeatherToday';

const WeatherWindow = ({ data }) => {
    const [day, setDay] = useState();

    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    return (
        <div className="w-full h-full relative ">
            <WeatherToday data={data} setDay={setDay} />

            <WeatherBox data={data} weekDays={days} day={day} />
        </div>
    );
};

export default WeatherWindow;
