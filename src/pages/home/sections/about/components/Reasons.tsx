import CurvedLineDivider from '../../../../../assets/curved-line-divider.svg?react';

const REASONS = [
    {
        number: '1.',
        heading: 'Strong sense of\npersonal responsibility',
        text: 'You can trust me to carry my weight and more.',
        align: 'start'
    },
    {
        number: '2.',
        heading: 'Problem solving fiend',
        text: 'I actually love solving bugs. Leave them to me!',
        align: 'end'
    },
    {
        number: '3.',
        heading: '(Too) high standards',
        text: 'I am physically unable to half-a** things. Fortunate for the user, but often unfortunate for me...',
        align: 'end'
    },
    {
        number: '*',
        heading: 'Bonus',
        text: 'I actually empty the office dishwasher ;)',
        align: 'start'
    },
] satisfies ReasonType[];

const Reason = ({ number, heading, text, align }: ReasonType) => {
    return (
        <div className={`reason-item align-${align}`}>
            <div className="number">{number}</div>
            <div className="text">
                <div className="heading">{heading}</div>
                <div className="subtext">{text}</div>
            </div>
        </div>
    )
}

const ReasonOne = ({ align }: { align?: AlignType }) => <Reason {...REASONS[0]} {...(align ? {align} : {})} />
const ReasonTwo = ({ align }: { align?: AlignType }) => <Reason {...REASONS[1]} {...(align ? {align} : {})} />
const ReasonThree = ({ align }: { align?: AlignType }) => <Reason {...REASONS[2]} {...(align ? {align} : {})} />
const ReasonBonus = ({ align }: { align?: AlignType }) => <Reason {...REASONS[3]} {...(align ? {align} : {})} />

const ReasonDivider = () => {
    return (
        <div className='curved-line-divider'>
            <CurvedLineDivider />
        </div>
    )
}

type AlignType = 'start' | 'end';
type ReasonType = {
    number: string,
    heading: string,
    text: string, 
    align: AlignType
}

export { ReasonOne, ReasonTwo, ReasonThree, ReasonBonus, ReasonDivider }