import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='px-4 lg:px-8 pt-12 pb-6 footer-section'>
            <section className="footer text-neutral pb-10">
                <div>
                    <span className="footer-title">Services</span>
                    <Link className="link link-hover">Emergency Checkup</Link>
                    <Link className="link link-hover">Monthly Checkup</Link>
                    <Link className="link link-hover">Weekly Checkup</Link>
                    <Link className="link link-hover">Deep Checkup</Link>
                </div>
                <div>
                    <span className="footer-title">Oral Health</span>
                    <Link className="link link-hover">Fluoride Treatment</Link>
                    <Link className="link link-hover">Cavity Filling</Link>
                    <Link className="link link-hover">Teath Whitening</Link>
                </div>
                <div>
                    <span className="footer-title">Our Address</span>
                    <Link className="link link-hover">New York - 101010 Hudson</Link>
                </div>
            </section>
            <section className="footer footer-center p-4 text-neutral">
                <div>
                    <p>Copyright © 2022 - All right reserved</p>
                </div>
            </section>
        </footer>
    );
};

export default Footer;