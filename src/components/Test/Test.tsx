import './Test.scss'
import { TargetAndTransition, Variants, motion, useMotionValueEvent, useScroll } from 'framer-motion'

const imagesUrl: string[] = [
    'https://images.unsplash.com/photo-1506057213367-028a17ec52e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1499748926165-1085fc69e9fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fHw%3D',
    'https://images.unsplash.com/photo-1476970980147-71209edbfa4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTZ8fHxlbnwwfHx8fHw%3D'
]

const ANIMATION_TRANSLATE_DURATION = 2
const ANIMATION_SVG_DURATION = 1
const ANIMATION_DELAY = 1

const fixedTextAnimation: { hover: TargetAndTransition, view: TargetAndTransition } = {
    hover: {
        opacity: 1,
        transition: { duration: 0.5, delay: 0.25 }

    },
    view: {
        opacity: 0.5,
        transition: { duration: ANIMATION_TRANSLATE_DURATION, delay: ANIMATION_TRANSLATE_DURATION }
    }
}

const svgVariant: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (d) => {
        const delay = d ? ANIMATION_TRANSLATE_DURATION + (ANIMATION_TRANSLATE_DURATION * 0.25) : ANIMATION_TRANSLATE_DURATION
        return {
            pathLength: 1,
            opacity: 1,
            transition: { pathLength: { delay, duration: ANIMATION_SVG_DURATION } }
        }
    }
}

const textTranslateVariant: Variants = {
    hidden: {
        y: -75,
        opacity: 0,
        transition: { duration: ANIMATION_TRANSLATE_DURATION, delay: ANIMATION_DELAY }
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: ANIMATION_TRANSLATE_DURATION, delay: ANIMATION_DELAY }
    }
}

const TestComponent = () => {

    // const ref = useRef(null);
    // const { scrollYProgress } = useScroll({ target: ref });
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {
        console.log("Page scroll: ", latest)
    })

    return (
        <div className='flex w-screen flex-col justify-center items-center bg-zinc-900'>

            <motion.div
                className='absolute top-0 left-0 bg-red-100 h-1/3 w-screen'
            />

            <motion.h3
                whileHover={fixedTextAnimation.hover}
                whileInView={fixedTextAnimation.view}
                className='left-5'
            >
                About
            </motion.h3>
            <motion.h3
                whileHover={fixedTextAnimation.hover}
                whileInView={fixedTextAnimation.view}
                className='-right-16'
            >
                rohit.h@sankeysolutions.com
            </motion.h3>

            <section
                className='flex-col'

            >
                <motion.div
                    className='flex flex-col justify-center items-center gap-2'
                    initial="hidden"
                    whileInView="visible"
                >
                    <div className='overflow-hidden py-1'>
                        <motion.h1
                            className='font-mono text-6xl text-center'
                            variants={textTranslateVariant}
                        >
                            Rohit Hegde
                        </motion.h1>
                    </div>
                    <div className='overflow-hidden'>
                        <motion.h2
                            className='font-sans text-md tracking-widest text-center'
                            variants={textTranslateVariant}
                        >
                            SOLUTION LEAD
                        </motion.h2>
                    </div>
                </motion.div>

                <motion.svg
                    width={25} height={70}
                    className='absolute bottom-12 cursor-pointer stroke-white opacity-50'
                    whileInView="visible"
                    initial="hidden"
                    whileHover="visible"
                    onClick={() => document.getElementById('imageStart')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <motion.path variants={svgVariant} custom={false} d='M 10 0 V 65' />
                    <motion.path variants={svgVariant} custom={true} d='M 10 65 L 0 57.5 M 10 65 L 20 57.5' />
                </motion.svg>
            </section>

            <section id="imageStart">
                <img src={imagesUrl[0]} />
            </section>

            <section>
                <img src={imagesUrl[1]} />
            </section>
            <section>
                <img src={imagesUrl[2]} />
            </section>
        </div>
    );
}

export default TestComponent;