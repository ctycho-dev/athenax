import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useParams } from "react-router-dom";
import { navbar } from '@/data/projectNavbar';
import { usePrivy } from '@privy-io/react-auth';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import shortcut from '@/assets/shortcut.svg'


import userIcon from '@/assets/layout/user.svg'
import whats_new from '@/assets/layout/whats_new.svg'
import help from '@/assets/layout/help.svg'
import athenxLogo from '@/assets/logo.svg'


interface NavbarProps {
}

export const Navbar: React.FC<NavbarProps> = ({ }) => {
   const {
      data: user,
      loading: userLoading
   } = useSelector((state: RootState) => state.user);
   const {
      ready,
      authenticated,
      login,
      logout
   } = usePrivy();


   return (
      <aside className="h-full w-[280px] flex flex-col border-r border-gray-2">
         <div className="flex-1 flex flex-col">
            <div className="px-6 pt-6 flex gap-1.5 items-center">
               <img src={athenxLogo} alt="" className="w-[48px]" />
               <span className="font-normal text-[10px] text-gray-3 leading-3">researches<br /> & audits</span>
            </div>
            <div className="flex-1 flex flex-col">
               <div className="flex-1">
                  <NavbarItems />
               </div>
               {ready && authenticated &&
                  <div className="p-6">
                     <button
                        type="button"
                        onClick={logout}
                        className="bg-light-blue-3 hover:bg-light-blue-2 transition-all duration-150 rounded-[6px] h-[33px] w-full flex justify-center items-center font-medium text-sm text-white hover:cursor-pointer"

                     >Log out</button>
                  </div>}
               {ready && !authenticated &&
                  <div className="p-6">
                     <button
                        type="button"
                        onClick={login}
                        className="bg-light-blue-3 hover:bg-light-blue-2 transition-all duration-150 rounded-[6px] h-[33px] w-full flex justify-center items-center font-medium text-sm text-white hover:cursor-pointer"

                     >Log In</button>
                  </div>}
            </div>
         </div>
         <div className="border-t border-gray-2 p-6 text-sm font-normal text-gray-3">
            {ready && user &&
               <div className="grid grid-cols-[16px_1fr] items-center gap-x-[8px] mb-sm">
                  <img src={userIcon} alt="" /><span>My Account</span>
               </div>
            }
            <div className="grid grid-cols-[16px_1fr] items-center gap-x-[8px] mb-sm">
               <img src={whats_new} alt="" /><span>What’s New</span>
            </div>
            <div className="grid grid-cols-[16px_1fr] items-center gap-x-[8px]">
               <img src={help} alt="" /><span>Help</span>
            </div>
         </div>
      </aside>
   );
};


