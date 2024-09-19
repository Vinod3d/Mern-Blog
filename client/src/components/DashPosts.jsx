/* eslint-disable react-hooks/exhaustive-deps */
import { Table } from 'flowbite-react';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { getStorage, ref, deleteObject } from 'firebase/storage';

const DashPosts = () => {
    const {currentUser} = useSelector((state)=> state.user)
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');

    useEffect(()=>{
        const fetchPosts = async ()=>{
            try {
                const res = await fetch(`/api/v1/posts/getposts`); 
                const data = await res.json()

                if(res.ok){
                    setUserPosts(data.posts);
                    if(data.posts.length < 9){
                        setShowMore(false)
                    }
                }
            } catch (error) {
                console.log(error.message)
            }
        };

        if (currentUser.isAdmin) {
            fetchPosts();
        }
    }, [currentUser._id]);

    const handleShowMore = async ()=>{
        const startIndex = userPosts.length;
        
        try {
            const res = await fetch(`/api/v1/posts/getposts?userId=${currentUser._id}&startIndex=${startIndex}`); 
            const data = await res.json()

            if(res.ok){
                setUserPosts((prev) => [...prev, ...data.posts]);
                if(data.posts.length < 9){
                    setShowMore(false);
                }
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    const getImagePathFromURL = (url) => {
        const startIndex = url.indexOf('/o/') + 3; // Get the index after '/o/'
        const endIndex = url.indexOf('?'); // Stop at the '?'
        return url.substring(startIndex, endIndex).replace(/%2F/g, '/');
    };

    const handleDeletePost = async () => {
        setShowModal(false);
        try {
            // Find the post to delete
            const postToDelete = userPosts.find((post) => post._id === postIdToDelete);
            if (!postToDelete) {
                console.error('Post not found');
                return;
            }

            // Get the image URL and extract the image path
            const imageUrl = postToDelete.image;
            const imagePath = getImagePathFromURL(imageUrl); // Extract the path

            // Get Firebase Storage instance
            const storage = getStorage();
            const imageRef = ref(storage, imagePath); // Create a reference to the image

            // Delete the image from Firebase Storage
            await deleteObject(imageRef);

            // After deleting the image, delete the post from the database
            const res = await fetch(`/api/v1/posts/deletepost/${postIdToDelete}`, {
                method: 'DELETE',
            });

            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                // Remove the post from the UI
                setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
            }
        } catch (error) {
            console.error('Error deleting post or image:', error.message);
        }
    };
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-trak-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
        {currentUser.isAdmin && userPosts.length > 0 ? (
            <> 
                <Table hoverable className='shadow-md'>
                    <Table.Head>
                        <Table.HeadCell>Date updated</Table.HeadCell>
                        <Table.HeadCell>Post image</Table.HeadCell>
                        <Table.HeadCell>Post title</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                        <Table.HeadCell>Delete</Table.HeadCell>
                        <Table.HeadCell>
                            <span>Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className='divide-y'>
                        {userPosts.map((post)=>(
                            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={post._id}>
                                <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>
                                    <Link to={`/post/${post.slug}`}>
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className='w-20 h-20 object-cover bg-gray-500'
                                        />
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>{post.title}</Link>
                                </Table.Cell>
                                <Table.Cell>{post.category}</Table.Cell>
                                <Table.Cell>
                                    <span 
                                    onClick={
                                        ()=> {
                                            setShowModal(true);
                                            setPostIdToDelete(post._id);
                                        }
                                    } 
                                    className='font-medium text-red-500 hover:underline cursor-pointer'>
                                        Delete
                                    </span>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link className='text-teal-500 hover:underline' to={`/update-post/${post._id}`}>
                                        <span>Edit</span>
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

                {
                    showMore && (
                        <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                            Show More
                        </button>
                    )
                }
            </>
        ) : (
            <p>You have no posts yet!</p>
        )}

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'>

                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this post?
                        </h3>
                        <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={handleDeletePost}>
                            {"Yes, I'm sure"}
                        </Button>
                        <Button color="gray" onClick={() => setShowModal(false)}>
                            No, cancel
                        </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
    </div>
  )
}

export default DashPosts