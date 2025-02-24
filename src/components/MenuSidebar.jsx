import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveMenuItem } from '../redux/slices/activeMenuSlice';

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
        <div className="menu-sidebar">
            <h1>Global Sim</h1>
            <ul>
                {menuItems.map((item) => (
                    <li
                        key={item}
                        className={`cursor-pointer p-2 hover:bg-gray-100  ${
                            activeItem === item ? 'bg-blue-100 font-bold text-black' : ''
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