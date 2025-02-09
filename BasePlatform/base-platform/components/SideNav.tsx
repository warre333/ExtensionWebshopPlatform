"use client"

import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';

export default function SideNav() {
    const [menuOpen, setMenuOpen] = React.useState(false);
    return (
        <>
            <div className="relative">
                <Button variant="ghost" size="icon" className='ml-2 mt-2 lg:hidden flex items-center justify-center' onClick={() => setMenuOpen(true)}>	
                    <svg className="w-6 h-6 transform -scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </Button>
                <nav className="w-64 flex-shrink-0 border-r h-full bg-gray-50 lg:block hidden">
                    <div className="container mx-auto h-full flex flex-col gap-6 items-start text-left pt-12 lg:pl-16">
                        <Link href="/admin" className="hover:underline">
                            Dashboard
                        </Link>
                        <Link href="/admin/orders" className="hover:underline">
                            Orders
                        </Link>
                        <Link href="/admin/products" className="hover:underline">
                            Products
                        </Link>
                        <Link href="/admin/extensions" className="hover:underline">
                            Extensions
                        </Link>
                        <Link href="/admin/store" className="hover:underline w-full">
                            Store
                        </Link>
                    </div>
                </nav>
                {/* Mobile Menu */}	
                { menuOpen && (
                    <nav className="w-full flex-shrink-0 border-r h-full bg-gray-50 lg:hidden block fixed top-16 left-0 z-40" id="menu">
                        <Button variant="ghost" size="icon" className='ml-2 mt-2 lg:hidden z-50 flex items-center justify-center' onClick={() => setMenuOpen(false)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </Button>
                        <div className="container mx-auto h-full flex flex-col gap-6 items-start text-center pt-12 lg:pl-16 mt-16">
                            <Link href="/admin" className="hover:underline w-full">
                                Dashboard
                            </Link>
                            <Link href="/admin/orders" className="hover:underline w-full">
                                Orders
                            </Link>
                            <Link href="/admin/products" className="hover:underline w-full">
                                Products
                            </Link>
                            <Link href="/admin/extensions" className="hover:underline w-full">
                                Extensions
                            </Link>
                            <Link href="/admin/store" className="hover:underline w-full">
                                Store
                            </Link>
                        </div>
                    </nav>
                )}
            </div>
        </>
    );
};