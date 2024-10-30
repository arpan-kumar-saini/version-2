"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { Instagram, Twitter, Mail, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function InteractiveContactUsComponent() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const onSubmit = async () => {
    setIsSubmitting(true)
    // Simulating form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    reset()
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out! We'll get back to you soon.",
      duration: 5000,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="text-4xl font-bold text-gray-800 mb-6 text-center"
        >
          Contact Us
        </motion.h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Input
                  {...register("name", { required: "Please enter your name" })}
                  placeholder="Your name (e.g., Alex)"
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 transition"
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {typeof errors.name.message === "string" ? errors.name.message : ""}
                    </motion.p>
                  )}
                </AnimatePresence>

              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Input
                  {...register("email", { 
                    required: "Please enter your email",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address"
                    }
                  })}
                  placeholder="Your email"
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 transition"
                />
               <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {typeof errors.email.message === "string" ? errors.email.message : ""}
                    </motion.p>
                  )}
                </AnimatePresence>

              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Textarea
                  {...register("message", { required: "Please enter your message" })}
                  placeholder="How can we support you today?"
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 transition"
                  rows={4}
                />
               <AnimatePresence>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {typeof errors.message.message === "string" ? errors.message.message : ""}
                    </motion.p>
                  )}
                </AnimatePresence>

              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:shadow-lg flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Send className="mr-2" size={20} />
                    </motion.div>
                  ) : (
                    <Send className="mr-2" size={20} />
                  )}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </motion.div>
            </form>
          </div>
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-600 text-lg"
            >
              Your voice matters to us. Reach out anytime—we&apos;re here to help.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold text-gray-800">Connect with us</h2>
              <div className="flex space-x-4">
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-600 hover:text-pink-500 transition"
                >
                  <Instagram size={28} />
                </motion.a>
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-600 hover:text-blue-400 transition"
                >
                  <Twitter size={28} />
                </motion.a>
                <motion.a
                  href="mailto:support@mentalhealth.com"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-600 hover:text-red-500 transition"
                >
                  <Mail size={28} />
                </motion.a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Location</h2>
              <p className="text-gray-600">
                123 Wellness Street<br />
                Mindful City, MC 12345<br />
                United States
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}