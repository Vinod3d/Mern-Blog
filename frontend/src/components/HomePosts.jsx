import React from 'react'

const HomePosts = () => {
  return (
    <div className="w-full flex mt-8 space-x-4">
    {/* left */}
    <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src="https://res.cloudinary.com/dalmtefhb/image/upload/v1697828315/AIHero_cxooq3.jpg" alt="" className="h-full w-full object-cover"/>
    </div>
    {/* right */}
    <div className="flex flex-col w-[65%]">
      <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
        10 Uses of Artificial Intelligence in Day to Day Life
      </h1>
      <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
       <p>@snehasisdev</p>
       <div className="flex space-x-2 text-sm">
       <p>16/06/2023</p>
       <p>16:45</p>
       </div>
      </div>
      <p className="text-sm md:text-lg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo quasi, maiores dignissimos, libero reiciendis, dolores consequatur recusandae cumque impedit vel tempore minus.</p>
    </div>

    </div>
  )
}

export default HomePosts
