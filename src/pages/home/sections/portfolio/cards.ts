import PersonalWebsiteImg from '../../../../assets/portfolio/personal-website.png';
import MailchimpServerImg from '../../../../assets/portfolio/mailchimp-server.png';
import HoldingPageImg from '../../../../assets/portfolio/holding-page.png';
import ArtistPortfolioImg from '../../../../assets/portfolio/artist-portfolio.png';
import PixelIslandImg from '../../../../assets/portfolio/pixel-island.png';
import TwitterWordCloudImg from '../../../../assets/portfolio/twitter-word-cloud.png';

const CARDS = [
    {
        key: 'personal-website',
        title: 'Personal Website',
        skills: ['React', 'TypeScript', 'Sass', 'Three.js', 'GSAP', 'Matter.js'],
        image: PersonalWebsiteImg,
        link: ''
    },
    {
        key: 'mailchimp-server',
        title: 'Mailchimp API Server',
        skills: ['NodeJS', 'JavaScript'],
        image: MailchimpServerImg,
        link: ''
    },
    {
        key: 'holding-page',
        title: 'Holding Page',
        skills: ['React', 'TypeScript'],
        image: HoldingPageImg,
        link: ''
    },
    {
        key: 'artist-portfolio',
        title: 'Artist Portfolio',
        skills: ['React', 'TypeScript', 'Sass'],
        image: ArtistPortfolioImg,
        link: ''
    },
    {
        key: 'pixel-island',
        title: 'Pixel Island',
        skills: ['React', 'JavaScript', 'Cordova', 'Android'],
        image: PixelIslandImg,
        link: ''
    },
    {
        key: 'twitter-word-cloud',
        title: 'Twitter Word Cloud',
        skills: ['Python', 'Twitter API'],
        image: TwitterWordCloudImg,
        link: ''
    },
] as CARD[];

type CARD = {
    key: string,
    title: string,
    skills: string[],
    image: string,
    link: string
}

export { CARDS, type CARD }