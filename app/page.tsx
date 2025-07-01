"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Dumbbell,
  Target,
  Clock,
  Calendar,
  Download,
  Phone,
  Sparkles,
  Zap,
  Home,
  Users,
  TrendingUp,
  Rocket,
  Timer,
  Utensils,
  Apple,
  Leaf,
  Wheat,
  Activity,
  User,
  Baby,
  UserCheck,
  Crown,
} from "lucide-react"
import MentalRepsSection from "@/components/mental-reps-section"
import FitPlanLogo from "@/components/fitplan-logo"

interface QuizData {
  goal: string
  training: string
  experience: string
  frequency: string
  duration: string
  diet: string
  age: string
  weight: string
  height: string
  email: string
  name: string
}

interface WorkoutDay {
  day: string
  type: string
  duration: string
  warmup: string[]
  exercises: string[]
  substitutes?: string[]
}

interface MealPlan {
  meal: string
  calories: number
  foods: string[]
}

export default function MinimalFitnessFunnel() {
  const [currentStep, setCurrentStep] = useState<"landing" | "quiz" | "results">("landing")
  const [quizStep, setQuizStep] = useState(0)
  const [quizData, setQuizData] = useState<QuizData>({
    goal: "",
    training: "",
    experience: "",
    frequency: "",
    duration: "",
    diet: "",
    age: "",
    weight: "",
    height: "",
    email: "",
    name: "",
  })

  const totalQuizSteps = 9

  useEffect(() => {
    // Auto-save quiz data to localStorage
    if (currentStep === "quiz") {
      localStorage.setItem("fitnessQuizData", JSON.stringify(quizData))
    }
  }, [quizData, currentStep])

  useEffect(() => {
    // Load saved quiz data
    const saved = localStorage.getItem("fitnessQuizData")
    if (saved) {
      setQuizData(JSON.parse(saved))
    }
  }, [])

  const handleQuizAnswer = (field: keyof QuizData, value: string) => {
    setQuizData((prev) => ({ ...prev, [field]: value }))

    // Auto-advance for multiple choice questions (steps 0-6, excluding manual input steps)
    if (quizStep <= 6) {
      setTimeout(() => {
        if (quizStep < totalQuizSteps - 1) {
          setQuizStep((prev) => prev + 1)
        } else {
          setCurrentStep("results")
        }
      }, 300)
    }
  }

  const generateWorkoutPlan = (): WorkoutDay[] => {
    const { goal, training, experience, frequency, duration } = quizData

    const daysPerWeek = Number.parseInt(frequency) || 3
    const isAdvanced = experience === "advanced"
    const isIntermediate = experience === "intermediate"
    const isBeginner = experience === "beginner"
    const hasGym = training === "gym"

    const workouts: WorkoutDay[] = []

    // Standard warm-up routines
    const generalWarmup = [
      "Light walking - 3 minutes",
      "Arm circles - 10 each direction",
      "Leg swings - 10 each leg",
      "Bodyweight squats - 10 reps",
      "Shoulder rolls - 10 each direction",
    ]

    const hiitWarmup = [
      "Light jogging in place - 2 minutes",
      "Jumping jacks - 20 reps",
      "High knees - 20 reps",
      "Butt kicks - 20 reps",
      "Arm swings - 10 each direction",
    ]

    const strengthWarmup = [
      "Light walking - 3 minutes",
      "Arm circles - 10 each direction",
      "Bodyweight squats - 10 reps",
      "Push-up to downward dog - 5 reps",
      "Hip circles - 10 each direction",
    ]

    // Push/Pull/Legs Split for Intermediate/Advanced
    if ((isIntermediate || isAdvanced) && goal === "build-muscle" && daysPerWeek >= 3) {
      if (daysPerWeek >= 6) {
        // 6-Day: Push/Pull/Legs/Rest/Push/Pull/Legs (2x per week each muscle group)
        workouts.push(
          {
            day: "Monday",
            type: "Push (Chest, Shoulders, Triceps)",
            duration: duration,
            warmup: strengthWarmup,
            exercises: hasGym
              ? [
                  "Bench Press - 4x6-8",
                  "Shoulder Press - 3x8-10",
                  "Incline Dumbbell Press - 3x8-10",
                  "Lateral Raises - 3x12-15",
                  "Tricep Dips - 3x10-12",
                  "Close-grip Bench Press - 3x8-10",
                ]
              : [
                  "Push-ups - 4x10-15",
                  "Pike Push-ups - 3x8-12",
                  "Incline Push-ups - 3x10-15",
                  "Arm Circles - 3x15-20",
                  "Tricep Dips - 3x10-15",
                  "Diamond Push-ups - 3x8-12",
                ],
            substitutes: hasGym
              ? ["Dumbbell Press instead of Barbell", "Machine Press alternatives", "Cable exercises"]
              : ["Wall Push-ups for beginners", "Knee Push-ups", "Chair Dips"],
          },
          {
            day: "Tuesday",
            type: "Pull (Back, Biceps)",
            duration: duration,
            warmup: strengthWarmup,
            exercises: hasGym
              ? [
                  "Pull-ups/Lat Pulldowns - 4x6-10",
                  "Bent-over Rows - 4x6-8",
                  "Cable Rows - 3x8-10",
                  "Face Pulls - 3x12-15",
                  "Barbell Curls - 3x8-12",
                  "Hammer Curls - 3x10-12",
                ]
              : [
                  "Pull-ups/Chin-ups - 4x5-10",
                  "Superman - 4x12-15",
                  "Reverse Flies - 3x12-15",
                  "Pike Walks - 3x8-10",
                  "Towel Curls - 3x10-15",
                  "Band Pull-aparts - 3x15-20",
                ],
            substitutes: hasGym
              ? ["Assisted Pull-ups", "Machine Rows", "Dumbbell alternatives"]
              : ["Assisted Pull-ups with band", "Modified Superman", "Wall Angels"],
          },
          {
            day: "Wednesday",
            type: "Legs (Quads, Hamstrings, Glutes, Calves)",
            duration: duration,
            warmup: strengthWarmup,
            exercises: hasGym
              ? [
                  "Squats - 4x6-8",
                  "Romanian Deadlifts - 4x6-8",
                  "Leg Press - 3x10-12",
                  "Walking Lunges - 3x12 each leg",
                  "Leg Curls - 3x10-12",
                  "Calf Raises - 4x15-20",
                ]
              : [
                  "Bodyweight Squats - 4x15-20",
                  "Single-leg Deadlifts - 4x8-10 each",
                  "Jump Squats - 3x10-15",
                  "Lunges - 3x12 each leg",
                  "Glute Bridges - 3x15-20",
                  "Calf Raises - 4x20-25",
                ],
            substitutes: hasGym
              ? ["Goblet Squats", "Stiff-leg Deadlifts", "Bulgarian Split Squats"]
              : ["Wall Sit", "Step-ups", "Single-leg Glute Bridges"],
          },
          {
            day: "Thursday",
            type: "REST DAY",
            duration: "Active Recovery",
            warmup: ["Light walking - 10 minutes", "Gentle stretching - 10 minutes"],
            exercises: [
              "Light walking - 20-30 minutes",
              "Gentle yoga or stretching - 15 minutes",
              "Foam rolling - 10 minutes",
              "Hydration and nutrition focus",
            ],
            substitutes: ["Complete rest if needed", "Light mobility work", "Meditation"],
          },
          {
            day: "Friday",
            type: "Push (Chest, Shoulders, Triceps)",
            duration: duration,
            warmup: strengthWarmup,
            exercises: hasGym
              ? [
                  "Incline Barbell Press - 4x6-8",
                  "Dumbbell Shoulder Press - 3x8-10",
                  "Decline Press - 3x8-10",
                  "Cable Lateral Raises - 3x12-15",
                  "Overhead Tricep Extension - 3x10-12",
                  "Tricep Pushdowns - 3x10-12",
                ]
              : [
                  "Incline Push-ups - 4x10-15",
                  "Handstand Progression - 3x30-60sec",
                  "Decline Push-ups - 3x8-12",
                  "Pike Push-ups - 3x8-12",
                  "Tricep Dips - 3x12-15",
                  "Diamond Push-ups - 3x10-12",
                ],
            substitutes: hasGym
              ? ["Dumbbell alternatives", "Machine variations", "Bodyweight options"]
              : ["Regular Push-ups", "Wall Handstand", "Chair Dips"],
          },
          {
            day: "Saturday",
            type: "Pull (Back, Biceps)",
            duration: duration,
            warmup: strengthWarmup,
            exercises: hasGym
              ? [
                  "Deadlifts - 4x5-6",
                  "T-Bar Rows - 4x6-8",
                  "Wide-grip Pulldowns - 3x8-10",
                  "Shrugs - 3x10-12",
                  "Preacher Curls - 3x8-12",
                  "Cable Curls - 3x10-12",
                ]
              : [
                  "Single-leg Deadlifts - 4x6-8 each",
                  "Wide-grip Pull-ups - 4x5-8",
                  "Reverse Flies - 3x12-15",
                  "Superman - 3x12-15",
                  "Chin-ups - 3x5-10",
                  "Towel Curls - 3x12-15",
                ],
            substitutes: hasGym
              ? ["Romanian Deadlifts", "Cable Rows", "Machine alternatives"]
              : ["Regular Deadlift motion", "Assisted Pull-ups", "Band exercises"],
          },
        )
      } else if (daysPerWeek >= 4) {
        // 4-Day: Push/Pull/Legs/Rest cycle (each muscle group 1-2x per week)
        workouts.push(
          {
            day: "Monday",
            type: "Push (Chest, Shoulders, Triceps)",
            duration: duration,
            warmup: strengthWarmup,
            exercises: hasGym
              ? [
                  "Bench Press - 4x6-8",
                  "Shoulder Press - 4x6-8",
                  "Incline Dumbbell Press - 3x8-10",
                  "Lateral Raises - 3x12-15",
                  "Close-grip Bench Press - 3x8-10",
                  "Tricep Dips - 3x10-12",
                ]
              : [
                  "Push-ups - 4x12-15",
                  "Pike Push-ups - 4x8-12",
                  "Incline Push-ups - 3x10-15",
                  "Arm Circles - 3x15-20",
                  "Diamond Push-ups - 3x8-12",
                  "Tricep Dips - 3x12-15",
                ],
            substitutes: hasGym
              ? ["Dumbbell Press", "Machine alternatives", "Cable exercises"]
              : ["Wall Push-ups", "Knee Push-ups", "Chair Dips"],
          },
          {
            day: "Tuesday",
            type: "Pull (Back, Biceps)",
            duration: duration,
            warmup: strengthWarmup,
            exercises: hasGym
              ? [
                  "Pull-ups/Lat Pulldowns - 4x6-10",
                  "Bent-over Rows - 4x6-8",
                  "Cable Rows - 3x8-10",
                  "Face Pulls - 3x12-15",
                  "Barbell Curls - 3x8-12",
                  "Hammer Curls - 3x10-12",
                ]
              : [
                  "Pull-ups/Chin-ups - 4x5-10",
                  "Superman - 4x12-15",
                  "Reverse Flies - 3x12-15",
                  "Pike Walks - 3x8-10",
                  "Towel Curls - 3x10-15",
                  "Band Pull-aparts - 3x15-20",
                ],
            substitutes: hasGym
              ? ["Assisted Pull-ups", "Machine Rows", "Dumbbell alternatives"]
              : ["Assisted Pull-ups", "Modified Superman", "Wall Angels"],
          },
          {
            day: "Wednesday",
            type: "Legs (Quads, Hamstrings, Glutes, Calves)",
            duration: duration,
            warmup: strengthWarmup,
            exercises: hasGym
              ? [
                  "Squats - 4x6-8",
                  "Romanian Deadlifts - 4x6-8",
                  "Leg Press - 3x10-12",
                  "Walking Lunges - 3x12 each leg",
                  "Leg Curls - 3x10-12",
                  "Calf Raises - 4x15-20",
                ]
              : [
                  "Bodyweight Squats - 4x15-20",
                  "Single-leg Deadlifts - 4x8-10 each",
                  "Jump Squats - 3x10-15",
                  "Lunges - 3x12 each leg",
                  "Glute Bridges - 3x15-20",
                  "Calf Raises - 4x20-25",
                ],
            substitutes: hasGym
              ? ["Goblet Squats", "Stiff-leg Deadlifts", "Bulgarian Split Squats"]
              : ["Wall Sit", "Step-ups", "Single-leg Glute Bridges"],
          },
          {
            day: "Thursday",
            type: "REST DAY",
            duration: "Active Recovery",
            warmup: ["Light walking - 10 minutes", "Gentle stretching - 10 minutes"],
            exercises: [
              "Light walking - 20-30 minutes",
              "Gentle yoga or stretching - 15 minutes",
              "Foam rolling - 10 minutes",
              "Hydration and nutrition focus",
            ],
            substitutes: ["Complete rest if needed", "Light mobility work", "Meditation"],
          },
        )
      } else {
        // 3-Day: Push/Pull/Legs with rest between (each muscle group 1x per week)
        workouts.push(
          {
            day: "Monday",
            type: "Push (Chest, Shoulders, Triceps)",
            duration: duration,
            warmup: strengthWarmup,
            exercises: hasGym
              ? [
                  "Bench Press - 4x6-8",
                  "Shoulder Press - 4x6-8",
                  "Incline Dumbbell Press - 3x8-10",
                  "Lateral Raises - 3x12-15",
                  "Close-grip Bench Press - 3x8-10",
                  "Tricep Dips - 3x10-12",
                ]
              : [
                  "Push-ups - 4x12-15",
                  "Pike Push-ups - 4x8-12",
                  "Incline Push-ups - 3x10-15",
                  "Arm Circles - 3x15-20",
                  "Diamond Push-ups - 3x8-12",
                  "Tricep Dips - 3x12-15",
                ],
            substitutes: hasGym
              ? ["Dumbbell Press", "Machine alternatives", "Cable exercises"]
              : ["Wall Push-ups", "Knee Push-ups", "Chair Dips"],
          },
          {
            day: "Wednesday",
            type: "Pull (Back, Biceps)",
            duration: duration,
            warmup: strengthWarmup,
            exercises: hasGym
              ? [
                  "Pull-ups/Lat Pulldowns - 4x6-10",
                  "Bent-over Rows - 4x6-8",
                  "Cable Rows - 3x8-10",
                  "Face Pulls - 3x12-15",
                  "Barbell Curls - 3x8-12",
                  "Hammer Curls - 3x10-12",
                ]
              : [
                  "Pull-ups/Chin-ups - 4x5-10",
                  "Superman - 4x12-15",
                  "Reverse Flies - 3x12-15",
                  "Pike Walks - 3x8-10",
                  "Towel Curls - 3x10-15",
                  "Band Pull-aparts - 3x15-20",
                ],
            substitutes: hasGym
              ? ["Assisted Pull-ups", "Machine Rows", "Dumbbell alternatives"]
              : ["Assisted Pull-ups", "Modified Superman", "Wall Angels"],
          },
          {
            day: "Friday",
            type: "Legs (Quads, Hamstrings, Glutes, Calves)",
            duration: duration,
            warmup: strengthWarmup,
            exercises: hasGym
              ? [
                  "Squats - 4x6-8",
                  "Romanian Deadlifts - 4x6-8",
                  "Leg Press - 3x10-12",
                  "Walking Lunges - 3x12 each leg",
                  "Leg Curls - 3x10-12",
                  "Calf Raises - 4x15-20",
                ]
              : [
                  "Bodyweight Squats - 4x15-20",
                  "Single-leg Deadlifts - 4x8-10 each",
                  "Jump Squats - 3x10-15",
                  "Lunges - 3x12 each leg",
                  "Glute Bridges - 3x15-20",
                  "Calf Raises - 4x20-25",
                ],
            substitutes: hasGym
              ? ["Goblet Squats", "Stiff-leg Deadlifts", "Bulgarian Split Squats"]
              : ["Wall Sit", "Step-ups", "Single-leg Glute Bridges"],
          },
        )
      }
    } else if (goal === "lose-fat") {
      // Fat Loss Programs
      if (daysPerWeek >= 5) {
        workouts.push(
          {
            day: "Monday",
            type: "Full Body HIIT",
            duration: duration,
            warmup: hiitWarmup,
            exercises: hasGym
              ? [
                  "Treadmill Intervals - 20 min",
                  "Kettlebell Swings - 3x15",
                  "Burpees - 3x10",
                  "Mountain Climbers - 3x20",
                ]
              : ["Jumping Jacks - 3x30", "Burpees - 3x8", "High Knees - 3x20", "Push-ups - 3x10"],
            substitutes: hasGym
              ? [
                  "Bike Intervals instead of Treadmill",
                  "Dumbbell Swings instead of Kettlebell",
                  "Step-ups instead of Burpees",
                ]
              : [
                  "Marching in place instead of Jumping Jacks",
                  "Modified Burpees (no jump)",
                  "Wall Push-ups instead of regular",
                ],
          },
          {
            day: "Tuesday",
            type: "Upper Body Strength",
            duration: duration,
            warmup: strengthWarmup,
            exercises: hasGym
              ? ["Bench Press - 3x8", "Pull-ups - 3xMax", "Shoulder Press - 3x10", "Rows - 3x12"]
              : ["Push-ups - 3x12", "Pike Push-ups - 3x10", "Tricep Dips - 3x15", "Superman - 3x15"],
            substitutes: hasGym
              ? ["Dumbbell Press instead of Bench", "Assisted Pull-ups", "Dumbbell Shoulder Press"]
              : ["Wall Push-ups", "Wall Handstand instead of Pike Push-ups", "Chair Dips"],
          },
          {
            day: "Wednesday",
            type: "Cardio + Core",
            duration: duration,
            warmup: generalWarmup,
            exercises: hasGym
              ? ["Bike Intervals - 15 min", "Plank Variations - 3x30 sec", "Russian Twists - 3x20", "Leg Raises - 3x15"]
              : ["Jump Rope - 3x1 min", "Plank Hold - 3x30 sec", "Bicycle Crunches - 3x20", "Wall Sit - 3x30 sec"],
            substitutes: hasGym
              ? ["Walking instead of Bike", "Modified Plank on knees", "Crunches instead of Russian Twists"]
              : ["Marching in place instead of Jump Rope", "Modified Plank on knees", "Regular Crunches"],
          },
          {
            day: "Thursday",
            type: "Lower Body Strength",
            duration: duration,
            warmup: strengthWarmup,
            exercises: hasGym
              ? ["Squats - 3x12", "Deadlifts - 1x5", "Lunges - 3x10", "Calf Raises - 3x15"]
              : ["Squats - 3x15", "Single-leg Deadlifts - 3x10", "Lunges - 3x12", "Glute Bridges - 3x15"],
            substitutes: hasGym
              ? ["Goblet Squats", "Romanian Deadlifts", "Step-ups instead of Lunges"]
              : ["Wall Sit instead of Squats", "Regular Deadlift motion", "Step-ups"],
          },
          {
            day: "Friday",
            type: "Full Body Circuit",
            duration: duration,
            warmup: hiitWarmup,
            exercises: hasGym
              ? ["Clean & Press - 3x8", "Thrusters - 3x10", "Pull-ups - 3xMax", "Squats - 3x12"]
              : ["Burpees - 3x10", "Push-ups - 3x12", "Jump Squats - 3x15", "Plank - 3x30 sec"],
            substitutes: hasGym
              ? ["Dumbbell Clean & Press", "Dumbbell Thrusters", "Assisted Pull-ups"]
              : ["Modified Burpees", "Wall Push-ups", "Regular Squats instead of Jump"],
          },
        )
      } else if (daysPerWeek === 4) {
        workouts.push(
          {
            day: "Monday",
            type: "Full Body HIIT",
            duration: duration,
            warmup: hiitWarmup,
            exercises: hasGym
              ? [
                  "Treadmill Intervals - 20 min",
                  "Kettlebell Swings - 3x15",
                  "Burpees - 3x10",
                  "Mountain Climbers - 3x20",
                ]
              : ["Jumping Jacks - 3x30", "Burpees - 3x8", "High Knees - 3x20", "Push-ups - 3x10"],
            substitutes: hasGym
              ? ["Bike Intervals", "Dumbbell Swings", "Step-ups instead of Burpees"]
              : ["Marching in place", "Modified Burpees", "Wall Push-ups"],
          },
          {
            day: "Tuesday",
            type: "Upper Body",
            duration: duration,
            warmup: strengthWarmup,
            exercises: hasGym
              ? ["Bench Press - 3x8", "Pull-ups - 3xMax", "Shoulder Press - 3x10", "Rows - 3x12"]
              : ["Push-ups - 3x12", "Pike Push-ups - 3x10", "Tricep Dips - 3x15", "Superman - 3x15"],
            substitutes: hasGym
              ? ["Dumbbell Press", "Assisted Pull-ups", "Dumbbell Shoulder Press"]
              : ["Wall Push-ups", "Wall Handstand", "Chair Dips"],
          },
          {
            day: "Thursday",
            type: "Lower Body",
            duration: duration,
            warmup: strengthWarmup,
            exercises: hasGym
              ? ["Squats - 3x12", "Deadlifts - 1x5", "Lunges - 3x10", "Calf Raises - 3x15"]
              : ["Squats - 3x15", "Single-leg Deadlifts - 3x10", "Lunges - 3x12", "Glute Bridges - 3x15"],
            substitutes: hasGym
              ? ["Goblet Squats", "Romanian Deadlifts", "Step-ups"]
              : ["Wall Sit", "Regular Deadlift motion", "Step-ups"],
          },
          {
            day: "Friday",
            type: "Cardio + Core",
            duration: duration,
            warmup: generalWarmup,
            exercises: hasGym
              ? ["Bike Intervals - 15 min", "Plank Variations - 3x30 sec", "Russian Twists - 3x20", "Leg Raises - 3x15"]
              : ["Jump Rope - 3x1 min", "Plank Hold - 3x30 sec", "Bicycle Crunches - 3x20", "Wall Sit - 3x30 sec"],
            substitutes: hasGym
              ? ["Walking", "Modified Plank on knees", "Regular Crunches"]
              : ["Marching in place", "Modified Plank on knees", "Regular Crunches"],
          },
        )
      } else if (daysPerWeek === 2) {
        workouts.push(
          {
            day: "Monday",
            type: "Full Body HIIT",
            duration: duration,
            warmup: hiitWarmup,
            exercises: hasGym
              ? [
                  "Treadmill Intervals - 20 min",
                  "Kettlebell Swings - 3x15",
                  "Burpees - 3x10",
                  "Mountain Climbers - 3x20",
                  "Squats - 3x12",
                  "Push-ups - 3x12",
                ]
              : [
                  "Jumping Jacks - 3x30",
                  "Burpees - 3x8",
                  "High Knees - 3x20",
                  "Push-ups - 3x10",
                  "Squats - 3x15",
                  "Lunges - 3x12",
                ],
            substitutes: hasGym
              ? ["Bike Intervals", "Dumbbell Swings", "Step-ups", "Goblet Squats", "Wall Push-ups"]
              : ["Marching in place", "Modified Burpees", "Wall Push-ups", "Wall Sit", "Step-ups"],
          },
          {
            day: "Thursday",
            type: "Strength + Cardio",
            duration: duration,
            warmup: strengthWarmup,
            exercises: hasGym
              ? [
                  "Deadlifts - 1x5",
                  "Rows - 3x12",
                  "Bike Intervals - 15 min",
                  "Plank Variations - 3x30 sec",
                  "Russian Twists - 3x20",
                ]
              : [
                  "Bodyweight Squats - 3x15",
                  "Push-ups - 3x12",
                  "Jump Rope - 3x1 min",
                  "Plank Hold - 3x30 sec",
                  "Bicycle Crunches - 3x20",
                ],
            substitutes: hasGym
              ? ["Romanian Deadlifts", "One-arm Rows", "Walking", "Modified Plank", "Regular Crunches"]
              : ["Wall Sit", "Wall Push-ups", "Marching in place", "Modified Plank", "Regular Crunches"],
          },
        )
      } else {
        // 3 days default
        workouts.push(
          {
            day: "Monday",
            type: "Full Body HIIT",
            duration: duration,
            warmup: hiitWarmup,
            exercises: hasGym
              ? [
                  "Treadmill Intervals - 20 min",
                  "Kettlebell Swings - 3x15",
                  "Burpees - 3x10",
                  "Mountain Climbers - 3x20",
                ]
              : ["Jumping Jacks - 3x30", "Burpees - 3x8", "High Knees - 3x20", "Push-ups - 3x10"],
            substitutes: hasGym
              ? ["Bike Intervals", "Dumbbell Swings", "Step-ups"]
              : ["Marching in place", "Modified Burpees", "Wall Push-ups"],
          },
          {
            day: "Wednesday",
            type: "Strength Circuit",
            duration: duration,
            warmup: strengthWarmup,
            exercises: hasGym
              ? ["Squats - 3x12", "Deadlifts - 1x5", "Push-ups - 3x12", "Rows - 3x12"]
              : ["Bodyweight Squats - 3x15", "Push-ups - 3x12", "Lunges - 3x12", "Plank - 3x30 sec"],
            substitutes: hasGym
              ? ["Goblet Squats", "Romanian Deadlifts", "Wall Push-ups", "One-arm Rows"]
              : ["Wall Sit", "Wall Push-ups", "Step-ups", "Modified Plank"],
          },
          {
            day: "Friday",
            type: "Cardio + Core",
            duration: duration,
            warmup: generalWarmup,
            exercises: hasGym
              ? ["Bike Intervals - 15 min", "Plank Variations - 3x30 sec", "Russian Twists - 3x20", "Leg Raises - 3x15"]
              : ["Jump Rope - 3x1 min", "Plank Hold - 3x30 sec", "Bicycle Crunches - 3x20", "Wall Sit - 3x30 sec"],
            substitutes: hasGym
              ? ["Walking", "Modified Plank", "Regular Crunches", "Knee Raises"]
              : ["Marching in place", "Modified Plank", "Regular Crunches", "Standing Knee Raises"],
          },
        )
      }
    } else {
      // General health - simpler approach
      const gentleWarmup = [
        "Gentle walking - 5 minutes",
        "Arm circles - 5 each direction",
        "Neck rolls - 5 each direction",
        "Gentle stretching - 5 minutes",
      ]

      if (daysPerWeek >= 5) {
        workouts.push(
          {
            day: "Monday",
            type: "Total Body",
            duration: duration,
            warmup: gentleWarmup,
            exercises: ["Walking - 30 min", "Light Bodyweight - 3x10", "Stretching - 10 min", "Balance Work - 5 min"],
            substitutes: ["Chair exercises instead of standing", "Seated stretching", "Wall-supported balance work"],
          },
          {
            day: "Tuesday",
            type: "Cardio Flow",
            duration: duration,
            warmup: gentleWarmup,
            exercises: [
              "Walking - 30 min",
              "Stretching - 10 min",
              "Light Movement - 15 min",
              "Breathing Exercises - 5 min",
            ],
            substitutes: ["Seated marching instead of walking", "Chair stretches", "Seated breathing exercises"],
          },
          {
            day: "Wednesday",
            type: "Strength & Mobility",
            duration: duration,
            warmup: gentleWarmup,
            exercises: hasGym
              ? ["Light Weights - 3x10", "Stretching - 10 min", "Balance Work - 5 min", "Core - 10 min"]
              : ["Bodyweight - 3x10", "Yoga Flow - 20 min", "Balance - 5 min", "Gentle Core - 10 min"],
            substitutes: hasGym
              ? ["Resistance bands instead of weights", "Chair stretches", "Wall-supported balance"]
              : ["Chair exercises", "Seated yoga", "Wall-supported balance"],
          },
          {
            day: "Thursday",
            type: "Active Recovery",
            duration: duration,
            warmup: gentleWarmup,
            exercises: [
              "Gentle Walking - 30 min",
              "Stretching - 15 min",
              "Meditation - 10 min",
              "Light Movement - 15 min",
            ],
            substitutes: ["Seated movement", "Chair stretches", "Guided meditation", "Gentle arm movements"],
          },
          {
            day: "Friday",
            type: "Fun Movement",
            duration: duration,
            warmup: gentleWarmup,
            exercises: ["Dancing - 30 min", "Swimming - 30 min", "Hiking - 45 min", "Sports - 45 min"],
            substitutes: ["Chair dancing", "Water walking", "Nature walks", "Gentle games"],
          },
        )
      } else if (daysPerWeek === 4) {
        workouts.push(
          {
            day: "Monday",
            type: "Total Body",
            duration: duration,
            warmup: gentleWarmup,
            exercises: hasGym
              ? ["Light Squats - 3x10", "Push-ups - 3x8", "Rows - 3x10", "Plank - 3x30 sec"]
              : ["Bodyweight Squats - 3x12", "Wall Push-ups - 3x10", "Lunges - 3x10", "Modified Plank - 3x30 sec"],
            substitutes: hasGym
              ? ["Chair squats", "Wall push-ups", "Resistance band rows", "Wall plank"]
              : ["Chair squats", "Wall push-ups", "Step-ups", "Wall plank"],
          },
          {
            day: "Tuesday",
            type: "Cardio Flow",
            duration: duration,
            warmup: gentleWarmup,
            exercises: [
              "Walking - 30 min",
              "Stretching - 10 min",
              "Light Bodyweight - 3x10",
              "Breathing Exercises - 5 min",
            ],
            substitutes: ["Seated marching", "Chair stretches", "Chair exercises", "Seated breathing"],
          },
          {
            day: "Thursday",
            type: "Strength & Mobility",
            duration: duration,
            warmup: gentleWarmup,
            exercises: hasGym
              ? ["Light Weights - 3x10", "Stretching - 10 min", "Balance Work - 5 min", "Core - 10 min"]
              : ["Bodyweight - 3x10", "Yoga Flow - 20 min", "Balance - 5 min", "Gentle Core - 10 min"],
            substitutes: hasGym
              ? ["Resistance bands", "Chair stretches", "Wall-supported balance", "Seated core work"]
              : ["Chair exercises", "Seated yoga", "Wall-supported balance", "Seated core work"],
          },
          {
            day: "Friday",
            type: "Active Fun",
            duration: duration,
            warmup: gentleWarmup,
            exercises: ["Dancing - 30 min", "Swimming - 30 min", "Hiking - 45 min", "Light Sports - 45 min"],
            substitutes: ["Chair dancing", "Water walking", "Nature walks", "Gentle games"],
          },
        )
      } else if (daysPerWeek === 2) {
        workouts.push(
          {
            day: "Monday",
            type: "Total Body Gentle",
            duration: duration,
            warmup: gentleWarmup,
            exercises: hasGym
              ? [
                  "Light Squats - 3x10",
                  "Push-ups - 3x8",
                  "Rows - 3x10",
                  "Plank - 3x30 sec",
                  "Walking - 20 min",
                  "Stretching - 10 min",
                ]
              : [
                  "Bodyweight Squats - 3x12",
                  "Wall Push-ups - 3x10",
                  "Lunges - 3x10",
                  "Modified Plank - 3x30 sec",
                  "Walking - 20 min",
                  "Stretching - 10 min",
                ],
            substitutes: hasGym
              ? [
                  "Chair squats",
                  "Wall push-ups",
                  "Resistance bands",
                  "Wall plank",
                  "Seated marching",
                  "Chair stretches",
                ]
              : ["Chair squats", "Wall push-ups", "Step-ups", "Wall plank", "Seated marching", "Chair stretches"],
          },
          {
            day: "Thursday",
            type: "Cardio & Mobility",
            duration: duration,
            warmup: gentleWarmup,
            exercises: [
              "Walking - 30 min",
              "Stretching - 10 min",
              "Light Movement - 15 min",
              "Breathing Exercises - 5 min",
              "Balance Work - 5 min",
              "Yoga Flow - 20 min",
            ],
            substitutes: [
              "Seated marching",
              "Chair stretches",
              "Seated movements",
              "Seated breathing",
              "Wall-supported balance",
              "Seated yoga",
            ],
          },
        )
      } else {
        // 3 days default
        workouts.push(
          {
            day: "Monday",
            type: "Total Body",
            duration: duration,
            warmup: gentleWarmup,
            exercises: hasGym
              ? ["Squats - 3x10", "Push-ups - 3x8", "Rows - 3x10", "Plank - 3x30 sec"]
              : ["Bodyweight Squats - 3x12", "Wall Push-ups - 3x10", "Lunges - 3x10", "Modified Plank - 3x30 sec"],
            substitutes: hasGym
              ? ["Chair squats", "Wall push-ups", "Resistance bands", "Wall plank"]
              : ["Chair squats", "Wall push-ups", "Step-ups", "Wall plank"],
          },
          {
            day: "Wednesday",
            type: "Cardio Flow",
            duration: duration,
            warmup: gentleWarmup,
            exercises: [
              "Walking - 30 min",
              "Stretching - 10 min",
              "Light Bodyweight - 3x10",
              "Breathing Exercises - 5 min",
            ],
            substitutes: ["Seated marching", "Chair stretches", "Chair exercises", "Seated breathing"],
          },
          {
            day: "Friday",
            type: "Strength & Mobility",
            duration: duration,
            warmup: gentleWarmup,
            exercises: hasGym
              ? ["Light Weights - 3x10", "Stretching - 10 min", "Balance Work - 5 min", "Core - 10 min"]
              : ["Bodyweight - 3x10", "Yoga Flow - 20 min", "Balance - 5 min", "Gentle Core - 10 min"],
            substitutes: hasGym
              ? ["Resistance bands", "Chair stretches", "Wall-supported balance", "Seated core work"]
              : ["Chair exercises", "Seated yoga", "Wall-supported balance", "Seated core work"],
          },
        )
      }
    }

    return workouts
  }

  const generateMealPlan = (): { meals: MealPlan[]; totalCalories: number } => {
    const { goal, diet, weight, age } = quizData

    // Ensure we have valid weight, default to 150 if not provided or invalid
    let weightNum = Number.parseInt(weight) || 150
    if (weightNum < 80) weightNum = 150 // Minimum reasonable weight
    if (weightNum > 400) weightNum = 200 // Maximum reasonable weight

    // Age-based calorie adjustment using age ranges
    let ageMultiplier = 1
    if (age === "under-18" || age === "18-24") {
      ageMultiplier = 1.15 // Higher metabolism for younger people
    } else if (age === "25-35") {
      ageMultiplier = 1.05 // Slightly higher for young adults
    } else if (age === "36-50") {
      ageMultiplier = 1.0 // Baseline
    } else if (age === "50+") {
      ageMultiplier = 0.95 // Slightly lower metabolism for older people
    }

    // More consistent calorie calculation
    let baseCalories = 0
    if (goal === "lose-fat") {
      baseCalories = Math.round((weightNum * 12 + 200) * ageMultiplier) // Added base 200 calories
    } else if (goal === "build-muscle") {
      baseCalories = Math.round((weightNum * 16 + 300) * ageMultiplier) // Added base 300 calories
    } else {
      baseCalories = Math.round((weightNum * 14 + 250) * ageMultiplier) // Added base 250 calories
    }

    // Ensure minimum calories
    if (baseCalories < 1200) baseCalories = 1200
    if (baseCalories > 3500) baseCalories = 3500

    const meals: MealPlan[] = [
      {
        meal: "Breakfast",
        calories: Math.round(baseCalories * 0.25),
        foods: getAgeTailoredFoods("breakfast", diet, age),
      },
      {
        meal: "Lunch",
        calories: Math.round(baseCalories * 0.35),
        foods: getAgeTailoredFoods("lunch", diet, age),
      },
      {
        meal: "Dinner",
        calories: Math.round(baseCalories * 0.3),
        foods: getAgeTailoredFoods("dinner", diet, age),
      },
      {
        meal: "Snack",
        calories: Math.round(baseCalories * 0.1),
        foods: getAgeTailoredFoods("snack", diet, age),
      },
    ]

    const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)

    return { meals, totalCalories }
  }

  const getAgeTailoredFoods = (mealType: string, diet: string, ageRange: string): string[] => {
    const isYoung = ageRange === "under-18" || ageRange === "18-24"
    const isMiddleAge = ageRange === "25-35" || ageRange === "36-50"
    const isOlder = ageRange === "50+"

    if (mealType === "breakfast") {
      if (diet === "vegan") {
        if (isYoung) return ["Oatmeal with berries", "Almond butter", "Plant protein powder", "Banana"]
        if (isOlder) return ["Steel-cut oats", "Walnuts", "Plant milk", "Blueberries", "Chia seeds"]
        return ["Oatmeal with berries", "Almond butter", "Plant milk"]
      } else if (diet === "keto") {
        if (isYoung) return ["Eggs with avocado", "Bacon", "Spinach", "Cheese"]
        if (isOlder) return ["Eggs with avocado", "Smoked salmon", "Spinach", "Olive oil"]
        return ["Eggs with avocado", "Bacon", "Spinach"]
      } else {
        if (isYoung) return ["Greek yogurt", "Berries", "Granola", "Protein powder"]
        if (isOlder) return ["Greek yogurt", "Berries", "Nuts", "Fiber cereal"]
        return ["Greek yogurt", "Berries", "Granola"]
      }
    } else if (mealType === "lunch") {
      if (diet === "vegan") {
        if (isYoung) return ["Quinoa bowl", "Chickpeas", "Vegetables", "Tahini dressing"]
        if (isOlder) return ["Lentil soup", "Mixed greens", "Quinoa", "Olive oil"]
        return ["Quinoa bowl", "Chickpeas", "Vegetables"]
      } else if (diet === "keto") {
        if (isYoung) return ["Chicken salad", "Avocado", "Olive oil", "Nuts"]
        if (isOlder) return ["Salmon salad", "Avocado", "Olive oil", "Leafy greens"]
        return ["Chicken salad", "Avocado", "Olive oil"]
      } else {
        if (isYoung) return ["Grilled chicken", "Sweet potato", "Broccoli", "Brown rice"]
        if (isOlder) return ["Lean fish", "Quinoa", "Steamed vegetables", "Olive oil"]
        return ["Grilled chicken", "Sweet potato", "Broccoli"]
      }
    } else if (mealType === "dinner") {
      if (diet === "vegan") {
        if (isYoung) return ["Lentil curry", "Brown rice", "Vegetables", "Coconut milk"]
        if (isOlder) return ["Tofu stir-fry", "Quinoa", "Mixed vegetables", "Ginger"]
        return ["Lentil curry", "Brown rice", "Vegetables"]
      } else if (diet === "keto") {
        if (isYoung) return ["Salmon", "Asparagus", "Butter", "Cauliflower rice"]
        if (isOlder) return ["Cod", "Zucchini", "Olive oil", "Herbs"]
        return ["Salmon", "Asparagus", "Butter"]
      } else {
        if (isYoung) return ["Lean protein", "Quinoa", "Green vegetables", "Sweet potato"]
        if (isOlder) return ["Fish", "Brown rice", "Steamed vegetables", "Herbs"]
        return ["Lean protein", "Quinoa", "Green vegetables"]
      }
    } else {
      // snack
      if (diet === "vegan") {
        if (isYoung) return ["Apple with almond butter", "Protein smoothie"]
        if (isOlder) return ["Nuts and seeds", "Herbal tea"]
        return ["Apple with almond butter"]
      } else if (diet === "keto") {
        if (isYoung) return ["Nuts and cheese", "Hard-boiled egg"]
        if (isOlder) return ["Avocado", "Herbal tea"]
        return ["Nuts and cheese"]
      } else {
        if (isYoung) return ["Greek yogurt with fruit", "Protein bar"]
        if (isOlder) return ["Greek yogurt", "Berries"]
        return ["Greek yogurt with fruit"]
      }
    }
  }

  const generateGroceryList = (): string[] => {
    const { diet, age } = quizData
    const isOlder = age === "50+"

    if (diet === "vegan") {
      const baseList = [
        "Oats",
        "Berries",
        "Almond butter",
        "Plant milk",
        "Quinoa",
        "Chickpeas",
        "Mixed vegetables",
        "Lentils",
        "Brown rice",
        "Apples",
        "Nuts",
      ]
      if (isOlder) {
        return [...baseList, "Chia seeds", "Walnuts", "Ginger", "Turmeric", "Leafy greens"]
      }
      return baseList
    } else if (diet === "keto") {
      const baseList = [
        "Eggs",
        "Avocados",
        "Bacon",
        "Spinach",
        "Chicken breast",
        "Olive oil",
        "Salmon",
        "Asparagus",
        "Butter",
        "Cheese",
        "Nuts",
      ]
      if (isOlder) {
        return [...baseList, "Smoked salmon", "Cod", "Zucchini", "Herbs", "Cauliflower"]
      }
      return baseList
    } else {
      const baseList = [
        "Greek yogurt",
        "Berries",
        "Granola",
        "Chicken breast",
        "Sweet potatoes",
        "Broccoli",
        "Quinoa",
        "Green vegetables",
        "Lean fish",
        "Fruits",
      ]
      if (isOlder) {
        return [...baseList, "Brown rice", "Herbs", "Olive oil", "Fiber cereal", "Nuts"]
      }
      return baseList
    }
  }

  const downloadPDF = () => {
    const workoutPlan = generateWorkoutPlan()
    const { meals: mealPlan, totalCalories } = generateMealPlan()
    const groceryList = generateGroceryList()

    // Create PDF content
    const pdfContent = `
FITPLAN - YOUR PERSONALIZED FITNESS & NUTRITION PLAN
Generated for: ${quizData.name}
Date: ${new Date().toLocaleDateString()}

=== PERSONAL DETAILS ===
Name: ${quizData.name}
Age: ${quizData.age}
Weight: ${quizData.weight} lbs
Height: ${quizData.height} inches
Goal: ${quizData.goal.replace("-", " ").toUpperCase()}
Experience: ${quizData.experience.toUpperCase()}
Training Access: ${quizData.training.replace("-", " ").toUpperCase()}

=== WORKOUT PLAN ===
Frequency: ${workoutPlan.length} days per week
Duration: ${quizData.duration} per session

${workoutPlan
  .map(
    (day, index) => `
DAY ${index + 1}: ${day.day.toUpperCase()}
Type: ${day.type}
Duration: ${day.duration}

WARM-UP (5-10 minutes):
${day.warmup.map((exercise) => `• ${exercise}`).join("\n")}

MAIN WORKOUT:
${day.exercises.map((exercise) => `• ${exercise}`).join("\n")}

EXERCISE SUBSTITUTES (if needed):
${day.substitutes ? day.substitutes.map((sub) => `• ${sub}`).join("\n") : "• Adjust weight/reps as needed"}
`,
  )
  .join("\n")}

=== NUTRITION PLAN ===
Total Daily Calories: ${totalCalories}
Dietary Preference: ${quizData.diet === "none" ? "No restrictions" : quizData.diet.toUpperCase()}

${mealPlan
  .map(
    (meal) => `
${meal.meal.toUpperCase()}: ${meal.calories} calories
${meal.foods.map((food) => `• ${food}`).join("\n")}
`,
  )
  .join("\n")}

=== GROCERY LIST ===
${groceryList.map((item) => `• ${item}`).join("\n")}

=== EXERCISE MODIFICATIONS ===
• If an exercise is too difficult, try the substitute version
• Start with easier variations and progress gradually
• Listen to your body and rest when needed
• Focus on proper form over speed or weight

=== NEXT STEPS ===
1. Follow this plan consistently for 4-6 weeks
2. Track your progress weekly
3. Adjust portions based on your results
4. Stay hydrated (8-10 glasses of water daily)
5. Get 7-9 hours of sleep per night
6. Always complete the warm-up before starting your workout

For personalized coaching and support, book a free strategy call!

© FitPlan - Your Fitness Journey Starts Here
  `

    // Create and download the file
    const blob = new Blob([pdfContent], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `FitPlan_${quizData.name}_${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const quizQuestions = [
    {
      question: "What's your primary fitness goal?",
      options: [
        { value: "lose-fat", label: "Lose Fat", icon: Zap },
        { value: "build-muscle", label: "Build Muscle", icon: Dumbbell },
        { value: "get-toned", label: "Get Toned", icon: Sparkles },
        { value: "general-health", label: "General Health", icon: Activity },
      ],
    },
    {
      question: "What training access do you have?",
      options: [
        { value: "gym", label: "Full Gym Access", icon: Dumbbell },
        { value: "home-equipment", label: "Home with Equipment", icon: Home },
        { value: "bodyweight", label: "Bodyweight Only", icon: Users },
      ],
    },
    {
      question: "What's your experience level?",
      options: [
        { value: "beginner", label: "Beginner", icon: Target },
        { value: "intermediate", label: "Intermediate", icon: TrendingUp },
        { value: "advanced", label: "Advanced", icon: Rocket },
      ],
    },
    {
      question: "How many days can you train?",
      options: [
        { value: "2", label: "2 Days", icon: Calendar },
        { value: "3", label: "3 Days", icon: Calendar },
        { value: "4", label: "4 Days", icon: Calendar },
        { value: "5", label: "5+ Days", icon: Calendar },
      ],
    },
    {
      question: "How long are your workouts?",
      options: [
        { value: "20 minutes", label: "20 Minutes", icon: Zap },
        { value: "30-45 minutes", label: "30-45 Minutes", icon: Timer },
        { value: "1 hour+", label: "1 Hour+", icon: Clock },
      ],
    },
    {
      question: "Any dietary preferences?",
      options: [
        { value: "none", label: "None", icon: Utensils },
        { value: "vegetarian", label: "Vegetarian", icon: Apple },
        { value: "vegan", label: "Vegan", icon: Leaf },
        { value: "keto", label: "Low-Carb/Keto", icon: Zap },
        { value: "gluten-free", label: "Gluten-Free", icon: Wheat },
      ],
    },
    {
      question: "What's your age range?",
      options: [
        { value: "under-18", label: "Under 18", icon: Baby },
        { value: "18-24", label: "18-24 Years", icon: User },
        { value: "25-35", label: "25-35 Years", icon: UserCheck },
        { value: "36-50", label: "36-50 Years", icon: Crown },
        { value: "50+", label: "50+ Years", icon: Crown },
      ],
    },
  ]

  if (currentStep === "landing") {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <FitPlanLogo />
            <span className="text-2xl font-bold" style={{ fontFamily: "NDot, monospace" }}>
              FitPlan
            </span>
          </div>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-600/20 px-6 py-3 rounded-full mb-12">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-blue-400" style={{ fontFamily: "monospace" }}>
                  AI-POWERED PERSONALIZATION
                </span>
              </div>

              <h1
                className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
                style={{ fontFamily: "NDot, monospace" }}
              >
                YOUR PERFECT
                <span className="text-blue-400 block">FITNESS PLAN</span>
                AWAITS
              </h1>

              <p
                className="text-xl md:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed text-gray-300"
                style={{ fontFamily: "monospace" }}
              >
                Get a free, personalized fitness and nutrition plan based on your body, goals, and lifestyle in under 2
                minutes.
              </p>
            </div>

            <Button
              onClick={() => setCurrentStep("quiz")}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-16 py-8 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-blue-600/25 transform hover:scale-105 transition-all duration-300 border border-blue-500"
              style={{ fontFamily: "NDot, monospace" }}
            >
              START YOUR FREE PLAN
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>

            <p className="text-sm mt-8 text-gray-400" style={{ fontFamily: "monospace" }}>
              ✓ NO EMAIL REQUIRED TO START ✓ INSTANT RESULTS ✓ 100% FREE
            </p>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 mt-24">
              <Card className="bg-black border-gray-800 hover:border-blue-600/50 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white" style={{ fontFamily: "NDot, monospace" }}>
                    PERSONALIZED WORKOUTS
                  </h3>
                  <p className="text-gray-400" style={{ fontFamily: "monospace" }}>
                    Custom exercise plans based on your equipment, experience, and available time.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black border-gray-800 hover:border-blue-600/50 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white" style={{ fontFamily: "NDot, monospace" }}>
                    SMART NUTRITION
                  </h3>
                  <p className="text-gray-400" style={{ fontFamily: "monospace" }}>
                    Meal plans that fit your dietary preferences and support your fitness goals.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black border-gray-800 hover:border-blue-600/50 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white" style={{ fontFamily: "NDot, monospace" }}>
                    INSTANT RESULTS
                  </h3>
                  <p className="text-gray-400" style={{ fontFamily: "monospace" }}>
                    Get your complete plan immediately after completing our quick assessment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (currentStep === "quiz") {
    const progress = ((quizStep + 1) / totalQuizSteps) * 100
    const currentQuestion = quizQuestions[quizStep]

    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header with Progress */}
        <header className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <FitPlanLogo />
              <span className="text-xl font-bold" style={{ fontFamily: "NDot, monospace" }}>
                FitPlan
              </span>
            </div>
            <Button
              variant="ghost"
              onClick={() => (quizStep > 0 ? setQuizStep((prev) => prev - 1) : setCurrentStep("landing"))}
              className="rounded-full text-white hover:bg-gray-900 hover:text-blue-400"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <span className="text-sm font-medium text-gray-400" style={{ fontFamily: "monospace" }}>
              {quizStep + 1} OF {totalQuizSteps}
            </span>
          </div>
          <Progress
            value={progress}
            className="h-3 bg-gray-900"
            style={{
              background: "rgb(17 24 39)",
            }}
          />
        </header>

        {/* Quiz Content */}
        <main className="container mx-auto px-6 py-12 flex items-center justify-center min-h-[70vh]">
          <div className="max-w-2xl mx-auto text-center">
            {/* Multiple Choice Questions (steps 0-6) */}
            {quizStep <= 6 && currentQuestion && (
              <div className="animate-fade-in">
                <h2
                  className="text-4xl md:text-5xl font-bold mb-16 text-white"
                  style={{ fontFamily: "NDot, monospace" }}
                >
                  {currentQuestion.question}
                </h2>
                <div className="grid gap-6">
                  {currentQuestion.options.map((option, index) => {
                    const IconComponent = option.icon
                    return (
                      <Button
                        key={option.value}
                        variant="outline"
                        onClick={() =>
                          handleQuizAnswer(Object.keys(quizData)[quizStep] as keyof QuizData, option.value)
                        }
                        className="p-8 text-left justify-start text-lg hover:scale-105 transition-all duration-200 bg-black border-gray-700 hover:border-blue-600 text-white hover:bg-gray-900"
                        style={{ animationDelay: `${index * 100}ms`, fontFamily: "monospace" }}
                      >
                        <IconComponent className="w-6 h-6 mr-4 text-blue-400" />
                        {option.label}
                      </Button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Manual Input Questions (steps 7-8) */}
            {quizStep > 6 && currentQuestion === undefined && (
              <div className="animate-fade-in">
                <h2
                  className="text-4xl md:text-5xl font-bold mb-16 text-white"
                  style={{ fontFamily: "NDot, monospace" }}
                >
                  Tell us a bit more about yourself.
                </h2>

                {/* Name Input */}
                {quizStep === 7 && (
                  <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="block text-lg font-medium text-gray-300 mb-2"
                      style={{ fontFamily: "monospace" }}
                    >
                      Your Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={quizData.name}
                      onChange={(e) => handleQuizAnswer("name", e.target.value)}
                      className="shadow-sm bg-gray-900 border border-gray-700 text-white text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                      placeholder="Enter your name"
                      style={{ fontFamily: "monospace" }}
                    />
                  </div>
                )}

                {/* Email Input */}
                {quizStep === 8 && (
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-lg font-medium text-gray-300 mb-2"
                      style={{ fontFamily: "monospace" }}
                    >
                      Your Email (Optional):
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={quizData.email}
                      onChange={(e) => handleQuizAnswer("email", e.target.value)}
                      className="shadow-sm bg-gray-900 border border-gray-700 text-white text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                      placeholder="Enter your email"
                      style={{ fontFamily: "monospace" }}
                    />
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-12">
                  <Button
                    variant="ghost"
                    onClick={() => setQuizStep((prev) => prev - 1)}
                    className="rounded-full text-white hover:bg-gray-900 hover:text-blue-400"
                  >
                    <ArrowLeft className="w-6 h-6" />
                    Previous
                  </Button>
                  <Button
                    onClick={() => {
                      if (quizStep < totalQuizSteps - 1) {
                        setQuizStep((prev) => prev + 1)
                      } else {
                        setCurrentStep("results")
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-blue-600/25 transform hover:scale-105 transition-all duration-300 border border-blue-500"
                    style={{ fontFamily: "NDot, monospace" }}
                  >
                    {quizStep === totalQuizSteps - 1 ? "View Results" : "Next"}
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
        <style jsx>{`
  .progress-bar > div {
    background: linear-gradient(90deg, #2563eb 0%, #3b82f6 100%) !important;
  }
`}</style>
      </div>
    )
  }

  if (currentStep === "results") {
    // Results Page
    const workoutPlan = generateWorkoutPlan()
    const { meals: mealPlan, totalCalories } = generateMealPlan()
    const groceryList = generateGroceryList()

    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="container mx-auto px-6 py-8">
          <div className="flex items-center space-x-3 mb-8">
            <FitPlanLogo />
            <span className="text-2xl font-bold" style={{ fontFamily: "NDot, monospace" }}>
              FitPlan
            </span>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-600/20 px-6 py-3 rounded-full mb-6 animate-fade-in">
              <Check className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium text-blue-400" style={{ fontFamily: "monospace" }}>
                PLAN GENERATED SUCCESSFULLY
              </span>
            </div>
            <h1
              className="text-5xl md:text-6xl font-bold mb-6 text-white animate-fade-in"
              style={{ fontFamily: "NDot, monospace", animationDelay: "0.2s" }}
            >
              YOUR <span className="text-blue-400 animate-pulse">PERSONALIZED</span> PLAN IS READY!
            </h1>
            <p
              className="text-xl text-gray-300 animate-fade-in"
              style={{ fontFamily: "monospace", animationDelay: "0.4s" }}
            >
              HI <span className="text-blue-400 font-bold animate-pulse">{quizData.name.toUpperCase()}</span>! HERE'S
              YOUR CUSTOM FITNESS AND NUTRITION PLAN.
            </p>
          </div>
        </header>

        {/* Results Content */}
        <main className="container mx-auto px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            {/* Download CTA */}
            <div className="text-center mb-16">
              <Button
                onClick={downloadPDF}
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-xl text-lg font-bold mr-4"
                style={{ fontFamily: "NDot, monospace" }}
              >
                <Download className="mr-3 w-6 h-6" />
                DOWNLOAD COMPLETE PLAN
              </Button>
            </div>

            {/* Workout Plan */}
            <Card className="mb-12 bg-black border-gray-800">
              <CardContent className="p-10">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mr-6">
                    <Dumbbell className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "NDot, monospace" }}>
                      YOUR WORKOUT PLAN
                    </h2>
                    <p className="text-gray-400" style={{ fontFamily: "monospace" }}>
                      <span className="text-blue-400 font-bold">{workoutPlan.length}</span> WORKOUT DAYS PER WEEK •{" "}
                      <span className="text-blue-400 font-bold">{quizData.duration.toUpperCase()}</span> PER SESSION
                      {workoutPlan.length === 6 && " • PUSH/PULL/LEGS/REST CYCLE (2X FREQUENCY)"}
                      {workoutPlan.length === 4 && " • PUSH/PULL/LEGS/REST CYCLE"}
                      {workoutPlan.length === 3 && " • PUSH/PULL/LEGS WITH REST DAYS"}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {workoutPlan.map((day, index) => (
                    <div key={index} className="p-8 rounded-2xl border border-gray-800 bg-gray-900/30">
                      <h3 className="font-bold text-xl mb-3 text-white" style={{ fontFamily: "NDot, monospace" }}>
                        {day.day.toUpperCase()}
                      </h3>
                      <p className="text-sm mb-6 text-blue-400" style={{ fontFamily: "monospace" }}>
                        {day.type.toUpperCase()}
                      </p>

                      {/* Warm-up Section */}
                      <div className="mb-6">
                        <h4 className="text-sm font-bold text-blue-400 mb-3" style={{ fontFamily: "monospace" }}>
                          WARM-UP (5-10 MIN)
                        </h4>
                        <ul className="space-y-2">
                          {day.warmup.map((exercise, idx) => (
                            <li
                              key={idx}
                              className="text-xs flex items-center text-gray-400"
                              style={{ fontFamily: "monospace" }}
                            >
                              <Zap className="w-3 h-3 text-blue-400 mr-2 flex-shrink-0" />
                              {exercise}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Main Workout Section */}
                      <div className="mb-6">
                        <h4 className="text-sm font-bold text-blue-400 mb-3" style={{ fontFamily: "monospace" }}>
                          MAIN WORKOUT
                        </h4>
                        <ul className="space-y-3">
                          {day.exercises.map((exercise, idx) => (
                            <li
                              key={idx}
                              className="text-sm flex items-center text-gray-300"
                              style={{ fontFamily: "monospace" }}
                            >
                              <Check className="w-4 h-4 text-blue-400 mr-3 flex-shrink-0" />
                              {exercise}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Substitutes Section */}
                      {day.substitutes && (
                        <div>
                          <h4 className="text-sm font-bold text-yellow-400 mb-3" style={{ fontFamily: "monospace" }}>
                            EASIER ALTERNATIVES
                          </h4>
                          <ul className="space-y-2">
                            {day.substitutes.map((substitute, idx) => (
                              <li
                                key={idx}
                                className="text-xs flex items-center text-gray-400"
                                style={{ fontFamily: "monospace" }}
                              >
                                <ArrowRight className="w-3 h-3 text-yellow-400 mr-2 flex-shrink-0" />
                                {substitute}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Meal Plan */}
            <Card className="mb-12 bg-black border-gray-800">
              <CardContent className="p-10">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mr-6">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "NDot, monospace" }}>
                      YOUR NUTRITION PLAN
                    </h2>
                    <p className="text-gray-400" style={{ fontFamily: "monospace" }}>
                      DAILY MEAL PLAN • <span className="text-blue-400 font-bold">{totalCalories}</span> TOTAL CALORIES
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {mealPlan.map((meal, index) => (
                    <div key={index} className="p-8 rounded-2xl border border-gray-800 bg-gray-900/30">
                      <h3 className="font-bold text-xl mb-3 text-white" style={{ fontFamily: "NDot, monospace" }}>
                        {meal.meal.toUpperCase()}
                      </h3>
                      <p className="text-sm mb-6 font-bold text-blue-400" style={{ fontFamily: "monospace" }}>
                        {meal.calories} CALORIES
                      </p>
                      <ul className="space-y-3">
                        {meal.foods.map((food, idx) => (
                          <li key={idx} className="text-sm text-gray-300" style={{ fontFamily: "monospace" }}>
                            • {food}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Grocery List */}
            <Card className="mb-16 bg-black border-gray-800">
              <CardContent className="p-10">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mr-6">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "NDot, monospace" }}>
                      YOUR GROCERY LIST
                    </h2>
                    <p className="text-gray-400" style={{ fontFamily: "monospace" }}>
                      EVERYTHING YOU NEED FOR YOUR MEAL PLAN
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {groceryList.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-gray-900/30">
                      <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300" style={{ fontFamily: "monospace" }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mental Reps Section */}
            <MentalRepsSection />

            {/* CTA Section */}
            <Card className="border-0 bg-blue-600 text-white">
              <CardContent className="p-16 text-center">
                <h3 className="text-4xl font-bold mb-6" style={{ fontFamily: "NDot, monospace" }}>
                  READY TO TRANSFORM YOUR BODY?
                </h3>
                <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto" style={{ fontFamily: "monospace" }}>
                  THIS IS JUST THE BEGINNING! GET PERSONALIZED COACHING, WEEKLY PLAN UPDATES, PROGRESS TRACKING, AND
                  24/7 SUPPORT.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-6 text-lg font-bold rounded-xl"
                    style={{ fontFamily: "NDot, monospace" }}
                  >
                    <Phone className="mr-3 w-6 h-6" />
                    BOOK FREE STRATEGY CALL
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent px-12 py-6 text-lg font-bold rounded-xl"
                    style={{ fontFamily: "NDot, monospace" }}
                  >
                    UNLOCK FULL 30-DAY PLAN
                  </Button>
                </div>
                <p className="text-sm mt-8 opacity-75" style={{ fontFamily: "monospace" }}>
                  ✓ 30-DAY MONEY BACK GUARANTEE ✓ CANCEL ANYTIME ✓ PERSONAL COACH ASSIGNED
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return <div className="text-white">Loading...</div>
}
