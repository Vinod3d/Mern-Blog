import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import Comment from '../components/Comment'

const PostDetails = () => {
  return (
    <div>
      <Navbar/>
      <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl">10 Uses of Artificial Intelligence in Day to Day Life</h1>
          <div className="flex items-center justify-center space-x-2">
            <p className="cursor-pointer"  ><BiEdit/></p>
            <p className="cursor-pointer" ><MdDelete/></p>
         </div>
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@post.username</p>
          <div className="flex space-x-2">
            <p>16/06/2023</p>
            <p>16:45</p>
          </div>
        </div>
        <img src="https://res.cloudinary.com/dalmtefhb/image/upload/v1697828315/AIHero_cxooq3.jpg" alt="" className="w-full  mx-auto mt-8" />
        <p className='mx-auto mt-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, architecto natus id vitae repellat atque magnam eligendi excepturi perferendis est quam facere praesentium debitis reprehenderit laudantium! Delectus amet quidem dolorum porro veritatis, inventore tempore sit iste libero minima impedit? Aut maiores inventore veniam eos?</p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center item-center space-x-2">
            <div className='bg-gray-300 rounded-lg px-3 py-1'>Tech</div>
            <div className='bg-gray-300 rounded-lg px-3 py-1'>Ai</div>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h3 className='mt-6 mb-4 font-semibold'>Comments:</h3>
          <Comment/>
          <Comment/>
        </div>
        
         {/* write a comment */}
         <div className="w-full flex flex-col mt-4 md:flex-row">
          <input  type="text" placeholder="Write a comment" className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"/>
          <button  className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">Add Comment</button>
         </div>
      </div>
      <Footer/>
    </div>
  )
}

export default PostDetails
