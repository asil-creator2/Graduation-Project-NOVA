import Products from '../components/Home/Products';
import NewsLetter from '../components/Home/NewsLetter';
import Header from '../components/Home/Header';
import Features  from '../components/Home/Features';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50" id='home'>
      
      {/* Add padding top to account for fixed navbar */}
      <div className="pt-16 md:pt-20">
        {/* ========== HERO SECTION ========== */}
        <Header/>

        {/* ========== PRODUCTS SECTION ========== */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" id='shop'>
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-3 md:mb-4">
              Curated Just For You
            </h2>
            <p className="text-gray-500 text-center max-w-2xl mx-auto text-sm sm:text-base px-4">
              Discover our handpicked selection of premium products from top brands
            </p>
          </div>
          {/* PRODUCTS WITH CATEGORY FILTERS */}
          <Products/>
        
        </main>

        {/* ========== FEATURES SECTION ========== */}
        <Features/>
        {/* ========== NEWSLETTER SECTION ========== */}
        <NewsLetter/>

      </div>
    </div>
  );
};

export default Home;