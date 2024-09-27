import SquiglyLineSVG from '../../../../../assets/curved-line.svg?react'

const SquiglyLine = ({ desktop }: { desktop: boolean }) => {
    return (
        <div className="squigly-line-container">
            <SquiglyLineSVG/>
            <SquiglyLineSVG/>
            <SquiglyLineSVG/>
            <SquiglyLineSVG/>
            <SquiglyLineSVG/>
            <SquiglyLineSVG/>
            <SquiglyLineSVG/>
            <SquiglyLineSVG/>
            <SquiglyLineSVG/>
            <SquiglyLineSVG/>
            <SquiglyLineSVG/>
        </div>
    )
}

export { SquiglyLine }