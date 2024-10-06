import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../App";

export default function Admin() {
  const { token } = useContext(DataContext); // Token จาก Context
  const [data, setData] = useState([]); // ข้อมูลทั้งหมด
  const [showModal, setShowModal] = useState(false); // สำหรับเปิด/ปิด modal
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    artist_name: "",
    medium: "",
    style: "",
    year_created: "",
    dimensions: "",
    price: "",
    location: "",
    image_path: "",
    exhibition_date: "",
    gallery: "",
    is_sold: false,
    category: "",
    rating: "",
  });
  const [editMode, setEditMode] = useState(false); // สถานะการแก้ไขหรือเพิ่มข้อมูล
  const [currentId, setCurrentId] = useState(null); // ID ของข้อมูลที่แก้ไข

  // Fetch ข้อมูลจาก API เมื่อโหลดหน้า
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://127.0.0.1:8000/api/paintine", {
      headers: {
        Authorization: `Bearer ${token}`, // ใส่ token เพื่อ authentication (ถ้ามี)
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  // ฟังก์ชันในการเปิด modal พร้อมเคลียร์ข้อมูล (สำหรับการเพิ่มข้อมูลใหม่)
  const handleCreate = () => {
    setFormData({ title: "", description: "", artist_name: "", price: "" });
    setEditMode(false); // สถานะเป็นการเพิ่มข้อมูล
    setShowModal(true); // เปิด modal
  };

// ฟังก์ชันเปิด modal พร้อมข้อมูลเพื่อแก้ไข
const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      artist_name: item.artist_name,
      medium: item.medium,
      style: item.style,
      year_created: item.year_created,
      dimensions: item.dimensions,
      price: item.price,
      location: item.location,
      image_path: item.image_path,
      exhibition_date: item.exhibition_date,
      gallery: item.gallery,
      is_sold: item.is_sold,
      category: item.category,
      rating: item.rating,
    });
    setCurrentId(item.id); // เก็บ ID ของข้อมูลที่จะแก้ไข
    setEditMode(true); // สถานะเป็นการแก้ไข
    setShowModal(true); // เปิด modal
  };
  

  // ฟังก์ชันลบข้อมูล
  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/paintine/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => fetchData()) // อัปเดตข้อมูลหลังลบ
      .catch((error) => console.error("Error deleting data:", error));
  };

  // ฟังก์ชันสำหรับส่งข้อมูลใหม่หรือแก้ไขข้อมูล
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editMode
      ? `http://127.0.0.1:8000/api/paintine/${currentId}` // ถ้าเป็นโหมดแก้ไขให้ใช้ PUT
      : "http://127.0.0.1:8000/api/paintine"; // ถ้าเป็นโหมดสร้างใหม่ให้ใช้ POST
    const method = editMode ? "PUT" : "POST"; // Method ที่ใช้

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        fetchData(); // อัปเดตข้อมูลหลังส่ง
        setShowModal(false); // ปิด modal
      })
      .catch((error) => console.error("Error saving data:", error));
  };
  console.log('data', formData)

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Admin Panel :: Your token {token}
      </h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleCreate}
      >
        Create New Item
      </button>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 text-start">Title</th>
            <th className="py-2 text-start">Artist</th>
            <th className="py-2 text-start">Price</th>
            <th className="py-2 text-start">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="py-2">{item.title}</td>
              <td className="py-2">{item.artist_name}</td>
              <td className="py-2">${item.price}</td>
              <td className="py-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 w-96">
            <h2 className="text-2xl mb-4">
              {editMode ? "Edit Item" : "Create New Item"}
            </h2>
            <div className="max-h-screen overflow-y-auto">
            <form
              onSubmit={handleSubmit}
              className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg overflow-y-auto"
            >
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Artist Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={formData.artist_name}
                  onChange={(e) =>
                    setFormData({ ...formData, artist_name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex flex-wrap -mx-2">
                <div className="mb-4 w-full md:w-1/2 px-2">
                  <label className="block text-gray-700">Medium</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.medium}
                    onChange={(e) =>
                      setFormData({ ...formData, medium: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-4 w-full md:w-1/2 px-2">
                  <label className="block text-gray-700">Style</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.style}
                    onChange={(e) =>
                      setFormData({ ...formData, style: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-2">
                <div className="mb-4 w-full md:w-1/2 px-2">
                  <label className="block text-gray-700">Year Created</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.year_created}
                    onChange={(e) =>
                      setFormData({ ...formData, year_created: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-4 w-full md:w-1/2 px-2">
                  <label className="block text-gray-700">Dimensions</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.dimensions}
                    onChange={(e) =>
                      setFormData({ ...formData, dimensions: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-2">
                <div className="mb-4 w-full md:w-1/2 px-2">
                  <label className="block text-gray-700">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>

                <div className="mb-4 w-full md:w-1/2 px-2">
                  <label className="block text-gray-700">Location</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-2">
                <div className="mb-4 w-full md:w-1/2 px-2">
                  <label className="block text-gray-700">Image Path</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.image_path}
                    onChange={(e) =>
                      setFormData({ ...formData, image_path: e.target.value })
                    }
                  />
                </div>

                <div className="mb-4 w-full md:w-1/2 px-2">
                  <label className="block text-gray-700">Exhibition Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.exhibition_date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        exhibition_date: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Gallery</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={formData.gallery}
                  onChange={(e) =>
                    setFormData({ ...formData, gallery: e.target.value })
                  }
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Is Sold</label>
                <input
                  type="checkbox"
                  checked={formData.is_sold}
                  onChange={(e) =>
                    setFormData({ ...formData, is_sold: e.target.checked })
                  }
                />
              </div>

              <div className="flex flex-wrap -mx-2">
                <div className="mb-4 w-full md:w-1/2 px-2">
                  <label className="block text-gray-700">Category</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  />
                </div>

                <div className="mb-4 w-full md:w-1/2 px-2">
                  <label className="block text-gray-700">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {editMode ? "Update" : "Create"}
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
