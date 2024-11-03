import React from 'react'
import { useId } from 'react';
const Select = ({
    options,
    label,
    classname="",
    ...props
},ref) => {
     const id = useId();
  return (
  
   <>
    {label && <label htmlFor={id} className={`${classname}`}>{label}</label>}
    <select {...props} ref={ref}  className={`block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-primary-500 focus:border-primary-500 transition duration-150 ease-in-out hover:bg-gray-50 ${classname}`} id={id}>
    {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}

    </select>
   </>
  )
}

export default React.forwardRef(Select)
