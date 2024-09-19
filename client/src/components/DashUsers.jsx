import { Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from 'react-icons/fa';

const DashUsers = () => {
    const {currentUser} = useSelector((state)=> state.user)
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState('');

    useEffect(()=>{
        const fetchUsers = async ()=>{
            try {
                const res = await fetch(`/api/v1/users/getusers`); 
                const data = await res.json()

                if(res.ok){
                    setUsers(data.users);
                    if(data.users.length < 9){
                        setShowMore(false)
                    }
                }
            } catch (error) {
                next(error.message)
            }
        };

        if (currentUser.isAdmin) {
            fetchUsers();
        }
    }, [currentUser._id]);

    const handleShowMore = async ()=>{
        const startIndex = users.length;
        
        try {
            const res = await fetch(`/api/v1/users/getusers?&startIndex=${startIndex}`); 
            const data = await res.json()

            if(res.ok){
                setUsers((prev) => [...prev, ...data.users]);
                if(data.users.length < 9){
                    setShowMore(false);
                }
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDeleteUser = async()=>{
        setShowModal(false);
        try {
            const res = await fetch(`/api/v1/users/delete/${userIdToDelete}`, {
                method: 'DELETE',
            });
            const data = res.json();
            if(!res.ok){
                console.log(data.message);
            } else {
                setUsers((prev)=> prev.filter((user)=> user._id !== userIdToDelete))
            }
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-trak-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
        {currentUser.isAdmin && users.length > 0 ? (
            <> 
                <Table hoverable className='shadow-md'>
                    <Table.Head>
                        <Table.HeadCell>Date created</Table.HeadCell>
                        <Table.HeadCell>User image</Table.HeadCell>
                        <Table.HeadCell>Username</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Admin</Table.HeadCell>
                        <Table.HeadCell>Delete</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className='divide-y'>
                        {users.map((user)=>(
                            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={user._id}>
                                <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>
                                   
                                        <img
                                            src={user?.profilePicture}
                                            alt={user.username}
                                            className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                                        />
                                   
                                </Table.Cell>
                                <Table.Cell>
                                        {user.name}
                                </Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>{user.isAdmin ? (<FaCheck className='text-green-500'/>) : (<FaTimes className='text-red-500'/>)}</Table.Cell>
                                <Table.Cell>
                                    <span 
                                    onClick={
                                        ()=> {
                                            setShowModal(true);
                                            setUserIdToDelete(user._id);
                                        }
                                    } 
                                    className='font-medium text-red-500 hover:underline cursor-pointer'>
                                        Delete
                                    </span>
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
            <p>You have no user yet!</p>
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
                        Are you sure you want to delete this User?
                        </h3>
                        <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={handleDeleteUser}>
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

export default DashUsers