import './Quote.scss';

const TEXT = [
    'I lose myself in time',
    'when coding something',
    'beautiful.'
]

const Quote = ({ id }: { id: string }) => {
    return (
        <div className='quote-container' id={id}>
            <div className='quote-content'>
                <div className='subtext'>
                    A realisation:
                </div>
                { TEXT.map(text => <QuoteLine text={text} />) }
            </div>
            <div className='quote-model'>
                MODEL GOES HERE
            </div>
        </div>
    )
}

const QuoteLine = ({ text }: { text: string }) => {
    return (
        <span className='quote-line'>
            <span className='text'>{text}</span>
            <span className='mask'></span>
        </span>
    )
}



export { Quote };