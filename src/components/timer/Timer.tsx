import { useEffect, useState } from 'react';
import './Timer.scss';

const Timer = () => {
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
        <div className='time'>
            {time} London
        </div>
    )
}

export { Timer }