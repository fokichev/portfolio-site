import './Link.scss';
import { useCursorContext } from '../../contexts/CursorContext/CursorContext';

const Link = (props: LinkProps) => {
    const { href, children } = props;
    const { onHoverClickable } = useCursorContext();

    const onEnter = (event: any) => { // TODO fix
        event.preventDefault();
        onHoverClickable(true);
    }
    
    const onLeave = (event: any) => { // TODO fix
        event.preventDefault();
        onHoverClickable(false);
    }

    return (
        <a
            href=''
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            { children }
        </a>
    )
}

interface LinkProps {
    href: string;
    children: any;
}

export { Link }