// @ts-expect-error: No defs provided
import { horizontalLoop as horizontalLoopUntyped } from './gsap/horizontalLoop';

const horizontalLoop = (items: any, config: any): gsap.core.Timeline => { return horizontalLoopUntyped(items, config) }

export { horizontalLoop }