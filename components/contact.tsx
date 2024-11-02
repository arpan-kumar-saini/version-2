"use client"

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { Instagram, Twitter, Mail, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Swal from 'sweetalert2'

// Define the interface for form data
interface FormData {
  name: string
  email: string
  message: string
}

export default function InteractiveContactUsComponent() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true)
    
    // Create form data with Web3Forms key
    const formData = new FormData()
    formData.append("access_key", "6e5d7c0f-556a-4fe6-ba6a-c974c3c6230f")
    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("message", data.message)

    try {
      // Submit to Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
      
      const result = await response.json()

      if (result.success) {
        Swal.fire({
          title: "Thank You",
          text: "🧠😊We will contact you soon....😊🫀",
          icon: "success"
        });
        reset() // Reset the form on success
      } 
    } catch (error) {
      console.error("Error submitting form:", error)
      Swal.showValidationMessage('<i class="fa fa-info-circle"></i> Your name is required')
    }

    setIsSubmitting(false)
  }

  return (
    <div className="h-[700px] flex items-center justify-center p-4" id="contact">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-8 max-w-6xl w-full bg-gradient-to-br from-green-50 via-blue-50 to-purple-50"
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
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
          {/* Additional information and links */}
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
                  href="https://instagram.com/arpan_kumar_saini"
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
                  href="mailto:work.arpansaini@gmail.com"
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
              <p className="text-gray-600">work.heartfulmind@gmail.com</p>
              <p className="text-gray-600">+91 9528829470</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
