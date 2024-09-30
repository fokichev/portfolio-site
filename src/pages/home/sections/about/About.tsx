import './About.scss';
import { useViewportContext } from '../../../../contexts';
import { AboutDesktop } from './AboutDesktop';
import { AboutMobile } from './AboutMobile';

const About = ({ id, refProp }: { id: string, refProp: React.RefObject<HTMLDivElement> }) => {
    const { viewport } = useViewportContext();
    const props = { id, refProp };

    return viewport.desktop ? <AboutDesktop {...props} /> : <AboutMobile {...props} />
}

export { About }