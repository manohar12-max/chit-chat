import React from 'react'

const Title = ({title}) => {
  return (
    <div className='uppercase font-bold text-3xl text-green-900 opacity-40 hidden sm:block'>
      {title}
    </div>
  )
}

export default Title
