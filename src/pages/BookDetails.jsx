import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = useSelector(state => 
    state.books.books.find(b => b.id === parseInt(id))
  );

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Book not found</h2>
          <button 
            onClick={() => navigate(-1)}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{book.title}</h2>
            <div className="space-y-4">
              <p className="text-lg">
                <span className="font-semibold text-gray-700">Author: </span>
                <span className="text-gray-600">{book.author}</span>
              </p>
              <p className="text-lg">
                <span className="font-semibold text-gray-700">Category: </span>
                <span className="text-gray-600">{book.category}</span>
              </p>
              <p className="text-lg">
                <span className="font-semibold text-gray-700">Rating: </span>
                <span className="text-gray-600">{book.rating} / 5</span>
              </p>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{book.description}</p>
              </div>
              {book.image ? (
 <img src={book.image} alt={book.title} className="w-full h-40 object-contain mb-4 rounded" />) : (
  <div className="w-full h-40 flex items-center justify-center bg-gray-200 mb-4 rounded">
    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
    </svg>
  </div>
)}
            </div>
            <button
              onClick={() => navigate(-1)}
              className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 inline-flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Browse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
