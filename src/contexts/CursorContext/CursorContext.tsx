import React, { createContext, useState } from 'react';
import { Cursor } from '../../components';

const CursorContext = createContext({
    onHoverClickable: () => {},
    onHoverImage: (img: string | null) => {}
});

const CursorProvider = ({ children }: { children: any }) => {
    const [clickable, setClickable] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    const onHoverClickable = () => {
        console.log("clickable");
    }
        
    const onHoverImage = (img: string | null) => {
        setImage(img);
    }

    const props = {onHoverClickable, onHoverImage};
    
    return (
        <CursorContext.Provider value={props}>
            <Cursor
                clickable={clickable}
                image={image}
            />
            {children}
        </CursorContext.Provider>
    )
}

const useCursorContext = () => {
    return React.useContext(CursorContext)
}

export { CursorProvider, useCursorContext }