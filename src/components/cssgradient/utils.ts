const hexToRGB = (hex: string) => {
    let str = hex.replace("#", "");
    
    if (str.length !== 6 && str.length !== 3) {
        console.error('Invalid hex color string: ' + hex);
        return [0, 0, 0]
    }

    if (str.length === 3) {
        str = str.split('').map(char => char + char).join('');
    }

    const bigint = parseInt(str, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    // Return the RGB components as an array
    return [r, g, b];
}

export {
    hexToRGB
}