import { useState } from "react"

function Info({message, children, className}) {
    const [isVisible, setIsVisible] = useState(false)
  return (
    <div 
        className="relative inline-block cursor-help"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
    >
        {children}
        {isVisible && <div className={`${className} absolute z-1 -top-5  px-2 translate-x-3 min-w-20 rounded-md`}>{message}</div>}
    </div>
  )
}

export default Info