import { Link, useParams } from 'react-router';
import { 
  FaStar, FaStarHalfAlt, FaRegStar,
  FaShoppingCart, FaShare, FaTruck, FaUndo, FaShieldAlt, 
  FaMinus, FaPlus, FaArrowLeft, FaCheckCircle 
} from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart, decrement, increment } from '../Redux/cartSlice';
import { useEffect, useState } from 'react';

const ProductDetails = () => {
  const { id } = useParams(); // Get ID from URL
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`https://sandbox.mockerito.com/ecommerce/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);


  const renderStars = (rating) => {
    if (!product) return null;
    const rate = rating?.rate || rating || 0;
    const stars = [];
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="w-4 h-4 text-yellow-400 fill-current" />);
    }
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product not found</h2>
          <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition group">
            <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
            <span className="text-sm">Back to Shopping</span>
          </Link>
        </div>

        {/* Product Main Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column - Image */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-auto object-contain p-4"
            />
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Category */}
            <div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full capitalize">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {product.rating?.rate || product.rating} ({product.rating?.count || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <FaCheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">In Stock</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">• Ready to ship</span>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-lg">
                  <button 
                    className="p-3 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                    onClick={() => {dispatch(decrement(product))}}
                  >
                    <FaMinus className="w-3 h-3 text-gray-500" />
                  </button>
                  <span className="w-12 text-center text-gray-900 dark:text-white font-medium">
                    {product.quantity}
                  </span>
                  <button 
                    className="p-3 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                    onClick={() => {dispatch(increment(product))}}
v                  >
                    <FaPlus className="w-3 h-3 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                className="cursor-pointer flex-1 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-lg"
                onClick={() => dispatch(addToCart({...product, quantity: quantity}))}
              >
                <FaShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              
              <button className="cursor-pointer px-6 py-3 rounded-xl font-semibold border-2 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2">
                <FaShare className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Shipping & Returns Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-gray-200 dark:border-slate-700">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <FaTruck className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">Free Shipping</p>
                  <p className="text-xs text-gray-500">On orders $100+</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <FaUndo className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">Easy Returns</p>
                  <p className="text-xs text-gray-500">30-day policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <FaShieldAlt className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">Secure Checkout</p>
                  <p className="text-xs text-gray-500">100% secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200 dark:border-slate-700">
            <div className="flex gap-6">
              <button className="pb-3 text-sm font-medium text-blue-600 dark:text-blue-400 border-b-2 border-blue-600">
                Description
              </button>
              <button className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                Specifications
              </button>
              <button className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                Reviews
              </button>
            </div>
          </div>

          <div className="py-6">
            <p className="text-gray-600 dark:text-gray-300">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;