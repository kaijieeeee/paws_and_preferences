import { useState, useEffect } from 'react';
import axios from 'axios';
import CardStack from './components/CardStack';

export default function App() {
  const [cats, setCats] = useState([]);
  const [likedCats, setLikedCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axios.get('https://cataas.com/api/cats?limit=20');
        setCats(res.data.map(cat => ({
          ...cat,
          url: `https://cataas.com/cat/${cat.id}`
        })));
      } catch (error) {
        console.error("Error fetching cats:", error);
      }
    };
    fetchCats();
  }, []);
  const handleSwipe = (cat, action) => {
    if (action === 'like') {
      setLikedCats([...likedCats, cat]);
    }
  };
  const restart = () => {
    setLikedCats([]);
    setCurrentIndex(0);
  };

  if (currentIndex >= cats.length && cats.length > 0) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            You liked {likedCats.length} {likedCats.length === 1 ? 'cat' : 'cats'}!
          </h2>

          {likedCats.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {likedCats.map((cat) => (
                <img
                  key={cat.id}
                  src={cat.url}
                  className="w-full h-40 object-cover rounded-lg shadow"
                  alt="Liked cat"
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              You didn't like any cats :/
            </p>
          )}
          <button
            onClick={restart}
            className="mt-8 w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      {cats.length > 0 ? (
        <CardStack
          cats={cats}
          onSwipe={handleSwipe}
          currentIndex={currentIndex}
          onIndexChange={setCurrentIndex}
        />
      ) : (
        <div className="text-center py-8">Loading cats...</div>
      )}
    </div>
  );
}