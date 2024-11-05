import React from 'react'

const Container = ({children}) => {
  return (
    <div className='container mx-auto p-4 w-screen'>
      {children}
    </div>   // now its doing nothing , its just demostrate how production works. later on add some styling ...

  )
}

export default Container
