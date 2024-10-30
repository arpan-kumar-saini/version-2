"use client";

import { Button } from "@/components/ui/button";
import { Lock, Bot, ArrowRight, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ReactNode,useRef, useEffect, useState,ButtonHTMLAttributes } from "react";


function FloatingOrb({ delay = 0, duration = 5, size = 300, color = "rgba(147, 197, 253, 0.2)" }) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl"
      animate={{
        y: ["0%", "-50%", "0%"],
        x: ["0%", "25%", "0%"],
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
      style={{
        width: size,
        height: size,
        background: color,
      }}
    />
  );
}


interface ParallaxTextProps {
  children: ReactNode;
  className?: string;
}

function ParallaxText({ children, className = "" }: ParallaxTextProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}




interface InteractiveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "outline" | "secondary"; // Other variants if needed
  size?: "sm" | "lg"; // Add size options here
}

function InteractiveButton({ children, variant = "default", size = "lg", ...props }: InteractiveButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button variant={variant} size={size} {...props}>
        {children}
      </Button>
    </motion.div>
  );
}


export default function InteractiveHero() {
  const containerRef = useRef<HTMLDivElement | null>(null); // Specify the type for the ref
  const isInView = useInView(containerRef, { once: true });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) { // Check if current is not null
        const { clientX, clientY } = e;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center  "
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <FloatingOrb delay={0} color="rgba(167, 243, 208, 0.2)" size={400} />
      <FloatingOrb delay={2} color="rgba(147, 197, 253, 0.2)" size={300} />
      <FloatingOrb delay={4} color="rgba(196, 181, 253, 0.2)" size={350} />

      {/* Main Content */}
      <div className="relative container px-4 md:px-6 flex flex-col items-center justify-center gap-8 text-center">
        <ParallaxText className="space-y-4 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400"
          >
            Your Mind, Your Sanctuary 🌱
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground"
          >
            A supportive space for college students navigating stress, emotions, and everything in between. Powered by AI, tailored for you.
          </motion.p>
        </ParallaxText>

        {/* Interactive Description */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
          }}
          className="relative p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl"
        >
          <p className="text-muted-foreground leading-relaxed max-w-[42rem]">
            With Heartful Mind, you have access to AI-driven tools for stress relief, emotional support, and mental well-being. Chat with AI advisors, explore resources, and find what you need—all designed just for college students like you. Secure, personal, and available 24/7.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6 w-full max-w-sm sm:max-w-md"
        >
          <InteractiveButton size="lg" className="w-full group">
            Start Your Journey
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </InteractiveButton>
          <InteractiveButton variant="outline" size="lg" className="w-full">
            Learn More
          </InteractiveButton>
        </motion.div>

        {/* Login Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <InteractiveButton variant="secondary" size="lg" className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-blue-200 dark:from-green-800 dark:to-blue-800 opacity-0 group-hover:opacity-10 transition-opacity" />
            <Lock className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
            Login with College Email
            <Bot className="ml-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
          </InteractiveButton>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex items-center gap-4 text-sm text-muted-foreground"
          >
            <div className="flex items-center">
              <Lock className="mr-1 h-3 w-3" />
              Secure & Private
            </div>
            <div className="flex items-center">
              <Bot className="mr-1 h-3 w-3" />
              AI-Powered Support
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}
