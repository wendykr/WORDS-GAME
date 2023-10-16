import React from 'react';
import './Footer.scss';

export const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer__text">
                © 2023 <a target="_blank"  rel="noopener noreferrer" className="footer__link" href="https://github.com/wendykr/">Vendula Krajíčková</a>
            </p>
            <p className="footer__text">
                Program project <a className="footer__link" href="https://reactgirls.com/mentoring">ReactGirls Mentoring</a>
            </p>
        </footer>
    );
}