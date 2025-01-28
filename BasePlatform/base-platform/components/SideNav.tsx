"use client"

import React from 'react';
import Link from 'next/link';

export default function SideNav() {
    return  (        
        <nav className="w-64 flex-shrink-0 border-r h-full bg-gray-50">
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
            </div>
        </nav>
    );
};