import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../redux/booksSlice';
import { categories } from '../data/books';

const AddBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
    rating: '',
    image: '', // Will store either a URL or a base64 string
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.author) newErrors.author = 'Author is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.rating || formData.rating < 0 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      dispatch(addBook(formData));
      navigate('/browse');
    } else {
      setErrors(newErrors);
    }
  };
  const handleImageInput = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, image: value });
  };

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Book</h2>
            
            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                />
                {errors.title && <span className="text-red-500 text-sm mt-1">{errors.title}</span>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Author"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                />
                {errors.author && <span className="text-red-500 text-sm mt-1">{errors.author}</span>}
              </div>

              <div>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && <span className="text-red-500 text-sm mt-1">{errors.category}</span>}
              </div>

              <div>
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 h-32"
                />
                {errors.description && <span className="text-red-500 text-sm mt-1">{errors.description}</span>}
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Rating (0-5)"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                />
                {errors.rating && <span className="text-red-500 text-sm mt-1">{errors.rating}</span>}
              </div>

              <div>
                <label>Book Image (URL or Upload):</label>
                <input
                  type="text"
                  placeholder="Paste image URL here"
                  value={formData.image.startsWith('http') ? formData.image : ''}
                  onChange={handleImageInput}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <div className="my-2 text-center">or</div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 font-medium"
              >
                Add Book
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
