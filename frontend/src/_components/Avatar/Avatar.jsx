import React from 'react'

const Avatar = ({pic }) => {
  return (
    <div
    
     className="rounded-full bg-green-700 w-[30px] h-[30px] p-0.5 ">
    <div className="rounded-full bg-green-700 w-full h-full overflow-hidden">
      <img

      
        className="w-full h-full object-cover"
        src={pic} // ✅ Now correctly accessing user.pic
        alt="profile-pic"
      />
    </div>
  </div>
  )
}

export default Avatar
