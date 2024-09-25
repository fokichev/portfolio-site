import './EmojiDivider.scss';
import { RefObject, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useViewportContext } from '../../../contexts';

import { EMOJIS, EmojiItem, AnimatedEmojiItem } from './Emojis';

const EmojiDivider = () => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const firstHalfRef = useRef<HTMLDivElement>(null);
	const secondHalfRef = useRef<HTMLDivElement>(null);
	const { measurements } = useViewportContext();

	const EMOJI_WIDTH = 70;
	const REPEAT = Math.ceil(measurements.width / (EMOJIS.length * EMOJI_WIDTH));
	const ACCENTS = Array(Math.ceil((REPEAT * EMOJIS.length) / 10) * 2)
		.fill([2,9])
		.map((accents, i) => accents.map((num: number) => num + 10 * i))
		.flat();

	const emojiArr = Array(REPEAT).fill(EMOJIS).flat();

	useGSAP(() => {
		// SCROLL WITH SCROLL AND PASSIVELY LOGIC
		// TODO when forum reply
		// https://gsap.com/resources/st-mistakes/#nesting-scrolltriggers-inside-multiple-timeline-tweens
		
		// SCROLL WITH SCROLL LOGIC
		// gsap.set(secondHalfRef.current, { xPercent: -200 })
		// gsap.timeline({
		// 	scrollTrigger: {
		// 		trigger: wrapperRef.current,
		// 		scrub: 3,
		// 		start: '-400px center',
		// 		end: '+600px center',
		// 		markers: true
		// 	}
		// })
		// 	.to(firstHalfRef.current, {
		// 		xPercent: 100
		// 	})
		// 	.to(secondHalfRef.current, {
		// 		xPercent: -100
		// 	}, '<');

		// SCROLL PASSIVELY LOGIC
		let duration = 30;
		const props = { ease: 'none' };
		gsap.timeline({ repeat: -1 })
			.set(secondHalfRef.current, { xPercent: -200 })
			.to(firstHalfRef.current, {
				xPercent: 100,
				duration,
				...props
			})
			.to(secondHalfRef.current, {
				xPercent: -100,
				duration,
				...props
			}, '<');
	}, { scope: wrapperRef });

	return (
		<div className='emoji-divider-wrapper' ref={wrapperRef}>
			<div className="emoji-divider" ref={firstHalfRef}>
				{ emojiArr.map((item, index) => item.svg
					? <Emoji emoji={item} className={ACCENTS.includes(index) ? "accent" : ""} />
					: <AnimatedEmoji emoji={item} className={ACCENTS.includes(index) ? "accent" : ""} />
				)}
			</div>
			<div className="emoji-divider" ref={secondHalfRef}>
				{ emojiArr.map((item, index) => item.svg
					? <Emoji emoji={item} className={ACCENTS.includes(index) ? "accent" : ""} />
					: <AnimatedEmoji emoji={item} className={ACCENTS.includes(index) ? "accent" : ""} />
				)}
			</div>
		</div>
	)
}

const Emoji = (
	{ emoji, className }:
	{ emoji: EmojiItem, className?: string }
) => {

	return (
		<div className={`item ${className}`} id={emoji.id}>
			<emoji.svg />
		</div>
	)
}

const AnimatedEmoji = ({ emoji, className }: { emoji: AnimatedEmojiItem, className?: string }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
		  setCurrentIndex((prevIndex) => (prevIndex + 1) % emoji.svgArr.length);
		}, 500);
	
		return () => clearInterval(interval);
	}, []);

	const emojiItem = { ...emoji, svg: emoji.svgArr[currentIndex], svgArr: undefined }

  	return <Emoji emoji={emojiItem} className={className} />
}



export { EmojiDivider, AnimatedEmoji }