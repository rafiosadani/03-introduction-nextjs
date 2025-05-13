import { useState, useEffect } from "react";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
        const response = await fetch("/api/products");
        const products = await response.json();
        setProducts(products);
    };

    fetchProducts();

    }, []);

    return (
        <div className="pt-12 px-24 bg-gray-100">
            <h1 className="text-3xl text-gray-700 font-bold mb-12 text-center">Daftar Produk</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white shadow-md rounded-lg overflow-hidden border hover:scale-102 transition-transform duration-300"
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            className="h-48 w-full object-contain p-4 bg-gray-50"
                        />
                        <div className="p-4">
                            <h2 className="text-lg text-gray-600 font-semibold mb-3 line-clamp-2">{product.title}</h2>
                            <p className="text-sm text-gray-600 line-clamp-2 text-justify">{product.description}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-xl font-bold text-green-600">${product.price}</span>
                                <span className="text-sm text-gray-500">{product.category}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
