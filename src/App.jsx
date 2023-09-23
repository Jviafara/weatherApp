import { useState } from 'react';
import background from './assets/background.jpg';
import CityInput from './components/CityInput';
import WeatherWindow from './components/WeatherWindow';

function App() {
    const [data, setData] = useState({});
    const [list, setList] = useState([]);
    return (
        <div className="App">
            <div
                style={{ backgroundImage: `url(${background})` }}
                className="w-full h-screen bg-cover fixed -z-[999]"
            />
            <div className="w-full h-screen">
                <CityInput setData={setData} data={data} setList={setList} />
                <WeatherWindow data={data} list={list} />
            </div>
        </div>
    );
}

export default App;
