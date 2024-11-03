import React from 'react'
import './Button.css'
const Button = ({
    children,
    type='button',
    bgColor='',
    className="",
    textcolor="text-white",
    ...props

}) => {
  return (
    <button type={type} {...props} className={`btn ${textcolor} ${bgColor} ${className}`}  >
     {children}
    </button>
  )
}

export default Button
