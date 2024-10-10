import KulinaryImg from '../../../../assets/portfolio/kulinary.png';
import PersonalWebsiteImg from '../../../../assets/portfolio/personal-website.png';
import PersonalWebsiteOldImg from '../../../../assets/portfolio/personal-website-old.png';
import MailchimpServerImg from '../../../../assets/portfolio/mailchimp-server.png';
import PixelIslandImg from '../../../../assets/portfolio/pixel-island.png';
import TwitterWordCloudImg from '../../../../assets/portfolio/twitter-word-cloud.png';

const CARDS = [
    {
        key: 'kulinary',
        title: 'Kulinary (Chrome Extension)',
        skills: ['TypeScript', 'NodeJS', 'ExpressJS', 'Zod', 'Chrome Extensions API', 'ChatGPT API', 'Spoontacular API'],
        image: KulinaryImg,
        link: 'https://chromewebstore.google.com/detail/kulinary/mpjdadlofjgdhlaocbdjohlmmffekpan'
    },
    {
        key: 'personal-website',
        title: 'Personal Website',
        skills: ['React', 'TypeScript', 'Sass', 'Three.js', 'GSAP', 'Matter.js'],
        image: PersonalWebsiteImg,
        link: 'https://github.com/fokichev/portfolio-site'
    },
    {
        key: 'personal-website-old',
        title: 'Personal Website (Old ver)',
        skills: ['React', 'TypeScript'],
        image: PersonalWebsiteOldImg,
        link: 'https://github.com/fokichev/personal-portfolio'
    },
    {
        key: 'mailchimp-server',
        title: 'Mailchimp API Server',
        skills: ['NodeJS', 'ExpressJS', 'JavaScript'],
        image: MailchimpServerImg,
        link: 'https://holdingpage1.netlify.app/'
    },
    // {
    //     key: 'holding-page',
    //     title: 'Holding Page',
    //     skills: ['React', 'TypeScript'],
    //     image: HoldingPageImg,
    //     link: 'https://holdingpage2.netlify.app/'
    // },
    // {
    //     key: 'artist-portfolio',
    //     title: 'Artist Portfolio',
    //     skills: ['React', 'TypeScript', 'Sass'],
    //     image: ArtistPortfolioImg,
    //     link: 'https://klarafokicheva.com/'
    // },
    {
        key: 'pixel-island',
        title: 'Pixel Island',
        skills: ['React', 'JavaScript', 'Cordova', 'Android'],
        image: PixelIslandImg,
        link: 'https://github.com/fokichev/Pixel_Island'
    },
    {
        key: 'twitter-word-cloud',
        title: 'Twitter Word Cloud',
        skills: ['Python', 'Twitter API'],
        image: TwitterWordCloudImg,
        link: 'https://github.com/fokichev/Twitter_Word_Cloud'
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