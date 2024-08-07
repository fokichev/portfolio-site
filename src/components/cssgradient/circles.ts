const COLORS = {
    blue: "#007BCD",
    pink: "#F74CC7",
    red: "#D22525",
    yellow: "#FFC44A",
    white: "#FFF4FF"
}

const ANIM = {
    c: 'moveInCircle',
    x: 'moveHorizontal',
    y: 'moveVertical'

}

const linear = true;
const reverse = true;

const CIRCLES = [
    // pink
    {
        color: COLORS.pink,
        x: 40,
        y: 20,
        movement: ANIM.c,
        linear,
        time: 30
    },
    {
        color: COLORS.pink,
        center: COLORS.white,
        x: 60,
        y: 40,
        movement: ANIM.x,
        reverse,
        time: 80
    },
    {
        color: COLORS.pink,
        x: 10,
        y: 80,
        movement: ANIM.c,
        reverse,
        time: 40
    },
    {
        color: COLORS.pink,
        x: 50,
        y: 80,
        movement: ANIM.y,
        linear,
        time: 30
    },
    // red
    {
        color: COLORS.red,
        x: 70,
        y: 20,
        movement: ANIM.c,
        time: 20
    },
    {
        color: COLORS.red,
        x: 90,
        y: 40,
        movement: ANIM.c,
        reverse,
        time: 40
    },
    // yellow
    {
        color: COLORS.yellow,
        x: 70,
        y: 90,
        movement: ANIM.x,
        reverse,
        time: 70
    },
    {
        color: COLORS.yellow,
        x: 80,
        y: 90,
        movement: ANIM.x,
        linear,
        time: 50
    },
    {
        color: COLORS.yellow,
        center: COLORS.white,
        x: 90,
        y: 80,
        movement: ANIM.c,
        linear,
        reverse,
        time: 20
    },
    // blue 1
    {
        color: COLORS.blue,
        center: COLORS.white,
        x: 25,
        y: 30,
        movement: ANIM.y,
        linear,
        reverse,
        time: 60
    },
    // white
    {
        color: COLORS.white,
        x: 45,
        y: 50,
        movement: ANIM.c,
        reverse,
        time: 40
    },
    {
        color: COLORS.white,
        x: 35,
        y: 60,
        movement: ANIM.x,
        linear,
        time: 50
    },
    {
        color: COLORS.white,
        x: 20,
        y: 85,
        movement: ANIM.c,
        time: 20
    },
    // blue 2
    {
        color: COLORS.blue,
        center: COLORS.white,
        x: 25,
        y: 30,
        movement: ANIM.y,
        linear,
        reverse,
        time: 60
    },
    {
        color: COLORS.blue,
        x: 10,
        y: 60,
        movement: ANIM.c,
        time: 30
    },
] satisfies CircleType[];

type CircleType = {
    color: string,
    center?: string,
    x: number,
    y: number,
    movement: string,
    time: number,
    linear?: boolean,
    reverse?: boolean,
}

export {
    COLORS,
    CIRCLES,
    type CircleType
}