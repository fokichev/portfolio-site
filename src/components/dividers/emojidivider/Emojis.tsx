import {
	AndroidEmoji,
    BugEmoji,
    CoffeeEmoji,
    EyeEmoji,
    EyeClosedEmoji,
    EyeVisibleEmoji,
    HeartEmoji,
    HumanEmoji,
    HumanHandsDownEmoji,
    HumanHandsUpEmoji,
    SmileyHappyEmoji,
    SmileyNeutralEmoji,
    SmileySadEmoji,
    MusicEmoji,
    SaveEmoji,
    SnowflakeEmoji,
    ZapEmoji
} from '../../emoji';

const EMOJIS = [
    {
        id: 'smiley',
        svgArr: [SmileySadEmoji, SmileyNeutralEmoji, SmileyHappyEmoji, SmileyNeutralEmoji],
    },
    {
        id: 'zap',
        svg: ZapEmoji,
    },
    {
        id: 'save',
        svg: SaveEmoji,
    },
    {
        id: 'person',
        svgArr: [HumanEmoji, HumanHandsUpEmoji, HumanEmoji, HumanHandsDownEmoji]
    },
    {
        id: 'coffee',
        svg: CoffeeEmoji,
    },
    {
        id: 'bug',
        svg: BugEmoji,
    },
    {
        id: 'snowflake',
        svg: SnowflakeEmoji,
    },
    {
        id: 'android',
        svg: AndroidEmoji,
    },
    {
        id: 'eye',
        svgArr: [EyeEmoji, EyeClosedEmoji, EyeVisibleEmoji, EyeClosedEmoji]
    },
    {
        id: 'heart',
        svg: HeartEmoji,
    },
    {
        id: 'music',
        svg: MusicEmoji
    }
] satisfies (EmojiItem | AnimatedEmojiItem)[];

type EmojiType = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

type EmojiProps = {
	id: string
}

type EmojiItem = EmojiProps & { svg: EmojiType };

type AnimatedEmojiItem = EmojiProps & { svgArr: EmojiType[] }

export {
    EMOJIS,
    type EmojiItem,
    type AnimatedEmojiItem
}