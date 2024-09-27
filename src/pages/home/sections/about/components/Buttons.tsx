const HireMeButton = () => {
    return (
        <div className="hire-me">
            Why you should hire me
        </div>
    )
}

const LinkButton = ({ text, href }: { text: string, href: string }) => {
    return (
        <a className="link-button" href={href}>
            <div>{text}</div>
            <div className="line"/>
        </a>
    )
}

const DownloadCVButton = () => {
    // TODO href
    return <LinkButton text='Download CV' href='TODO' />
}

const GetInTouchButton = () => {
    // TODO href
    return <LinkButton text='Get in touch' href='TODO' />
}

export {
    HireMeButton,
    DownloadCVButton,
    GetInTouchButton
}