import React from 'react'
// import footerwallpaper from '../../../public/footerwallpaper'
const Footer = () => {
  return (
  
       <footer className=" bg-gradient-to-b  shadow-slate-400  shadow-inner from-white to-black text-gray-800 w-full  p-12  absolute z-20">
      <div className="container  mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">About the Blog</h2>
          <p className="text-gray-600">
            Our blog shares insights, tips, and tutorials to keep you informed and inspired. Stay tuned for the latest trends and expert advice.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="hover:text-gray-900 hover:underline transition duration-300 ease-in-out">
                Home
              </a>
            </li>
            <li>
              <a href="#blog" className="hover:text-gray-900 hover:underline transition duration-300 ease-in-out">
                Blog Posts
              </a>
            </li>
            <li>
              <a href="#categories" className="hover:text-gray-900 hover:underline transition duration-300 ease-in-out">
                Categories
              </a>
            </li>
            
          </ul>
        </div>

        {/* Social Media and Subscription */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Stay Connected</h2>
          <div className="flex space-x-4">
            <a
              href="#twitter"
              className="text-gray-600 hover:text-gray-900 transition-transform duration-300 ease-in-out transform hover:scale-110"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#facebook"
              className="text-gray-600 hover:text-gray-900 transition-transform duration-300 ease-in-out transform hover:scale-110"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="#instagram"
              className="text-gray-600 hover:text-gray-900 transition-transform duration-300 ease-in-out transform hover:scale-110"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <div className="mt-4">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button className="w-full mt-2 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-300 pt-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Your Blog Name. All rights reserved.</p>
        <p>
          <a href="#privacy" className="hover:text-gray-900 transition duration-300 ease-in-out">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="#terms" className="hover:text-gray-900 transition duration-300 ease-in-out">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
     
    
  )
}

export default Footer
