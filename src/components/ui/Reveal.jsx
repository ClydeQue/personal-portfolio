import { motion, useReducedMotion } from 'motion/react'

const variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

function Reveal({ as = 'div', delay = 0, children, ...props }) {
  const reduceMotion = useReducedMotion()
  const MotionTag = as === 'section' ? motion.section : motion.div
  return <MotionTag
    {...props}
    initial={reduceMotion ? false : 'hidden'}
    whileInView="visible"
    viewport={{ once: true, amount: .12 }}
    variants={variants}
    transition={{ duration: .46, delay, ease: [.22, 1, .36, 1] }}
  >{children}</MotionTag>
}

export default Reveal
