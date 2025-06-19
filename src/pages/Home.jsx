import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { categories } from '../data/books';

const Home = () => {
  const books = useSelector(state => state.books.books);
  const popularBooks = books.filter(book => book.popular);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Online Library</h1>
          <p className="text-lg text-gray-600">Discover your next favorite book</p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map(category => (
              <Link
                key={category}
                to={`/browse/${category}`}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center hover:bg-gray-50"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Popular Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularBooks.map(book => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-4">{book.author}</p>
                  {book.image ? (
 <img src={book.image} alt={book.title} className="w-full h-40 object-contain mb-4 rounded" />) : (
  <div className="w-full h-40 flex items-center justify-center bg-gray-200 mb-4 rounded">
    <svg className="w-12 h-12 text-gray-400" fill="space" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
    </svg>
  </div>
)}
                  <Link
                    to={`/book/${book.id}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
