"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export function CountUp({ number, active }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        if (!active) {
            count.set(0);
            return;
        }
        const controls = animate(count, number, { duration: 4, ease: [0.1, 1, 0.1, 1] });
        return controls.stop;
    }, [active, number, count]);

    return <motion.span>{rounded}</motion.span>;
}