import React from 'react'
import { useId } from 'react'
const Input=React.forwardRef(
    function Input({
     label,
     type="text",
     classname="",
     ...props
    },ref){
        const id=useId();
        return(
            <div>

        {label && <label className='w-full' htmlFor={id}>{label}</label>}
        <input type={type}
         className={`border px-2 py-1  ${classname}`}
         ref={ref}
         {...props}
         id={id} 
        />
            </div>
       
        )
    }
)

export default Input
