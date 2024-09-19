import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/v1/posts/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className='bg-gray-50 dark:bg-gray-900'>
      {/* Hero Section */}
      <section
        className='relative bg-cover bg-center h-[400px] flex flex-col justify-center items-center text-center'
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?fit=crop&w=1400&q=80")',
        }}
      >
        {/* Dark Overlay */}
        <div className='absolute inset-0 bg-black opacity-50'></div>

        {/* Content with improved visibility */}
        <div className='relative z-10 text-white px-4'>
          <h1 className='text-white text-4xl md:text-6xl font-bold'>
            Welcome to My Blog
          </h1>
          <p className='text-white my-4 text-sm md:text-lg max-w-xl'>
            Dive into insightful articles on web development, software engineering, and programming languages.
          </p>
          <Link
            to='/search'
            className='mt-6 text-teal-500 bg-white px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all'
          >
            View All Posts
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className='py-10 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </section>

      {/* Recent Posts Section */}
      <section className='max-w-7xl mx-auto p-5 py-10  '>
        <h2 className='text-3xl font-semibold text-center mb-10 dark:text-white'>
          Recent Posts
        </h2>
        {posts && posts.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className='text-center text-gray-500 dark:text-gray-400'>
            No posts available.
          </p>
        )}
        <div className='mt-10 text-center'>
          <Link
            to='/search'
            className='text-teal-500 text-lg font-semibold hover:underline dark:text-teal-400'
          >
            View all posts
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
