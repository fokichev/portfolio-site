import React, { ReactElement } from 'react';
import { useViewportContext } from '../../contexts';

import { DesktopNavbar } from './DesktopNavbar';
import { MobileNavbar } from './MobileNavbar';

const Navbar = (props: NavbarProps) => {
    const { viewport } = useViewportContext();

    return viewport.desktop
        ? <DesktopNavbar {...props} />
        : <MobileNavbar {...props} /> 
}

type Section = {
    key: string,
    Component: (props: any) => ReactElement,
    menu?: boolean,
    refProp: React.RefObject<HTMLDivElement>
}

type ActiveSection = {
    key: string,
    index: number
}

interface NavbarProps {
    sections: Section[],
    scope: React.RefObject<HTMLDivElement>,
    activeSection: ActiveSection,
    setActiveSection: (props: ActiveSection) => void
}

export {
    Navbar,
    type NavbarProps,
    type Section,
}