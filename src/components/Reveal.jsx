import { useEffect, useRef } from 'react';
import { motion, scale, useAnimation, useInView } from 'framer-motion'

export default function Reveal({ children}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const variants = {
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
    };
    
    const mainControls = useAnimation(variants);
    
    useEffect(() => {
        if (isInView) {
            mainControls.start('visible')
        }
    }, [isInView, mainControls]);

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.25, ease: 'easeInOut' }}
            ref={ref}
            style={{
                width: '100%'
            }}
        >
            {children}
        </motion.div>
    );
}