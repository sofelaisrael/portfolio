import React from 'react'

interface BracketBoxProps {
  children: React.ReactNode
  className?: string
  placeholder?: string
  value?: string
  type?: string
  onHoverChange?: (isHovered: boolean) => void
}

export function BracketBox({ children, className = "", placeholder, value, type = "text", onHoverChange }: BracketBoxProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    onHoverChange?.(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onHoverChange?.(false)
  }

  return (
    <div className={`bracket-wrapper ${className}`}>
      {React.cloneElement(children as React.ReactElement, {
        className: 'focus-text',
        placeholder,
        value,
        type,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      })}

      <div className="bracket-box">
        <div className="edge top-left"></div>
        <div className="edge top-right"></div>
        <div className="edge bottom-right"></div>
        <div className="edge bottom-left"></div>
      </div>
    </div>
  )
}
