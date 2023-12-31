import { Link, useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { URL } from "../url"
import Loader from "../components/Loader"
import HomePosts from "../components/HomePosts"

const MyBlogs = () => {
    const {search}=useLocation()
  const [posts, setPosts] = useState([])
  const [noResults, setNoResults]=useState(false)
  const [loader, setLoader] = useState(false)
  const {user} = useContext(UserContext)


  const fetchPosts = async () =>{
    try{
      setLoader(true)
      const res = await axios.get(URL+"/api/posts/user/"+user.userId)
      // console.log(res.data)
      setPosts(res.data)
      if(res.data.length===0){
        setNoResults(true)
      }else{
        setNoResults(false)
      }
      setLoader(false)
    }
    catch(err){
      console.error(err);
    }
    setLoader(false)
  }

  useEffect(()=>{
    fetchPosts()
  },[search])
  return (
    <div>
      <Navbar/>
      <div className='px-8 lg:px-[200px] min-h-[80vh]'>
            {loader?<div className='h-[40vh] flex justify-center items-center'><Loader/></div> : !noResults?posts.map((post)=>{
             return(
              <div key={post._id}>
                <Link to={user?`/posts/post/${post._id}`:"/login"}>
                  <HomePosts key={post._id} post={post} />
                </Link>
              </div>
             ) 
            }):<h3 className='text-center font-bold mt-16'>No posts available</h3>}
        </div>
      <Footer/>
    </div>
  )
}

export default MyBlogs
