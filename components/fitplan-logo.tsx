export default function FitPlanLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`bg-blue-600 rounded-xl flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white">
        {/* Unique FitPlan Icon - Stylized F + P with fitness elements */}
        <path d="M3 3h8v3H6v3h4v3H6v6H3V3z" fill="currentColor" />
        <path d="M13 3h5c1.5 0 3 1.5 3 3s-1.5 3-3 3h-2v9h-3V3z" fill="currentColor" />
        <path d="M16 6h2c.5 0 1 .5 1 1s-.5 1-1 1h-2V6z" fill="currentColor" opacity="0.7" />
        {/* Fitness accent - small dumbbell */}
        <circle cx="19" cy="19" r="2" fill="currentColor" opacity="0.8" />
        <circle cx="15" cy="19" r="1.5" fill="currentColor" opacity="0.8" />
        <line x1="17" y1="19" x2="17" y2="19" stroke="currentColor" strokeWidth="2" opacity="0.8" />
      </svg>
    </div>
  )
}