const NavbarItems = () => {
   const user = useSelector((state: RootState) => state.user.data);
   const location = useLocation();

   return (
      <ul className="text-sm font-normal text-gray-3">
         {navbar.map(section => (
            <div key={`navbar-${section.section}`} className="py-6 pt-8 [&:not(:last-child)]:border-b border-gray-2">
               <div className="px-6 text-[8px] font-medium mb-4">{section.section}</div>
               {section.items
                  .filter(item => {
                     if (!item.display) return false;
                     if (!item.role || item.role.length === 0) return true; // Show if no roles defined
                     if (!user?.role) return false; // No user role means no items with roles shown
                     return item.role.includes(user.role);
                  })
                  .map(item => (
                     <li key={`navbar-${item.id}`} className="px-xs">
                        <Link
                           to={item.path}
                           className={`navbar-item flex justify-between px-4 py-xs mb-xs transition-all duration-150 hover:text-[#0092ff] rounded-[6px] hover:cursor-pointer hover:bg-[rgb(0,146,255,0.1)] ${location.pathname === item.path ? 'bg-[rgb(0,146,255,0.1)] text-[#0092ff] active' : ''
                              }`}
                        >
                           <div className="grid grid-cols-[16px_1fr] items-center gap-x-[8px]">
                              <span className="navbar-icon">
                                 {typeof item.icon === 'string' ? (
                                    <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                                 ) : (
                                    <>{item.icon}</>
                                 )}
                              </span>
                              <span>{item.name}</span>
                           </div>
                           {item.id === 'search' ?
                              <svg width="34" height="20" viewBox="0 0 34 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <rect x="0.75" y="0.75" width="32.5" height="18.5" rx="4.25" stroke="#949FA8" className='group-hover:text-[#0092ff]' strokeWidth="0.5" />
                                 <path fillRule="evenodd" clipRule="evenodd" d="M5.57305 5.57305C5.93997 5.20613 6.43762 5 6.95652 5C7.47542 5 7.97307 5.20613 8.33999 5.57305C8.70691 5.93997 8.91304 6.43762 8.91304 6.95652V8.04348H11.087V6.95652C11.087 6.43762 11.2931 5.93997 11.66 5.57305C12.0269 5.20613 12.5246 5 13.0435 5C13.5624 5 14.06 5.20613 14.4269 5.57305C14.7939 5.93997 15 6.43762 15 6.95652C15 7.47542 14.7939 7.97307 14.4269 8.33999C14.06 8.70691 13.5624 8.91304 13.0435 8.91304H11.9565V11.087H13.0435C13.5624 11.087 14.06 11.2931 14.4269 11.66C14.7939 12.0269 15 12.5246 15 13.0435C15 13.5624 14.7939 14.06 14.4269 14.4269C14.06 14.7939 13.5624 15 13.0435 15C12.5246 15 12.0269 14.7939 11.66 14.4269C11.2931 14.06 11.087 13.5624 11.087 13.0435V11.9565H8.91304V13.0435C8.91304 13.5624 8.70691 14.06 8.33999 14.4269C7.97307 14.7939 7.47542 15 6.95652 15C6.43762 15 5.93997 14.7939 5.57305 14.4269C5.20613 14.06 5 13.5624 5 13.0435C5 12.5246 5.20613 12.0269 5.57305 11.66C5.93997 11.2931 6.43762 11.087 6.95652 11.087H8.04348V8.91304H6.95652C6.43762 8.91304 5.93997 8.70691 5.57305 8.33999C5.20613 7.97307 5 7.47542 5 6.95652C5 6.43762 5.20613 5.93997 5.57305 5.57305ZM8.04348 8.04348V6.95652C8.04348 6.66824 7.92896 6.39177 7.72512 6.18793C7.52127 5.98408 7.2448 5.86957 6.95652 5.86957C6.66824 5.86957 6.39177 5.98408 6.18793 6.18793C5.98408 6.39177 5.86957 6.66824 5.86957 6.95652C5.86957 7.2448 5.98408 7.52127 6.18793 7.72512C6.39177 7.92896 6.66824 8.04348 6.95652 8.04348H8.04348ZM8.91304 8.91304V11.087H11.087V8.91304H8.91304ZM8.04348 11.9565H6.95652C6.66824 11.9565 6.39177 12.071 6.18793 12.2749C5.98408 12.4787 5.86957 12.7552 5.86957 13.0435C5.86957 13.3318 5.98408 13.6082 6.18793 13.8121C6.39177 14.0159 6.66824 14.1304 6.95652 14.1304C7.2448 14.1304 7.52127 14.0159 7.72512 13.8121C7.92896 13.6082 8.04348 13.3318 8.04348 13.0435V11.9565ZM11.9565 11.9565V13.0435C11.9565 13.3318 12.071 13.6082 12.2749 13.8121C12.4787 14.0159 12.7552 14.1304 13.0435 14.1304C13.3318 14.1304 13.6082 14.0159 13.8121 13.8121C14.0159 13.6082 14.1304 13.3318 14.1304 13.0435C14.1304 12.7552 14.0159 12.4787 13.8121 12.2749C13.6082 12.071 13.3318 11.9565 13.0435 11.9565H11.9565ZM11.9565 8.04348H13.0435C13.3318 8.04348 13.6082 7.92896 13.8121 7.72512C14.0159 7.52127 14.1304 7.2448 14.1304 6.95652C14.1304 6.66824 14.0159 6.39177 13.8121 6.18793C13.6082 5.98408 13.3318 5.86957 13.0435 5.86957C12.7552 5.86957 12.4787 5.98408 12.2749 6.18793C12.071 6.39177 11.9565 6.66824 11.9565 6.95652V8.04348Z" fill="#949FA8" />
                                 <path d="M22.0568 14V5.27273H23.1136V9.60227H23.2159L27.1364 5.27273H28.517L24.8523 9.21023L28.517 14H27.2386L24.2045 9.94318L23.1136 11.1705V14H22.0568Z" fill="#949FA8" />
                              </svg>
                              : null
                           }
                        </Link>
                     </li>
                  ))}
            </div>
         ))}
      </ul>
   );
}

