import './Portfolio.scss';

import { CARDS, CARD } from './cards';
import { useCursorContext } from '../../../../contexts/CursorContext/CursorContext';

const Portfolio = ({ id, refProp }: { id: string, refProp: React.RefObject<HTMLDivElement> }) => {
    const { onHoverImage } = useCursorContext();
    return (
        <div className='portfolio-container' id={id} ref={refProp}>
            <div className='header margin-content'>
                <h3>Project Highlights</h3>
                <div>(pretty version coming soon)</div>
            </div>
            <div className='portfolio-cards'>
                { CARDS.map(card => <Card card={card} key={card.key} onHover={onHoverImage}/>) }
            </div>
        </div>
    )
}

const Card = ({ card, onHover }: { card: CARD, onHover: (img: string | null) => void }) => {
    const {
        key,
        title,
        skills,
        image,
        link
    } = card;

    const onMouseEnter = () => {
        onHover(image);
    };

    const onMouseLeave = () => {
        onHover(null);
    };

    return (
        <a
            key={key}
            href={link}
            className='portfolio-card border-box'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className='title'>{title}</div>
            <div className='skills'>
                { skills.map(skill => <div key={skill} className='skill'>{skill}</div>) }
            </div>
        </a>
    )
}

export { Portfolio }