import React from "react";
import { Menu } from "../Menu/Menu";
import { Setting } from "../Setting/Setting";
import './Header.scss';

export const Header = () => {
    return (
        <header className="header">
            <Menu />
            <Setting />
        </header>
    );
};