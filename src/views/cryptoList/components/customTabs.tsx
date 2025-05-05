import React, { useState } from 'react';

interface CustomTabsProps {
}

export const CustomTabs: React.FC<CustomTabsProps> = ({ }) => {
  const [activeTab, setActiveTab] = useState('coins');


  return (
    <nav className='px-6 pt-sm border-b border-gray-2'>
      <ul className='flex gap-x-[40px]'>
        <li
          onClick={() => { setActiveTab('coins') }}
          className={`text-sm pb-sm text-[#949FA8] font-normal ${activeTab === 'coins' ? ' text-white border-b-[2px] border-[#0092FF]' : ''} hover:cursor-pointer`}
        >All Coins</li>
        <li
          onClick={() => { setActiveTab('watchlist') }}
          className={`text-sm pb-sm text-[#949FA8] font-normal ${activeTab === 'watchlist' ? ' text-white border-b-[2px] border-[#0092FF]' : ''} hover:cursor-pointer`}
        >My Watchlist</li>
      </ul>
    </nav>
  );
};
