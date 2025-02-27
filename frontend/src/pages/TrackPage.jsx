import { useState, useEffect } from "react";
import { CalendarIcon, ChevronDown, Upload, Edit, Trash2 } from "lucide-react";

export default function TrackPage() {
  console.log("📌 TrackPage Mounted");
  const [pastEntries, setPastEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    foodIntake: "",
    skincareProducts: "",
    acneCount: "",
    acneType: "",
    severity: "",
    notes: "",
    image: null
  });

  // Fetch all entries on component mount
  useEffect(() => {
    console.log(" TrackPage useEffect Running");
    fetchEntries();
  }, []);

  // Fetch entries from the backend
  const fetchEntries = async () => {
    setLoading(true);
    setError(null);

    try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        console.log(" Fetching Entries - Token:", token); // Debugging

        const response = await fetch("/api/tracne", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Send token in headers
            }
        });

        console.log(" API Response Status:", response.status); // Debugging

        if (!response.ok) {
            throw new Error(`Failed to fetch entries (Status: ${response.status})`);
        }

        const data = await response.json();
        console.log(" Received Data:", data); // Debugging

        setPastEntries(data.data || []);
    } catch (err) {
        setError(err.message);
        console.error(" Error fetching entries:", err);
    } finally {
        setLoading(false);
    }
  };


  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          image: event.target.result // This will be a base64 data URL
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit form to create or update an entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      
      // Format the data for submission
      const entryData = {
        foodIntake: formData.foodIntake,
        skincareProducts: formData.skincareProducts.split(',').map(item => item.trim()),
        acneCount: parseInt(formData.acneCount),
        acneType: formData.acneType,
        severity: formData.severity,
        notes: formData.notes || undefined,
        image: formData.image || undefined
      };

     
      let response;
      
      if (editingId) {
        // Update existing entry
        response = await fetch(`/api/tracne/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include token in headers
          },
          body: JSON.stringify(entryData),
        });
      } else {
        // Create new entry
        response = await fetch('/api/tracne', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include token in headers
          },
          body: JSON.stringify(entryData),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save entry');
      }

      // Reset form and fetch updated entries
      resetForm();
      fetchEntries();
    } catch (err) {
      setError(err.message);
      console.error("Error saving entry:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete an entry
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) {
      return;
    }
    
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      
      const response = await fetch(`/api/tracne/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // Include token in headers
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete entry');
      }

      // Fetch updated entries
      fetchEntries();
    } catch (err) {
      setError(err.message);
      console.error("Error deleting entry:", err);
    } finally {
      setLoading(false);
    }
  };

  // Edit an entry
  const handleEdit = (entry) => {
    setEditingId(entry._id);
    setFormData({
      foodIntake: entry.foodIntake || "",
      skincareProducts: Array.isArray(entry.skincareProducts) ? entry.skincareProducts.join(", ") : "",
      acneCount: entry.acneCount || "",
      acneType: entry.acneType || "",
      severity: entry.severity || "",
      notes: entry.notes || "",
      image: entry.image || null
    });
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      foodIntake: "",
      skincareProducts: "",
      acneCount: "",
      acneType: "",
      severity: "",
      notes: "",
      image: null
    });
    setEditingId(null);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-5">
      <h1 className="text-3xl font-bold text-teal-800 mb-2">
        Track Your Acne Progress
      </h1>

      <section className="mb-12">
        <p className="text-gray-900 mb-4 text-md">
          Log your daily acne status, diet, and skincare routine to track your
          progress over time.<br></br> This information will help you identify patterns
          and improve your skincare regimen.
        </p>
      </section>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <section className="mb-12 ">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">
          {editingId ? "Edit Entry" : "Today's Entry"}
        </h2>
        <div className="border rounded-lg shadow p-6 w-full max-w-3xl">
          <div className="mb-4 flex items-center">
            <CalendarIcon className="mr-2 text-teal-800" />
            <h3 className="text-xl text-teal-800 font-semibold">
              {editingId ? "Editing entry" : new Date().toLocaleDateString()}
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            {editingId ? "Update your acne status" : "Record your acne status for today"}
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="foodIntake" className="font-medium">
                  Food Intake
                </label>
                <input
                  id="foodIntake"
                  placeholder="What did you eat today?"
                  required
                  className="w-full border p-2 rounded-md"
                  value={formData.foodIntake}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="skincareProducts" className="font-medium">
                  Skincare Products
                </label>
                <input
                  id="skincareProducts"
                  placeholder="e.g., Cleanser, Moisturizer"
                  required
                  className="w-full border p-2 rounded-md"
                  value={formData.skincareProducts}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="acneCount" className="font-medium">
                  Acne Count
                </label>
                <input
                  type="number"
                  id="acneCount"
                  placeholder="Number of acne spots"
                  required
                  className="w-full border p-2 rounded-md"
                  value={formData.acneCount}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="acneType" className="font-medium">
                  Acne Type
                </label>
                <select
                  id="acneType"
                  required
                  className="w-full border p-2 rounded-md"
                  value={formData.acneType}
                  onChange={handleChange}
                >
                  <option value="">Select acne type</option>
                  <option value="Blackheads">Blackheads</option>
                  <option value="Whiteheads">Whiteheads</option>
                  <option value="Papules">Papules</option>
                  <option value="Pustules">Pustules</option>
                  <option value="Nodules">Nodules</option>
                  <option value="Cysts">Cysts</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="severity" className="font-medium">
                Severity
              </label>
              <select
                id="severity"
                required
                className="w-full border p-2 rounded-md"
                value={formData.severity}
                onChange={handleChange}
              >
                <option value="">Select severity</option>
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
              </select>
            </div>

            <div>
              <label htmlFor="notes" className="font-medium">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                placeholder="Any additional observations or treatments used"
                className="w-full border p-2 rounded-md"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="image" className="font-medium">
                Upload Image (Optional)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="flex-grow border p-2 rounded-md"
                  onChange={handleFileChange}
                />
                <button type="button" className="p-2 border rounded-md cursor-pointer hover:bg-gray-300">
                  <Upload className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-red-300 cursor-pointer"
                onClick={resetForm}
              >
                {editingId ? "Cancel Edit" : "Cancel"}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 cursor-pointer"
                disabled={loading}
              >
                {loading ? "Saving..." : (editingId ? "Update Entry" : "Save Entry")}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">
          Past Entries
        </h2>
        {loading && !editingId && <p>Loading entries...</p>}
        <div className="space-y-4 overflow-auto break-words">
          {pastEntries.length === 0 && !loading ? (
            <p className="text-gray-600">No entries found. Start tracking today!</p>
          ) : (
            pastEntries.map((entry) => (
              <div
                key={entry._id}
                className="border rounded-lg shadow p-4 w-full max-w-3xl"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg text-teal-800 font-semibold">
                    {formatDate(entry.createdAt)}
                  </h3>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(entry)}
                      className="text-blue-500 hover:text-blue-900 cursor-pointer"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(entry._id)}
                      className="text-red-500 hover:text-red-900 cursor-pointer"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600">
                  <strong>Acne Count:</strong> {entry.acneCount} |{" "}
                  <strong>Type:</strong> {entry.acneType} |{" "}
                  <strong>Severity:</strong> {entry.severity}
                </p>
                <p className="text-gray-600">
                  <strong>Food Intake:</strong> {entry.foodIntake}
                </p>
                <p className="text-gray-600">
                  <strong>Skincare Products:</strong>{" "}
                  {Array.isArray(entry.skincareProducts) ? entry.skincareProducts.join(", ") : entry.skincareProducts}
                </p>
                {entry.notes && (
                  <p className="text-gray-600">
                    <strong>Notes:</strong> {entry.notes}
                  </p>
                )}
                {entry.image && (
                  <div className="mt-2">
                    <img 
                      src={entry.image} 
                      alt="Acne tracking" 
                      className="w-24 h-24 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        
      </section>
    </div>
  );
}