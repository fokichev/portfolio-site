// @ts-expect-error: No defs provided
import { horizontalLoop as horizontalLoopUntyped } from './gsap/horizontalLoop';

const horizontalLoop = (items: any, config: any): gsap.core.Timeline => { return horizontalLoopUntyped(items, config) }

// @ts-expect-error: No defs provided
import { verticalLoop as verticalLoopUntyped } from './gsap/verticalLoop';

const verticalLoop = (items: any, config: any): gsap.core.Timeline => { return verticalLoopUntyped(items, config) }

export { horizontalLoop, verticalLoop }