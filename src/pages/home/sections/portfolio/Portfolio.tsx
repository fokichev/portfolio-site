import './Portfolio.scss';
import { CARDS, CARD } from './cards';

const Portfolio = ({ id }: { id: string }) => {

    return (
        <div className='portfolio-container' id={id}>
            <div className='header margin-content'>
                <h3>Project Highlights</h3>
                <div>(pretty version coming soon)</div>
            </div>
            <div className='portfolio-cards'>
                { CARDS.map(card => <Card card={card} key={card.key}/>) }
            </div>
        </div>
    )
}

const Card = ({ card }: { card: CARD }) => {
    const {
        key,
        title,
        skills,
        image,
        link
    } = card;
    return (
        <a href={link} className='portfolio-card' key={key}>
            <div className='title'>{title}</div>
            <div className='skills'>
                { skills.map(skill => <div key={skill} className='skill'>{skill}</div>) }
            </div>
        </a>
    )
}

export { Portfolio }