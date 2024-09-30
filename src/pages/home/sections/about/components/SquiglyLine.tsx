import { useViewportContext } from '../../../../../contexts';
import SquiglyLineSVG from '../../../../../assets/curved-line.svg?react';

const SquiglyLine = ({ desktop }: { desktop: boolean }) => {
    return (
        <div className="squigly-line-container">
            { desktop ? <SquiglyLineDesktop /> : <SquiglyLineMobile /> }
        </div>
    )
}

const SquiglyLineDesktop = () => {
    const repeat = 11;

    return (
        <>
            { Array.from(Array(repeat)).map((_, i) => <SquiglyLineSVG key={i} /> )}
        </>
    )
}

const SquiglyLineMobile = () => {
    const { measurements } = useViewportContext();
    const svgSize = 40;
    const repeat = Math.ceil(measurements.width / svgSize) + 2;
    return (
        <>
            <div className='squiggly-line --top'>
                { Array.from(Array(repeat)).map((_, i) => 
                    <div className='svg-container'>
                        <SquiglyLineSVG key={i} />
                    </div>
                )}
            </div>
            <div className='squiggly-line --bottom'>
                { Array.from(Array(repeat)).map((_, i) => 
                    <div className='svg-container'>
                        <SquiglyLineSVG key={i} />
                    </div>
                )}
            </div>
        </>
    )
}

export { SquiglyLine }