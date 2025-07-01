"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Check, Brain } from "lucide-react"

// Fixed typing animation hook
function useTypingEffect(text: string, speed = 50, startTyping = false) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!startTyping) {
      setDisplayedText("")
      setIsComplete(false)
      return
    }

    let index = 0
    setDisplayedText("")
    setIsComplete(false)

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1))
        index++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed, startTyping])

  return { displayedText, isComplete }
}

// Intersection Observer hook
function useIntersectionObserver(threshold = 0.3) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold])

  return { ref, isVisible }
}

interface MentalRepsSectionProps {
  onComplete?: () => void
}

export default function MentalRepsSection({ onComplete }: MentalRepsSectionProps) {
  const [currentStep, setCurrentStep] = useState("intro")

  // Animation states
  const [showIcon, setShowIcon] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showPlanText, setShowPlanText] = useState(false)
  const [showDietText, setShowDietText] = useState(false)
  const [showHowBadge, setShowHowBadge] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)
  const [showActivateButton, setShowActivateButton] = useState(false)
  const [showStrikethrough, setShowStrikethrough] = useState(false)

  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.3)

  // Typing effects - optimized for engagement (faster, more dynamic)
  const mainTitle = useTypingEffect("Train the Muscle That Never Rests", 45, isVisible && showIcon) // Faster: 80ms → 45ms
  const mindsetText = useTypingEffect("Now build the mindset that won't let you quit.", 55, showDietText) // Faster: 100ms → 55ms

  // Sequential animation triggers - optimized timing
  useEffect(() => {
    if (isVisible) {
      // Icon appears immediately
      setShowIcon(true)

      // Subtitle appears after main title is complete - faster
      if (mainTitle.isComplete) {
        setTimeout(() => setShowSubtitle(true), 300) // 500ms → 300ms
        setTimeout(() => setShowPlanText(true), 500) // 800ms → 500ms
      }

      // Diet text appears after plan text - quicker
      if (showPlanText) {
        setTimeout(() => setShowDietText(true), 400) // 600ms → 400ms
      }

      // How badge and strikethrough appear faster after mindset text
      if (mindsetText.isComplete) {
        setTimeout(() => setShowHowBadge(true), 500) // 800ms → 500ms
        // Strikethrough appears much quicker for impact
        setTimeout(() => setShowStrikethrough(true), 700) // 1200ms → 700ms
      }

      // Features appear quicker
      if (showHowBadge) {
        setTimeout(() => setShowFeatures(true), 800) // 1500ms → 800ms
      }

      // Activate button appears faster
      if (showFeatures) {
        setTimeout(() => setShowActivateButton(true), 600) // 1200ms → 600ms
      }
    }
  }, [isVisible, mainTitle.isComplete, showPlanText, mindsetText.isComplete, showHowBadge, showFeatures])

  const handleStartQuiz = () => {
    // Navigate to a new page for the quiz
    window.open("/mental-quiz", "_blank")
  }

  if (currentStep === "intro") {
    return (
      <div className="mb-16 flex justify-center" ref={sectionRef}>
        <div className="max-w-4xl w-full">
          {/* Centered Mental Reps Section */}
          <div className="text-center mb-16">
            {/* Brain Icon */}
            <div
              className={`w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-12 shadow-2xl shadow-blue-600/25 transition-all duration-1000 ${
                showIcon ? "opacity-100 scale-100 animate-pulse" : "opacity-0 scale-50"
              }`}
            >
              <Brain className="w-10 h-10 text-white" />
            </div>

            {/* Main Title with Typing Effect */}
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-8 min-h-[4rem]"
              style={{ fontFamily: "NDot, monospace" }}
            >
              {mainTitle.displayedText}
              {mainTitle.displayedText && !mainTitle.isComplete && <span className="animate-pulse">|</span>}
            </h2>

            {/* Subtitle */}
            <div
              className={`bg-blue-600/10 border border-blue-600/20 rounded-full px-6 py-2 inline-block mb-16 transition-all duration-1000 ${
                showSubtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="text-blue-400 font-medium text-sm" style={{ fontFamily: "monospace" }}>
                <span className="text-blue-400 font-bold">MENTAL REPS</span> ADD-ON
              </span>
            </div>
          </div>

          {/* Enhanced Glory Text with Slide-in Effects and Better Spacing */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-gray-300 text-2xl md:text-3xl mb-12 space-y-6" style={{ fontFamily: "monospace" }}>
              {/* Plan Text - Slide in from left */}
              <p
                className={`min-h-[3rem] transition-all duration-1000 ${
                  showPlanText ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              >
                You've got the <span className="text-blue-400 font-bold animate-pulse">plan</span>.
              </p>

              {/* Diet Text - Slide in from left */}
              <p
                className={`min-h-[3rem] transition-all duration-1000 ${
                  showDietText ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              >
                You've got the <span className="text-blue-400 font-bold animate-pulse">diet</span>.
              </p>
            </div>

            {/* Mindset Text - Typing effect with strikethrough on "quit" */}
            <div className="mb-16">
              <p
                className="text-white font-bold text-3xl md:text-4xl shadow-lg min-h-[6rem] leading-relaxed"
                style={{ fontFamily: "NDot, monospace" }}
              >
                {mindsetText.displayedText && (
                  <>
                    Now build the mindset that won't let you{" "}
                    <span className="relative inline-block">
                      <span className="text-red-500 font-bold">quit</span>
                      {showStrikethrough && (
                        <span
                          className="absolute top-1/2 left-0 w-full h-0.5 bg-red-500 animate-strikethrough"
                          style={{
                            transformOrigin: "left center",
                            transform: "scaleX(0)",
                          }}
                        />
                      )}
                    </span>
                    .
                  </>
                )}
                {mindsetText.displayedText && !mindsetText.isComplete && <span className="animate-pulse">|</span>}
              </p>
            </div>

            {/* HOW? Badge - Same style as MENTAL REPS ADD-ON */}
            <div
              className={`mb-16 transition-all duration-1000 ${showHowBadge ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <div className="bg-blue-600/10 border border-blue-600/20 rounded-full px-6 py-2 inline-block">
                <span className="text-blue-400 font-bold text-sm" style={{ fontFamily: "monospace" }}>
                  HOW?
                </span>
              </div>
            </div>

            {/* Features List */}
            <div
              className={`text-left max-w-md mx-auto mb-16 transition-all duration-1000 ${showFeatures ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <p className="text-white font-bold mb-8 text-xl text-center" style={{ fontFamily: "NDot, monospace" }}>
                Mental Reps gives you:
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4 transform hover:translate-x-2 transition-all duration-300">
                  <Check className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-300 text-lg" style={{ fontFamily: "monospace" }}>
                    Motivation built for you
                  </span>
                </div>
                <div className="flex items-center gap-4 transform hover:translate-x-2 transition-all duration-300">
                  <Check className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-300 text-lg" style={{ fontFamily: "monospace" }}>
                    Daily mental drills
                  </span>
                </div>
                <div className="flex items-center gap-4 transform hover:translate-x-2 transition-all duration-300">
                  <Check className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-300 text-lg" style={{ fontFamily: "monospace" }}>
                    Texts that hit when you need them most
                  </span>
                </div>
              </div>
            </div>

            {/* Activate Button */}
            <div
              className={`transition-all duration-1000 ${showActivateButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <Button
                onClick={handleStartQuiz}
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg font-bold rounded-xl shadow-2xl hover:shadow-blue-600/25 transform hover:scale-105 transition-all duration-300 border border-blue-500"
                style={{ fontFamily: "NDot, monospace" }}
              >
                ACTIVATE MENTAL REPS
              </Button>
            </div>
          </div>

          {/* Custom CSS for strikethrough animation - faster and more impactful */}
          <style jsx>{`
            @keyframes strikethrough {
              from {
                transform: scaleX(0);
              }
              to {
                transform: scaleX(1);
              }
            }
            
            .animate-strikethrough {
              animation: strikethrough 0.4s ease-out forwards; /* 0.8s → 0.4s for more impact */
            }
          `}</style>
        </div>
      </div>
    )
  }

  return null
}
