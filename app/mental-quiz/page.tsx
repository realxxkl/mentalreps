"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Check, Sword, Target, Crown, Scroll, Medal } from "lucide-react"
import FitPlanLogo from "@/components/fitplan-logo"

// Country codes data
const countryCodes = [
  { code: "+1", country: "US/Canada", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+32", country: "Belgium", flag: "🇧🇪" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
  { code: "+43", country: "Austria", flag: "🇦🇹" },
  { code: "+45", country: "Denmark", flag: "🇩🇰" },
  { code: "+46", country: "Sweden", flag: "🇸🇪" },
  { code: "+47", country: "Norway", flag: "🇳🇴" },
  { code: "+358", country: "Finland", flag: "🇫🇮" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
  { code: "+48", country: "Poland", flag: "🇵🇱" },
  { code: "+420", country: "Czech Republic", flag: "🇨🇿" },
  { code: "+36", country: "Hungary", flag: "🇭🇺" },
  { code: "+40", country: "Romania", flag: "🇷🇴" },
  { code: "+359", country: "Bulgaria", flag: "🇧🇬" },
  { code: "+30", country: "Greece", flag: "🇬🇷" },
  { code: "+351", country: "Portugal", flag: "🇵🇹" },
  { code: "+353", country: "Ireland", flag: "🇮🇪" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+66", country: "Thailand", flag: "🇹🇭" },
  { code: "+84", country: "Vietnam", flag: "🇻🇳" },
  { code: "+63", country: "Philippines", flag: "🇵🇭" },
  { code: "+62", country: "Indonesia", flag: "🇮🇩" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+20", country: "Egypt", flag: "🇪🇬" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+972", country: "Israel", flag: "🇮🇱" },
  { code: "+90", country: "Turkey", flag: "🇹🇷" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+54", country: "Argentina", flag: "🇦🇷" },
  { code: "+56", country: "Chile", flag: "🇨🇱" },
  { code: "+57", country: "Colombia", flag: "🇨🇴" },
  { code: "+51", country: "Peru", flag: "🇵🇪" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
]

// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

const validatePhoneNumber = (phone: string): boolean => {
  // Remove all non-digit characters for validation
  const cleanPhone = phone.replace(/\D/g, "")
  // Phone should be between 7-15 digits (international standard)
  return cleanPhone.length >= 7 && cleanPhone.length <= 15
}

const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, "")

  // Format based on length (US format as example, but works internationally)
  if (cleanPhone.length <= 3) return cleanPhone
  if (cleanPhone.length <= 6) return `${cleanPhone.slice(0, 3)}-${cleanPhone.slice(3)}`
  if (cleanPhone.length <= 10) return `${cleanPhone.slice(0, 3)}-${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6)}`
  return `${cleanPhone.slice(0, 3)}-${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6, 10)}`
}

const motivationPersonas = {
  warrior: {
    name: "THE WARRIOR",
    description: "Raw, unfiltered truth that cuts through excuses",
    tone: "Aggressive, no-BS, confrontational",
    icon: <Sword className="w-5 h-5 text-blue-400" />,
  },
  strategist: {
    name: "THE STRATEGIST",
    description: "Calm, systematic approach to building unstoppable habits",
    tone: "Methodical, wise, process-focused",
    icon: <Target className="w-5 h-5 text-blue-400" />,
  },
  champion: {
    name: "THE CHAMPION",
    description: "High-energy hype that ignites your inner fire",
    tone: "Energetic, celebratory, pump-up style",
    icon: <Crown className="w-5 h-5 text-blue-400" />,
  },
  philosopher: {
    name: "THE PHILOSOPHER",
    description: "Deep wisdom that connects fitness to life purpose",
    tone: "Thoughtful, profound, meaning-driven",
    icon: <Scroll className="w-5 h-5 text-blue-400" />,
  },
  competitor: {
    name: "THE COMPETITOR",
    description: "Results-driven motivation that fuels your winning edge",
    tone: "Competitive, achievement-focused, performance-driven",
    icon: <Medal className="w-5 h-5 text-blue-400" />,
  },
}

const quizQuestions = [
  {
    id: 1,
    question: "When you hit a wall in your fitness journey, what gets you moving again?",
    options: [
      {
        value: "warrior",
        text: "Brutal honesty and tough love - call out my excuses",
        icon: <Sword className="w-5 h-5 text-blue-400" />,
      },
      {
        value: "strategist",
        text: "A clear plan and logical next steps to follow",
        icon: <Target className="w-5 h-5 text-blue-400" />,
      },
      {
        value: "champion",
        text: "High-energy motivation and celebration of small wins",
        icon: <Crown className="w-5 h-5 text-blue-400" />,
      },
      {
        value: "philosopher",
        text: "Deep reflection on why this matters to my life purpose",
        icon: <Scroll className="w-5 h-5 text-blue-400" />,
      },
      {
        value: "competitor",
        text: "Reminders of my goals and what I'm competing against",
        icon: <Medal className="w-5 h-5 text-blue-400" />,
      },
    ],
  },
  {
    id: 2,
    question: "What type of energy resonates most with your personality?",
    options: [
      { value: "warrior", text: "Intense, raw, and uncompromising", icon: <Sword className="w-5 h-5 text-blue-400" /> },
      { value: "strategist", text: "Calm, steady, and methodical", icon: <Target className="w-5 h-5 text-blue-400" /> },
      {
        value: "champion",
        text: "Explosive, celebratory, and uplifting",
        icon: <Crown className="w-5 h-5 text-blue-400" />,
      },
      {
        value: "philosopher",
        text: "Thoughtful, meaningful, and introspective",
        icon: <Scroll className="w-5 h-5 text-blue-400" />,
      },
      {
        value: "competitor",
        text: "Driven, focused, and results-oriented",
        icon: <Medal className="w-5 h-5 text-blue-400" />,
      },
    ],
  },
  {
    id: 3,
    question: "How do you prefer to receive feedback and coaching?",
    options: [
      {
        value: "warrior",
        text: "Direct and confrontational - don't sugarcoat it",
        icon: <Sword className="w-5 h-5 text-blue-400" />,
      },
      {
        value: "strategist",
        text: "Structured with clear reasoning and evidence",
        icon: <Target className="w-5 h-5 text-blue-400" />,
      },
      {
        value: "champion",
        text: "Enthusiastic and encouraging with lots of energy",
        icon: <Crown className="w-5 h-5 text-blue-400" />,
      },
      {
        value: "philosopher",
        text: "Connected to deeper meaning and personal growth",
        icon: <Scroll className="w-5 h-5 text-blue-400" />,
      },
      {
        value: "competitor",
        text: "Performance-focused with benchmarks and comparisons",
        icon: <Medal className="w-5 h-5 text-blue-400" />,
      },
    ],
  },
]

export default function MentalQuizPage() {
  const [currentStep, setCurrentStep] = useState("quiz")
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [contactInfo, setContactInfo] = useState("")
  const [contactType, setContactType] = useState<"email" | "phone">("email")
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1") // Default to US
  const [validationError, setValidationError] = useState("")

  const handleAnswerSelect = (value: string) => {
    const questionId = quizQuestions[currentQuestion].id
    setAnswers((prev) => ({ ...prev, [questionId]: value }))

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResult({ ...answers, [questionId]: value })
    }
  }

  const calculateResult = (finalAnswers: Record<number, string>) => {
    const scores: Record<string, number> = {}
    Object.values(finalAnswers).forEach((answer) => {
      scores[answer] = (scores[answer] || 0) + 1
    })

    const topScore = Math.max(...Object.values(scores))
    const winners = Object.keys(scores).filter((key) => scores[key] === topScore)
    setResult(winners[0])
    setCurrentStep("result")
  }

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else {
      window.close()
    }
  }

  const handleContactSubmit = () => {
    const fullContact = contactType === "phone" ? `${selectedCountryCode} ${contactInfo}` : contactInfo

    console.log(`Sending daily motivation to ${contactType}: ${fullContact}`)
    setCurrentStep("success")
  }

  if (currentStep === "quiz") {
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
    const question = quizQuestions[currentQuestion]

    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-3">
            <FitPlanLogo />
            <span className="text-xl font-bold" style={{ fontFamily: "NDot, monospace" }}>
              FitPlan
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={goBack} className="text-white hover:bg-gray-800 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <span className="text-sm font-medium text-gray-400" style={{ fontFamily: "monospace" }}>
            {currentQuestion + 1} OF {quizQuestions.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-gray-900 mx-6 mb-8 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question */}
        <div className="px-6 py-12 flex items-center justify-center min-h-[70vh]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white" style={{ fontFamily: "NDot, monospace" }}>
              {question.question}
            </h2>

            {/* Options */}
            <div className="grid gap-6">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleAnswerSelect(option.value)}
                  className="p-8 text-left justify-start text-lg hover:scale-105 transition-all duration-200 bg-black border-gray-700 hover:border-blue-600 text-white hover:bg-gray-900"
                  style={{ fontFamily: "monospace" }}
                >
                  {option.icon}
                  <span className="ml-4">{option.text}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === "result" && result) {
    const persona = motivationPersonas[result as keyof typeof motivationPersonas]

    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-3">
            <FitPlanLogo />
            <span className="text-xl font-bold" style={{ fontFamily: "NDot, monospace" }}>
              FitPlan
            </span>
          </div>
        </div>

        {/* Results */}
        <div className="px-6 py-12 flex items-center justify-center min-h-[80vh]">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              {persona.icon}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "NDot, monospace" }}>
              <span className="text-white">YOU ARE</span>
              <br />
              <span className="text-blue-400">{persona.name}</span>
            </h1>

            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: "monospace" }}>
              {persona.description}
            </p>

            <div className="bg-blue-600/10 border border-blue-600/20 rounded-full px-6 py-2 inline-block mb-12">
              <span className="text-blue-400 font-medium text-sm" style={{ fontFamily: "monospace" }}>
                {persona.tone}
              </span>
            </div>

            {/* Contact Form */}
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-bold text-center mb-6 text-white" style={{ fontFamily: "NDot, monospace" }}>
                Get Daily {persona.name} Motivation
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex gap-2">
                  <Button
                    variant={contactType === "email" ? "default" : "outline"}
                    onClick={() => {
                      setContactType("email")
                      setContactInfo("")
                      setValidationError("")
                    }}
                    className={
                      contactType === "email"
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white bg-transparent"
                    }
                    style={{ fontFamily: "monospace" }}
                  >
                    Email
                  </Button>
                  <Button
                    variant={contactType === "phone" ? "default" : "outline"}
                    onClick={() => {
                      setContactType("phone")
                      setContactInfo("")
                      setValidationError("")
                    }}
                    className={
                      contactType === "phone"
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white bg-transparent"
                    }
                    style={{ fontFamily: "monospace" }}
                  >
                    Phone
                  </Button>
                </div>

                {contactType === "phone" && (
                  <div className="flex gap-2">
                    <select
                      value={selectedCountryCode}
                      onChange={(e) => setSelectedCountryCode(e.target.value)}
                      className="bg-gray-900 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm"
                      style={{ fontFamily: "monospace" }}
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code} {country.country}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <Input
                  type={contactType === "email" ? "email" : "tel"}
                  placeholder={contactType === "email" ? "example@example.com" : "123-456-7890"}
                  value={contactInfo}
                  onChange={(e) => {
                    let value = e.target.value
                    if (contactType === "phone") {
                      value = formatPhoneNumber(value)
                    }
                    setContactInfo(value)
                    setValidationError("")
                  }}
                  className={`bg-gray-900 border text-white placeholder-gray-500 ${
                    validationError ? "border-red-500" : "border-gray-700"
                  }`}
                  style={{ fontFamily: "monospace" }}
                />

                {validationError && (
                  <p className="text-red-500 text-sm" style={{ fontFamily: "monospace" }}>
                    {validationError}
                  </p>
                )}
              </div>

              <Button
                onClick={() => {
                  let isValid = false

                  if (contactType === "email") {
                    isValid = validateEmail(contactInfo)
                    if (!isValid) {
                      setValidationError("Please enter a valid email (example@example.com)")
                      return
                    }
                  } else {
                    isValid = validatePhoneNumber(contactInfo)
                    if (!isValid) {
                      setValidationError("Please enter a valid phone number (7-15 digits)")
                      return
                    }
                  }

                  if (isValid) {
                    handleContactSubmit()
                  }
                }}
                disabled={!contactInfo}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white py-4 rounded-xl font-bold"
                style={{ fontFamily: "NDot, monospace" }}
              >
                Start Daily Motivation
              </Button>

              <p className="text-gray-500 text-sm text-center mt-4" style={{ fontFamily: "monospace" }}>
                Get personalized {persona.name.toLowerCase()} motivation delivered daily
                {contactType === "phone" && (
                  <span className="block mt-1">
                    {selectedCountryCode} {contactInfo}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === "success") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-3xl font-bold mb-4 text-white" style={{ fontFamily: "NDot, monospace" }}>
            You're All Set!
          </h1>

          <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto" style={{ fontFamily: "monospace" }}>
            Your daily {result && motivationPersonas[result as keyof typeof motivationPersonas].name.toLowerCase()}{" "}
            motivation will start tomorrow.
          </p>

          <Button
            onClick={() => window.close()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold"
            style={{ fontFamily: "NDot, monospace" }}
          >
            Close
          </Button>
        </div>
      </div>
    )
  }

  return null
}
