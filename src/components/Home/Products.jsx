import { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import ProductCard from './ProductCard';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [loadMore,setLoadMore] = useState(false)
    const searchQuery = useSelector((state) => state.search.query)

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.log("An error occurred\n", error);
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    const categories = [
        { name: 'All', icon: '✨' },
        { name: 'Electronics', icon: '💻' },
        { name: `Men's clothing`, icon: '👕' },
        { name: `Women's clothing`, icon: '👚' },
        { name: 'jewelery', icon: '💍' },
    ];

    // Filter products based on active category
    const filteredProducts = products.filter(product => {
        const matchesSearch = searchQuery === '' || 
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory.toLowerCase();
        
        return matchesSearch && matchesCategory;
    });
    
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
                {categories.map((cat) => (
                    <button
                        key={cat.name}
                        onClick={() => setActiveCategory(cat.name)}
                        className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-1 sm:gap-2 text-sm sm:text-base ${
                            activeCategory === cat.name
                                ? 'bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-lg scale-105'
                                : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
                        }`}
                    >
                        <span className="text-base sm:text-lg">{cat.icon}</span>
                        <span className="hidden xs:inline">{cat.name}</span>
                        <span className="xs:hidden">{cat.name}</span>
                    </button>
                ))}
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