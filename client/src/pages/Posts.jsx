import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard'; // Assuming you have a PostCard component

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/v1/posts/getPosts'); // Fetch posts from your API
        const data = await res.json();
        setPosts(data.posts); // Update the state with fetched posts
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch posts', error);
        setLoading(false);
      }
    };

    fetchPosts(); // Fetch posts when component mounts
  }, []);

  return (
    <div className='min-h-screen max-w-6xl mx-auto p-5'>
      {loading ? (
        <p className='text-center'>Loading posts...</p> // Show loading message
      ) : posts.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
          {posts.map(post => (
            <PostCard key={post._id} post={post} /> // Render each post using PostCard component
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-500 mt-6'>No posts available.</p>
      )}
    </div>
  );
}
