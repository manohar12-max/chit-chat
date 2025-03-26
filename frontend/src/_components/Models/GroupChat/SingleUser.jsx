import Avatar from '@/_components/Avatar/Avatar'
import React from 'react'

const SingleUser = ({user}) => {
  
  return (
    <div className='flex gap-2 items-center border-b border-green-600'>
      <Avatar pic={user.pic}/>
      <div className="flex flex-col gap-0.5 items-start ">
      <h1 className='text-sm'>{user.name}</h1>
      <span className='text-xs'>{user.email}</span>
      </div>
    </div>
  )
}

export default SingleUser
