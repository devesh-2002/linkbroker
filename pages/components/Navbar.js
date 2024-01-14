import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { account,handleGoogleLogin } from '../../config/appwrite';
import { useRouter } from 'next/router';

const Navbar = React.forwardRef((props, ref) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const user = await account.get();
      setUser(user);
    } catch (error) {
    }
  };


  const handleLogin = () => {
    // Trigger Google authentication when "Login" button is clicked
    handleGoogleLogin();
  };
  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navbarStyle = {
    position: 'absolute',
    width: '100%',
    height: '68px',
    left: '0',
    top: '0',
    background: 'rgba(217, 217, 217, 0.115)',
    boxShadow:
      'inset 4px -4px 4px rgba(182, 182, 182, 0.43), inset -4px 4px 4px rgba(255, 255, 255, 0.43)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
  };

  return (
    <nav style={navbarStyle} className="w-full z-10 my-4 px-2">
      <div className="container mx-auto flex justify-between items-center h-full">
        <div className="text-white font-bold">Homepage</div>
        <div className="space-x-4">
          {user ? (
            <div className="flex items-center justify-between">
          <button className="text-white mx-4 font-bold" onClick={()=>{router.push('/')}}>
           Home
          </button>
          <button className="text-white mx-3 font-bold" onClick={()=>{router.push('/history')}}>
                Downloads
              </button>
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="50" height="50" viewBox="0 0 256 256" xmlSpace="preserve">
            <g style={{ stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1 }} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
              <path d="M 45 40.375 L 45 40.375 c -9.415 0 -17.118 -7.703 -17.118 -17.118 v -6.139 C 27.882 7.703 35.585 0 45 0 h 0 c 9.415 0 17.118 7.703 17.118 17.118 v 6.139 C 62.118 32.672 54.415 40.375 45 40.375 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(110,177,225)', fillRule: 'nonzero', opacity: 1 }} transform="matrix(1 0 0 1 0 0)" strokeLinecap="round" />
              <path d="M 54.639 42.727 C 51.743 44.226 48.47 45.09 45 45.09 s -6.743 -0.863 -9.639 -2.363 c -12.942 1.931 -22.952 13.162 -22.952 26.619 v 17.707 c 0 1.621 1.326 2.946 2.946 2.946 h 59.29 c 1.621 0 2.946 -1.326 2.946 -2.946 V 69.347 C 77.591 55.889 67.581 44.659 54.639 42.727 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(110,177,225)', fillRule: 'nonzero', opacity: 1 }} transform="matrix(1 0 0 1 0 0)" strokeLinecap="round" />
            </g>
          </svg>    
          <div className="grid grid-cols-3">
          <span className="text-white font-bold ml-2">{user && user.name}</span>
              <button className="text-white font-bold ml-2 mr-5" onClick={handleLogout}>
                Sign Out
              </button>
          </div>
            </div>
          ) : (
            <>
              <button className="text-white font-bold" onClick={handleLogin}>
                Login
              </button>
              <button className="border-2 border-white text-white px-4 py-2 rounded-full">
                Create Account
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
