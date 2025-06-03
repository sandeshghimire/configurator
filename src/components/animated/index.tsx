"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    buttonVariants,
    cardVariants,
    containerVariants,
    fadeInVariants,
    slideUpVariants,
    scaleInVariants,
    bounceVariants,
    pulseVariants,
    transitions
} from "@/lib/animations";

// Animated Button Component
export const AnimatedButton = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<typeof Button>
>(({ children, ...props }, ref) => (
    <motion.div
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        transition={transitions.spring}
    >
        <Button ref={ref} {...props}>
            {children}
        </Button>
    </motion.div>
));
AnimatedButton.displayName = "AnimatedButton";

// Animated Card Component
export const AnimatedCard = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<typeof Card> & {
        delay?: number;
        enableHover?: boolean;
    }
>(({ children, delay = 0, enableHover = true, ...props }, ref) => (
    <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={enableHover ? "hover" : undefined}
        whileTap={enableHover ? "tap" : undefined}
        transition={{ ...transitions.spring, delay }}
    >
        <Card ref={ref} {...props}>
            {children}
        </Card>
    </motion.div>
));
AnimatedCard.displayName = "AnimatedCard";

// Animated Container for staggered children
export const AnimatedContainer = ({
    children,
    className,
    staggerDelay = 0.1,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
} & React.ComponentProps<typeof motion.div>) => (
    <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{
            delayChildren: 0.1,
            staggerChildren: staggerDelay,
        }}
        {...props}
    >
        {children}
    </motion.div>
);

// Fade In Animation Wrapper
export const FadeIn = ({
    children,
    delay = 0,
    className,
    ...props
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
} & React.ComponentProps<typeof motion.div>) => (
    <motion.div
        className={className}
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
        custom={delay}
        {...props}
    >
        {children}
    </motion.div>
);

// Slide Up Animation Wrapper
export const SlideUp = ({
    children,
    delay = 0,
    className,
    ...props
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
} & React.ComponentProps<typeof motion.div>) => (
    <motion.div
        className={className}
        variants={slideUpVariants}
        initial="hidden"
        animate="visible"
        transition={{ ...transitions.spring, delay }}
        {...props}
    >
        {children}
    </motion.div>
);

// Scale In Animation Wrapper
export const ScaleIn = ({
    children,
    delay = 0,
    className,
    ...props
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
} & React.ComponentProps<typeof motion.div>) => (
    <motion.div
        className={className}
        variants={scaleInVariants}
        initial="hidden"
        animate="visible"
        transition={{ ...transitions.spring, delay }}
        {...props}
    >
        {children}
    </motion.div>
);

// Bounce Animation Wrapper
export const Bounce = ({
    children,
    trigger = false,
    className,
    ...props
}: {
    children: React.ReactNode;
    trigger?: boolean;
    className?: string;
} & React.ComponentProps<typeof motion.div>) => (
    <motion.div
        className={className}
        variants={bounceVariants}
        initial="initial"
        animate={trigger ? "bounce" : "initial"}
        {...props}
    >
        {children}
    </motion.div>
);

// Pulse Animation Wrapper
export const Pulse = ({
    children,
    isActive = false,
    className,
    ...props
}: {
    children: React.ReactNode;
    isActive?: boolean;
    className?: string;
} & React.ComponentProps<typeof motion.div>) => (
    <motion.div
        className={className}
        variants={pulseVariants}
        initial="initial"
        animate={isActive ? "pulse" : "initial"}
        {...props}
    >
        {children}
    </motion.div>
);

// Page Transition Wrapper
export const PageTransition = ({ children }: { children: React.ReactNode }) => (
    <AnimatePresence mode="wait">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={transitions.smooth}
        >
            {children}
        </motion.div>
    </AnimatePresence>
);

// Hover Scale Wrapper
export const HoverScale = ({
    children,
    scale = 1.05,
    className,
    ...props
}: {
    children: React.ReactNode;
    scale?: number;
    className?: string;
} & React.ComponentProps<typeof motion.div>) => (
    <motion.div
        className={className}
        whileHover={{ scale }}
        whileTap={{ scale: scale * 0.95 }}
        transition={transitions.spring}
        {...props}
    >
        {children}
    </motion.div>
);

// Loading Spinner Animation
export const LoadingSpinner = ({
    className = "w-4 h-4",
    ...props
}: {
    className?: string;
} & React.ComponentProps<typeof motion.div>) => (
    <motion.div
        className={`border-2 border-gray-300 border-t-blue-600 rounded-full ${className}`}
        animate={{ rotate: 360 }}
        transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
        }}
        {...props}
    />
);

// Staggered List Animation
export const StaggeredList = ({
    children,
    className,
    staggerDelay = 0.1,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
} & React.ComponentProps<typeof motion.div>) => (
    <motion.div
        className={className}
        initial="hidden"
        animate="visible"
        variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    delayChildren: 0.1,
                    staggerChildren: staggerDelay,
                },
            },
        }}
        {...props}
    >
        {React.Children.map(children, (child, index) => (
            <motion.div
                key={index}
                variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                }}
                transition={transitions.spring}
            >
                {child}
            </motion.div>
        ))}
    </motion.div>
);
