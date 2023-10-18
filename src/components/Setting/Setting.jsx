import React, { useState } from 'react';
import './Setting.scss';

import { IoSettingsSharp } from "react-icons/io5";
import { RxCross2 } from 'react-icons/rx';

export const Setting = () => {
    const [isShow, setIsShow] = useState(false);

    const showSetup = () => {
        setIsShow(prevState => !prevState);
    };

    return (
        <div className="setting">
            <div className="setting__head">
                <IoSettingsSharp className="icon-setting" onClick={showSetup} title="Setting icon" />
            </div>
            <div className={`setting__body ${isShow ? 'show' : ''}`}>
                <div className="setting__body--container">
                    <h3 className="setting__body--title">Setting options</h3>
                    <RxCross2 className="icon-close" onClick={showSetup} title="Close icon" />
                </div>
                <form className="form">
                    <div className="form__row">
                        <div className="form__row--label">Shuffle terms</div>
                        <div className="form__row--option">TOGGLE SWITCH</div>
                    </div>
                    <div className="form__row">
                        <div className="form__row--label">Study words from the category</div>
                        <div className="form__row--option">TOGGLE SWITCH</div>
                    </div>
                    <div className="form__row">
                        <div className="form__row--label">Study starred terms only</div>
                        <div className="form__row--option">SELECT OPTION</div>
                    </div>
                    <div className="form__row">
                        <div className="form__row--label">Number of questions</div>
                        <div className="form__row--option">TOGGLE SWITCH</div>
                    </div>
                    <div className="form__row">
                        <div className="form__row--label">Question format</div>
                        <div className="form__row--option">TOGGLE SWITCH</div>
                    </div>
                    <div className="form__row">
                        <div className="form__row--label">Audio</div>
                        <div className="form__row--option">TOGGLE SWITCH</div>
                    </div>
                </form>
            </div>
            
        </div>
    );
}