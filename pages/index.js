import React from "react";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-4xl font-extrabold mb-4 text-gray-800">Selamat Datang di Website Saya!</h1>
                <p className="text-lg font-medium mb-6 text-gray-600">Ini adalah halaman utama.</p>

                <div className="grid gap-4">
                    <Link
                        href="/about"
                        className="block w-full py-2 px-4 text-lg text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow transition duration-300 text-center"
                    >
                        Tentang Kami
                    </Link>
                    <Link
                        href="/blog"
                        className="block w-full py-2 px-4 text-lg text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow transition duration-300 text-center"
                    >
                        Blog
                    </Link>
                    <Link
                        href="/products"
                        className="block w-full py-2 px-4 text-lg text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow transition duration-300 text-center"
                    >
                        Produk
                    </Link>
                    <Link
                        href="/users"
                        className="block w-full py-2 px-4 text-lg text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow transition duration-300 text-center"
                    >
                        User
                    </Link>
                    <Link
                        href="/weather"
                        className="block w-full py-2 px-4 text-lg text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow transition duration-300 text-center"
                    >
                        Cuaca (Weather)
                    </Link>
                </div>
            </div>
        </div>
    );
}
