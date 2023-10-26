import React, { useEffect } from 'react'
import HomePosts from '../components/HomePosts'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { URL } from '../url'
import axios from 'axios'

const Home = () => {
  const [posts, setPosts] = React.useState([])
  const fetchPosts = async () =>{
    try{
      const res = await axios.get(URL + "/api/posts/")
      // console.log(res.data)
      setPosts(res.data)
    }
    catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    fetchPosts()
  },[])
  return (
    <>
        <Navbar/>
        <div className='px-8 lg:px-[200px]'>
            {posts.map((post)=>{
              return <HomePosts key={post._id} post={post} />
            })}
        </div>
        <Footer/>
    </>
  )
}

export default Home
