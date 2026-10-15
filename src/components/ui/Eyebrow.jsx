export default function Eyebrow({ children, dotColor = 'bg-white' }) {
    return (
      <div className="flex items-center gap-2 mb-6">
        <div className={`w-4 h-2 rounded-full ${dotColor}`}></div>
        <p className="text-xs">{children}</p>
      </div>
    )
  }