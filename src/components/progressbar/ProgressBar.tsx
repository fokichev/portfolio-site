import './ProgressBar.scss';

const BARS = 62;

const ProgressBar = ({ progress }: { progress: number }) => {
    const arrTop = Array.from({ length: BARS/2 }, (_, i) => i*100/BARS);
    const arrBot = arrTop.map(el => el + 50);
    return (
        <div className="progress-bar-container">
            { arrTop.map((percent, i) => <ProgressLine
                    progress={progress}
                    percent={percent}
                    index={i}
                    key={`percent-bar-${i}`}
                />
            )}
            <span className='progress-number'>{String(progress).padStart(2, '0')}%</span>
            { arrBot.map((percent, i) => <ProgressLine
                    progress={progress}
                    percent={percent}
                    index={i}
                    key={`percent-bar-${i}`}
                />
            )}
        </div>
    )
}

const ProgressLine = ({
    progress,
    percent,
    index
}: {
    progress: number,
    percent: number,
    index: number
}) => {
    const active = progress >= percent + 0.001;
    const even = index % 2 === 0;
    return (
        <span
            className={`progress-line${active ? ' --active' : ''}${even ? ' --even' : ''}`}
        ></span>
    )
}

export { ProgressBar }