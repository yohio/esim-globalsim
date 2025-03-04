import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveMenuItem } from '../redux/slices/activeMenuSlice';
import logoImg from '../assets/images/Logo.png';
import userImg from '../assets/images/user-circle.png';

const MenuSidebar = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const activeItem = useSelector((state) => state.activeMenu.activeItem);
    const userData = useSelector((state) => state.user);
    const [menuItems] = useState(['Reseller', 'Accounts', 'Subscriber']);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleMenuClick = (item) => {
        dispatch(setActiveMenuItem(item));
    };

    const handleProfileClick = () => {
        router.push('/profile');
    };

    return (
        <div className="menu-sidebar rounded-xl  bg-gradient-to-b from-[#1135e7] to-[#0022cd] min-h-screen flex flex-col">
            <div className='logo flex flex-col py-8 px-4 justify-center align-middle'>
                <Image
                    src={logoImg}
                    className="h-full object-cover px-4"
                    alt={`${process.env.NEXT_PUBLIC_SITE_NAME} logo`}
                    />
                <p className='text-center'>Version: {process.env.NEXT_PUBLIC_CURRENT_VERSION}</p>
            </div>
            <div className='menu-items-holder flex-grow px-4'>
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
            {userData && (
                <div className='profile-wrapper mt-auto p-4 border-t-white border-t-[1px] py-4 px-4 flex flex-col justify-center align-middle '>
                    <div className='text-white user-name flex items-center justify-center ml-[-32px] gap-2 text-center'>
                        <Image
                            src={userImg}
                            width={32}
                            height={32}
                            className="rounded-full"
                            alt={`${process.env.NEXT_PUBLIC_SITE_NAME} user icon`}
                        />
                        <span className='text-white'>{userData?.name}</span>
                    </div>
                    <button
                        onClick={handleProfileClick}
                        className="mt-2 w-full px-4 py-2 text-sm text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        View Profile
                    </button>
                </div>
            )}
        </div>
    );
};

export default MenuSidebar;