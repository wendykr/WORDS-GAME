import React, { useState } from 'react';
import './Setting.scss';

import { IoSettingsSharp } from "react-icons/io5";

export const Setting = () => {
    const [isShow, setIsShow] = useState(false);

    const showSetup = () => {
        console.log('click');
        setIsShow(prevState => !prevState);
    };

    return (
        <main className="setting">
            <div className="setting__head">
                <IoSettingsSharp className="icon-setting" onClick={showSetup} title="Setting icon" />
            </div>
            <div className={`setting__body ${isShow ? 'show' : ''}`}>
                <form className="setting__form" action="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut hic, voluptas tempora obcaecati totam in illo laudantium, optio blanditiis vitae perferendis soluta quae laborum inventore vero magnam nesciunt, harum alias.</form>
            </div>
            
        </main>
    );
}