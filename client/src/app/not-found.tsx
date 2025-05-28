import React from 'react'
import Link from 'next/link'
import Aurora from '@/components/ui/Aurora'

const NotFound = () => {
  return (
    <main className='bg-white dark:bg-black min-h-screen relative' >
               <Aurora
  colorStops={["	#5D3FD3", "#7F00FF", "#E6E6FA"]}
  blend={4.5}
  amplitude={3.5}
  speed={0.5}
/>
          <div className=" flex-1 flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="relative mb-6">
          <h1 className="text-[200px] md:text-[300px] font-bold text-gray-800/80 leading-none select-none" 
    style={{
      textShadow: `
        -2px -2px 0 #7F00FF80,
        2px -2px 0 #5D3FD360,
        -2px 2px 0 #7F00FF80	,
        2px 2px 0 #E6E6FA40,
        -2px 0 0 grey,
        2px 0 0 #36415350,
        0 -2px 0 black,
        0 2px 0 #7F00FF80
      `
    }}>
  404
</h1>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white/80 mb-6">Page Not Found</h2>

          <p className="text-lg text-gray-300 mb-12 max-w-md mx-auto">
            It seems the page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link href='/' className="btn z-30">Return to Homepage</Link>
                <Link href='/login' className="btn btn-purple">Login To Explore</Link>
           
          </div>
        </div>
      </div>
    </main>
  )
}

export default NotFound