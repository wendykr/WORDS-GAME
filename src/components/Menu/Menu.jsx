import React, { useState } from 'react';
import './Menu.scss';

import { LuAlignJustify } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';

export const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={`menu ${isOpen ? 'menu--xmark' : 'menu--bars'}`} onClick={handleClick}>
            {isOpen ? (
                <RxCross2 className="icon-menu" title="Menu icon" />
            ) : (
                <LuAlignJustify className="icon-menu" title="Menu icon" />
            )}
        </div>
    );
};