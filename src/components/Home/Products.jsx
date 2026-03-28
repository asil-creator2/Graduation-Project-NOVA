import { use, useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import Category from './Category';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadMore,setLoadMore] = useState(false)
    const searchQuery = useSelector((state) => state.search.query)
    const activeCategory = useSelector((state) => state.category.text)

    useEffect(() => {
        const getProducts = async () => {
            const url = `https://sandbox.mockerito.com/ecommerce/api${
                (activeCategory === 'all' ? activeCategory : activeCategory.payload) === 'all' ? '/products' : `/products/category/${activeCategory.payload}`
            }`;

            try {
                
                const response = await fetch(url);
                                
                const data = await response.json();
                console.log(activeCategory)
                console.log(data)
                 if (Array.isArray(data)) {
                    setProducts(data);
                } else if (data && Array.isArray(data.products)) {
                    setProducts(data.products);
                }
                setLoading(false);
            } catch (error) {
                console.error("An error occurred:", error);
                setLoading(false);
            }
        };


        getProducts();
    }, [activeCategory]);

    

    // Filter products based on active category
    const filteredProducts = products.filter(product => 
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const firstHalf = filteredProducts.slice(0, 8);
    const secondHalf = filteredProducts.slice(8);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className='dark:bg-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800'>
            {/* Category Filters - Responsive */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 md:mb-12 px-2 ">
                <Category/>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {firstHalf.map((item) => (
                    
                     <ProductCard key={item.id} item={item}/>
                ))}
            </div>
            <div className={`${loadMore ? 'grid' : 'hidden'}  grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 `}>
                {secondHalf.map((item) => (
                    
                     <ProductCard key={item.id} item={item}/>
                ))}
            </div>
            <div className='flex items-center justify-center mt-6'>
                <button 
                className={`border-2 border-gray-500 px-6 py-3 text-gray-500 rounded-xl font-black text-md ${loadMore ? 'hidden' : 'block'}`}
                onClick={() => {setLoadMore(true)}}
                >Load More</button>
            </div>

            {/* Empty state */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No products found.</p>
                </div>
            )}
        </div>
    );
};

export default Products;