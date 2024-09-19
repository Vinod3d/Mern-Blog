import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HiAnnotation, HiArrowRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi'
import { signoutSuccess } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const DashSidebar = () => {
    const location = useLocation()
    const [tab, setTab] = useState('')
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);


    const handleSignOut = async()=>{
        try {
            const res = await fetch('api/v1/users/signout', {
                method : 'POST',
            })
    
            const data = await res.json();
            console.log(data)
            if(!res.ok){
                console.log(data.message);
            } else{
                localStorage.clear();
                dispatch(signoutSuccess());
            }
            navigate('/sign-in')
        } catch (error) {
            console.log(error)
        }
    }

    
    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                {currentUser.isAdmin && (
                        <Link to='/dashboard?tab=dash'>
                            <Sidebar.Item active={tab==='dash' || !tab} icon={HiChartPie} labelColor='dark' as='div'>
                                Dashboard
                            </Sidebar.Item>
                        </Link>
                    ) }
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item active={tab==='profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark' as='div'>
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {currentUser.isAdmin && (
                        <Link to='/dashboard?tab=posts'>
                            <Sidebar.Item active={tab==='posts'} icon={HiDocumentText} labelColor='dark' as='div'>
                                Posts
                            </Sidebar.Item>
                        </Link>
                    ) }
                    {currentUser.isAdmin && (
                        <Link to='/dashboard?tab=users'>
                            <Sidebar.Item active={tab==='users'} icon={HiOutlineUserGroup} labelColor='dark' as='div'>
                                Users
                            </Sidebar.Item>
                        </Link>
                    ) }
                    {currentUser.isAdmin && (
                        <Link to='/dashboard?tab=comment'>
                            <Sidebar.Item active={tab==='comment'} icon={HiAnnotation} labelColor='dark' as='div'>
                                Comment
                            </Sidebar.Item>
                        </Link>
                    ) }
                    <Sidebar.Item icon={HiArrowRight} className='cursor-pointer' onClick={handleSignOut}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar