import React, { useEffect, useState } from 'react';

export default function Home() {
  const [paintings, setPaintings] = useState([]);
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch ข้อมูลทั้งหมดของภาพวาด
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/paintine')
      .then(response => response.json())
      .then(data => setPaintings(data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Fetch ข้อมูลเฉพาะภาพวาดที่เลือกโดยใช้ ID
  const fetchPaintingById = (id) => {
    fetch(`http://127.0.0.1:8000/api/paintine/${id}`)
      .then(response => response.json())
      .then(data => {
        setSelectedPainting(data.data);
        setShowModal(true);  // แสดง modal เมื่อข้อมูลถูกโหลด
      })
      .catch(error => console.error('Error fetching painting:', error));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Art Gallery</h1>

      {/* Grid การ์ดแสดงข้อมูล */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paintings.map((painting) => (
          <div key={painting.id} className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
               onClick={() => fetchPaintingById(painting.id)}>
            <img src={painting.image_path} alt={painting.title} className="w-full h-64 object-cover"/>
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{painting.title}</h2>
              <p className="text-gray-600">{painting.artist_name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedPainting && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg overflow-hidden w-3/4 lg:w-1/2 shadow-lg p-8">
            <button className="text-red-500 font-bold text-right" onClick={() => setShowModal(false)}>X</button>
            <img src={selectedPainting.image_path} alt={selectedPainting.title} className="w-full h-64 object-cover mb-4"/>
            <h2 className="text-3xl font-bold mb-4">{selectedPainting.title}</h2>
            <p><strong>Artist:</strong> {selectedPainting.artist_name}</p>
            <p><strong>Medium:</strong> {selectedPainting.medium}</p>
            <p><strong>Style:</strong> {selectedPainting.style}</p>
            <p><strong>Year Created:</strong> {selectedPainting.year_created}</p>
            <p><strong>Dimensions:</strong> {selectedPainting.dimensions}</p>
            <p><strong>Price:</strong> ${selectedPainting.price}</p>
            <p><strong>Location:</strong> {selectedPainting.location || 'Unknown'}</p>
            <p><strong>Exhibition Date:</strong> {selectedPainting.exhibition_date}</p>
            <p><strong>Gallery:</strong> {selectedPainting.gallery}</p>
            <p><strong>Sold:</strong> {selectedPainting.is_sold ? 'Yes' : 'No'}</p>
            <p><strong>Category:</strong> {selectedPainting.category}</p>
            <p><strong>Rating:</strong> {selectedPainting.rating}</p>
          </div>
        </div>
      )}
    </div>
  );
}
