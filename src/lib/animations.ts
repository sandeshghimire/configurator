// Animation variants and utilities for Framer Motion
import { Variants, Transition } from "framer-motion";

// Page transition animations
export const pageVariants: Variants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98,
    },
    in: {
        opacity: 1,
        y: 0,
        scale: 1,
    },
    out: {
        opacity: 0,
        y: -20,
        scale: 0.98,
    },
};

export const pageTransition: Transition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.4,
};

// Card animation variants
export const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
    },
    hover: {
        y: -8,
        scale: 1.02,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 17,
        },
    },
    tap: {
        scale: 0.98,
    },
};

// Stagger container for multiple cards
export const containerVariants: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.1,
            staggerChildren: 0.08,
        },
    },
};

// Button animation variants
export const buttonVariants: Variants = {
    initial: {
        scale: 1,
    },
    hover: {
        scale: 1.05,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 17,
        },
    },
    tap: {
        scale: 0.95,
    },
    loading: {
        scale: [1, 1.02, 1],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

// Progress indicator animations
export const progressVariants: Variants = {
    inactive: {
        scale: 1,
        backgroundColor: "#e5e7eb",
    },
    active: {
        scale: 1.1,
        backgroundColor: "#3b82f6",
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 30,
        },
    },
    completed: {
        scale: 1,
        backgroundColor: "#10b981",
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 30,
        },
    },
};

// Sidebar animation variants
export const sidebarVariants: Variants = {
    closed: {
        x: "-100%",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
    open: {
        x: 0,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
};

// Loading spinner variants
export const spinnerVariants: Variants = {
    start: {
        rotate: 0,
    },
    end: {
        rotate: 360,
        transition: {
            duration: 1,
            repeat: Infinity,
            ease: "linear",
        },
    },
};

// Floating animation for decorative elements
export const floatingVariants: Variants = {
    animate: {
        y: [-10, 10, -10],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

// Fade in with delay
export const fadeInVariants: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: (delay = 0) => ({
        opacity: 1,
        transition: {
            delay,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};

// Slide up animation
export const slideUpVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
        },
    },
};

// Scale in animation
export const scaleInVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
        },
    },
};

// Checkbox animation variants
export const checkboxVariants: Variants = {
    unchecked: {
        scale: 1,
        rotate: 0,
    },
    checked: {
        scale: [1, 1.2, 1],
        rotate: [0, 10, 0],
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },
};

// Modal/Sheet animation variants
export const modalVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.2,
            ease: "easeInOut",
        },
    },
};

// Navigation animations
export const navigationVariants: Variants = {
    enter: {
        x: 300,
        opacity: 0,
    },
    center: {
        x: 0,
        opacity: 1,
    },
    exit: {
        x: -300,
        opacity: 0,
    },
};

// Error boundary animation
export const errorVariants: Variants = {
    hidden: {
        opacity: 0,
        y: -50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 30,
        },
    },
};

// Tooltip animation
export const tooltipVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 10,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 30,
        },
    },
};
