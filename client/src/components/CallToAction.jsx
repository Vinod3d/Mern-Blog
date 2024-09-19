import { Button } from 'flowbite-react';

export default function AdventureSection() {

  return (
    <div>
      <div className='bg-gray-100 dark:bg-gray-800 py-12'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold mb-4 dark:text-white'>
              Embark on an Adventure
            </h2>
            <p className='text-lg text-gray-700 dark:text-gray-300'>
              Discover thrilling adventures and travel experiences. Dive into our curated collection of articles and guides that will ignite your wanderlust.
            </p>
          </div>


          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden'>
              <img
                src='https://img.freepik.com/free-photo/wild-deer-nature_23-2151474246.jpg?t=st=1725563314~exp=1725566914~hmac=8fdf03697bca2df756ff70a8f1195a521c9fa3eab572a0c704934462979c8de9&w=1060'
                alt='Into the Wild'
                className='w-full h-48 object-cover'
              />
              <div className='p-6'>
                <h3 className='text-2xl font-semibold mb-2 dark:text-white'>
                  Into the Wild
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  Experience the untamed wilderness and connect with nature in the most exhilarating ways.
                </p>
                <Button gradientDuoTone='purpleToBlue' className='mt-4'>
                  <a
                    href='https://www.nationalgeographic.com/adventure/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Read More
                  </a>
                </Button>
              </div>
            </div>

            <div className='bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden'>
              <img
                src='https://www.bnesim.com/wp-content/uploads/2023/08/hong-kong-urbex-1-0-0-0-0-1464700880.jpg'
                alt='Urban Exploration'
                className='w-full h-48 object-cover'
              />
              <div className='p-6'>
                <h3 className='text-2xl font-semibold mb-2 dark:text-white'>
                  Urban Exploration
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  Discover hidden gems and unique spots in bustling cities around the world.
                </p>
                <Button gradientDuoTone='purpleToBlue' className='mt-4'>
                  <a
                    href='https://www.theurbanlist.com/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Read More
                  </a>
                </Button>
              </div>
            </div>

            <div className='bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden'>
              <img
                src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/c3/9e/43/saoirse-or-9mtr-rib-in.jpg?w=1000&h=800&s=1'
                alt='Ocean Escapes'
                className='w-full h-48 object-cover'
              />
              <div className='p-6'>
                <h3 className='text-2xl font-semibold mb-2 dark:text-white'>
                  Ocean Escapes
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  Sail away to pristine beaches and crystal-clear waters for a relaxing escape.
                </p>
                <Button gradientDuoTone='purpleToBlue' className='mt-4'>
                  <a
                    href='https://www.travelandleisure.com/beaches'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Read More
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
