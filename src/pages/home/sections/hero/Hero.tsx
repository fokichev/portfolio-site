import './Hero.scss';
import { useEffect, useState } from 'react';

const Hero = () => {
    const options = {
        timeZone: 'Europe/London',
        hourCycle: 'h24',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    } satisfies Intl.DateTimeFormatOptions;

    const getTime = () => new Date().toLocaleTimeString('en-UK', options);

    const [time, setTime] = useState(getTime());

    useEffect(() => {
        const intervalId = setInterval(() => setTime(getTime()), 1000);

        return () => clearInterval(intervalId);
    }, [])
    return (
        <div className='hero-container'>
            <div className='time'>
                {time} London
            </div>
        </div>
    )
}

export { Hero }