import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveMenuItem } from '../redux/slices/activeMenuSlice';
import logoImg from '../assets/images/Logo.png';

const MenuSidebar = () => {
    const dispatch = useDispatch();
    const activeItem = useSelector((state) => state.activeMenu.activeItem);
    const [menuItems] = useState(['Reseller', 'Accounts', 'Subscriber', 'Packages']);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleMenuClick = (item) => {
        dispatch(setActiveMenuItem(item));
    };

    return (
        <div className="menu-sidebar rounded-xl p-4 bg-gradient-to-b from-[#1135e7] to-[#0022cd] min-h-screen">
            <div className='logo'>
                <Image
                    src={logoImg}
                    className="h-full object-cover px-4"
                    alt={`${process.env.NEXT_PUBLIC_SITE_NAME} logo`}
                    />
                <p>Version: {process.env.NEXT_PUBLIC_CURRENT_VERSION}</p>
            </div>
            <ul>
                {menuItems.map((item) => (
                    <li
                        key={item}
                        className={`cursor-pointer p-2 hover:bg-white/10 text-white ${
                            activeItem === item ? 'bg-white/20 font-bold' : ''
                        }`}
                        onClick={() => handleMenuClick(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuSidebar;