import { AnimationProps, Variants, motion, useCycle } from 'framer-motion'

type ISidebar = {
    items: string[]
}

const sidebar: Variants = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(30px at 40px 40px)",
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};

const variants: Variants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

const menuVariants: Variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

const closeTransition: AnimationProps = { transition: { delay: 0.5 } }

const Sidebar = ({ items }: ISidebar) => {

    const [isOpen, toggleOpen] = useCycle(false, true);

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
        >
            <motion.div 
                className="fixed top-0 left-0 bottom-0 w-72  bg-white flex justify-center items-center 
                    max-sm:w-full" 
                variants={sidebar}>

                {/* Toggle Button */}
                <button
                    className='outline-none border-none cursor-pointer absolute rounded-full h-12 w-12 top-4 left-7'
                    onClick={() => toggleOpen()}
                >
                    <svg width="23" height="23" viewBox="0 0 23 23">
                        <motion.path
                            fill="transparent"
                            strokeWidth="3"
                            stroke="hsl(0, 0%, 18%)"
                            strokeLinecap="round"
                            variants={{
                                closed: { d: "M 2 2.5 L 20 2.5", ...closeTransition },
                                open: { d: "M 3 16.5 L 17 2.5" }
                            }}
                        />
                        <motion.path
                            fill="transparent"
                            strokeWidth="3"
                            stroke="hsl(0, 0%, 18%)"
                            strokeLinecap="round"
                            d="M 2 9.423 L 20 9.423"
                            variants={{
                                closed: { opacity: 1, ...closeTransition },
                                open: { opacity: 0 }
                            }}
                        />
                        <motion.path
                            fill="transparent"
                            strokeWidth="3"
                            stroke="hsl(0, 0%, 18%)"
                            strokeLinecap="round"
                            variants={{
                                closed: { d: "M 2 16.346 L 20 16.346", ...closeTransition },
                                open: { d: "M 3 2.5 L 17 16.346" },

                            }}
                        />
                    </svg>
                </button>

                {/* Menu List */}
                <motion.div
                    className='absolute w-60 p-6 flex flex-col justify-center items-center gap-5 text-black'
                    variants={variants}
                >
                    {items.map((item, i) => (
                        <motion.a
                            className='text-xl no-underline text-inherit'
                            key={i}
                            href={`#${item}`}
                            variants={menuVariants}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {item}
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>

        </motion.nav>
    );
}

export default Sidebar;