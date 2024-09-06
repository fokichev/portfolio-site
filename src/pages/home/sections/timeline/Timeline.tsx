import { useViewportContext } from "../../../../contexts"
import { DesktopTimeline } from "./DesktopTimeline";
import { MobileTimeline } from "./MobileTimeline";


const Timeline = (props: { id: string, refProp: React.RefObject<HTMLDivElement> }) => {
    const { viewport } = useViewportContext();

    return viewport.mobile ? <MobileTimeline {...props} /> : <DesktopTimeline {...props} />
}

export { Timeline }