import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="w-[100%] bg-[#dbfcfcec] text-[#1e2223] flex flex-col md:flex-row justify-between px-[20px] md:px-[50px] py-[40px] gap-[30px] md:gap-0">

      {/* Logo & Description */}
      <div className="md:w-[35%] flex flex-col items-start gap-[15px]">
        <div className="flex items-center gap-[10px]">
          <img src={logo} alt="Logo" className="w-[40px] h-[40px]" />
          <h1 className="text-[20px] font-bold">ShoppingCart</h1>
        </div>
        <p className="text-[14px] md:text-[15px]">
          ShoppingCart is your all-in-one online shopping destination, offering top-quality products, unbeatable deals, and fast delivery—all backed by trusted service.
        </p>
        <p className="text-[14px] md:hidden">Fast. Easy. Reliable. OneCart Shopping</p>
      </div>

      {/* Company Links */}
      <div className="md:w-[25%] flex flex-col items-start gap-[10px]">
        <h2 className="text-[18px] md:text-[20px] font-semibold mb-[10px]">Company</h2>
        <ul className="flex flex-col gap-[8px]">
          <li>
            <Link to="/" className="cursor-pointer hover:text-blue-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="cursor-pointer hover:text-blue-500">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/collection" className="cursor-pointer hover:text-blue-500 hidden md:block">
              Collections
            </Link>
          </li>
          <li>
            <Link to="/contact" className="cursor-pointer hover:text-blue-500">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="md:w-[30%] flex flex-col items-start gap-[15px]">
        <h2 className="text-[18px] md:text-[20px] font-semibold mb-[10px]">Contact Us</h2>
        <p className="text-[14px] md:text-[15px]">Email: support@shoppingcart.com</p>
        <p className="text-[14px] md:text-[15px]">Phone: +91 9876543210</p>
        <p className="text-[14px] md:text-[15px]">Address: 123, Royal Street, India</p>
      </div>

    </footer>
  );
};

export default Footer;
