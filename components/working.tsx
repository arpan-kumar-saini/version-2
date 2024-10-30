'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUserGraduate, FaRobot, FaBook } from 'react-icons/fa'

const steps = [
  {
    title: "Create an account",
    description: "Create an account with your college email.",
    icon: FaUserGraduate,
    color: "rgba(167, 243, 208, 0.2)",
    details: "Sign up using your official college email address to get started. This ensures that you have access to all the resources tailored for your institution."
  },
  {
    title: "Talk to our AI",
    description: "Talk to our AI chatbot for instant support.",
    icon: FaRobot,
    color: "rgba(147, 197, 253, 0.2)",
    details: "Our AI-powered chatbot is available 24/7 to answer your questions, provide guidance, and offer immediate support whenever you need it."
  },
  {
    title: "Access resources",
    description: "Access our mental health guide for helpful tips.",
    icon: FaBook,
    color: "rgba(196, 181, 253, 0.2)",
    details: "Explore our comprehensive mental health guide filled with expert advice, coping strategies, and self-help techniques to support your well-being."
  },
]

export default function HowItWorksComponent() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <div className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl font-extrabold text-gray-900 text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.h2>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out h-full"
                  style={{ backgroundColor: step.color }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="px-4 py-5 sm:p-6 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0">
                        <step.icon className="h-8 w-8 text-gray-600 group-hover:text-gray-800 transition-colors duration-300" />
                      </div>
                      <h3 className="ml-4 text-lg font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300 flex-grow">
                      {step.description}
                    </p>
                    <button
                      onClick={() => setActiveStep(activeStep === index ? null : index)}
                      className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                      aria-expanded={activeStep === index}
                    >
                      {activeStep === index ? 'Hide details' : 'Learn more'}
                    </button>
                  </div>
                  <AnimatePresence>
                    {activeStep === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-4 py-3 bg-white border-t border-gray-200"
                      >
                        <p className="text-sm text-gray-600">{step.details}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}