const CARDS = [
    {
        key: 'personal-website',
        title: 'Personal Website',
        skills: ['React', 'TypeScript', 'Sass', 'Three.js', 'GSAP', 'Matter.js'],
        image: 'https://via.placeholder.com/150',
        link: ''
    },
    {
        key: 'mailchimp',
        title: 'Mailchimp API Server',
        skills: ['NodeJS', 'JavaScript'],
        image: 'https://via.placeholder.com/150',
        link: ''
    },
    {
        key: 'holding-page',
        title: 'Personal Website',
        skills: ['React', 'TypeScript'],
        image: 'https://via.placeholder.com/150',
        link: ''
    },
    {
        key: 'artist-portfolio',
        title: 'Artist Portfolio',
        skills: ['React', 'TypeScript', 'Sass'],
        image: 'https://via.placeholder.com/150',
        link: ''
    },
    {
        key: 'pixel-island',
        title: 'Pixel Island',
        skills: ['React', 'JavaScript', 'Cordova', 'Android'],
        image: 'https://via.placeholder.com/150',
        link: ''
    },
    {
        key: 'twitter-word-cloud',
        title: 'Twitter Word Cloud',
        skills: ['Python', 'Twitter API'],
        image: 'https://via.placeholder.com/150',
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