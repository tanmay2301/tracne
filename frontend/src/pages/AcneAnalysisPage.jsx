import React, { useState, useEffect } from "react";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell
} from "recharts";

const AcneAnalysisPage = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch entries data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        
        const response = await fetch('/api/tracne', {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Include token in headers
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch entries');
        }
        
        const data = await response.json();
        setEntries(data.data || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching entries:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Prepare data for charts
  const prepareTimelineData = () => {
    return entries
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .map(entry => ({
        date: new Date(entry.createdAt).toLocaleDateString(),
        count: entry.acneCount,
        severity: entry.severity === "Mild" ? 1 : entry.severity === "Moderate" ? 2 : 3
      }));
  };

  const prepareAcneTypeData = () => {
    const typeCounts = {};
    entries.forEach(entry => {
      typeCounts[entry.acneType] = (typeCounts[entry.acneType] || 0) + 1;
    });
    
    return Object.keys(typeCounts).map(type => ({
      name: type,
      value: typeCounts[type]
    }));
  };
  
  const analyzeFoodCorrelations = () => {
    // Simple correlation analysis - more sophisticated analysis could be implemented
    const foods = {};
    
    // Extract all food items
    entries.forEach(entry => {
      const foodItems = entry.foodIntake.split(',').map(item => item.trim().toLowerCase());
      foodItems.forEach(food => {
        if (!foods[food]) foods[food] = { occurrences: 0, totalAcne: 0, entries: [] };
        foods[food].occurrences += 1;
        foods[food].totalAcne += entry.acneCount;
        foods[food].entries.push(entry);
      });
    });
    
    // Calculate average acne count for each food
    const foodCorrelations = Object.keys(foods)
      .filter(food => foods[food].occurrences >= 2) // Only foods that appear multiple times
      .map(food => ({
        name: food,
        occurrences: foods[food].occurrences,
        averageAcne: Math.round((foods[food].totalAcne / foods[food].occurrences) * 10) / 10
      }))
      .sort((a, b) => b.averageAcne - a.averageAcne) // Sort by highest average
      .slice(0, 10); // Top 10 correlations
      
    return foodCorrelations;
  };
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  if (loading) return <div className="container mx-auto px-4 py-8 mt-5">Loading analysis data...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 mt-5">Error loading data: {error}</div>;
  if (entries.length < 3) return (
    <div className="container mx-auto px-4 py-8 mt-5">
      <h1 className="text-4xl font-bold text-teal-800 mb-6">Acne Analysis</h1>
      <p className="text-xl">You need at least 3 entries to generate meaningful analysis. Please continue tracking your acne to see insights.</p>
    </div>
  );

  const timelineData = prepareTimelineData();
  const acneTypeData = prepareAcneTypeData();
  const foodCorrelations = analyzeFoodCorrelations();

  return (
    <div className="container mx-auto px-4 py-8 mt-5">
      <h1 className="text-3xl font-bold text-teal-800 mb-6">Acne Analysis</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Your Acne Progress Over Time</h2>
        <div className="border rounded-lg shadow p-6 bg-white">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" name="Acne Count" />
              <Line type="monotone" dataKey="severity" stroke="#82ca9d" name="Severity (1-3)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <section>
          <h2 className="text-2xl font-semibold text-teal-700 mb-4">Acne Type Distribution</h2>
          <div className="border rounded-lg shadow p-6 bg-white">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={acneTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {acneTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-teal-700 mb-4">Food and Acne Correlation</h2>
          <div className="border rounded-lg shadow p-6 bg-white">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={foodCorrelations} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="averageAcne" fill="#FF8042" name="Avg Acne Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Key Insights</h2>
        <div className="border rounded-lg shadow p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-teal-50 p-4 rounded">
              <h3 className="font-semibold text-lg mb-2">Overall Trend</h3>
              <p className="text-gray-700">
                {timelineData.length > 0 && timelineData[0].count > timelineData[timelineData.length-1].count 
                  ? "Your acne count is decreasing over time! Keep up the good work."
                  : "Your acne count has fluctuated. Consider reviewing your skincare routine."}
              </p>
            </div>
            
            <div className="bg-teal-50 p-4 rounded">
              <h3 className="font-semibold text-lg mb-2">Most Common Type</h3>
              <p className="text-gray-700">
                {acneTypeData.length > 0 
                  ? `Your most common acne type is ${acneTypeData.sort((a, b) => b.value - a.value)[0].name}.`
                  : "Not enough data to determine most common acne type."}
              </p>
            </div>
            
            <div className="bg-teal-50 p-4 rounded">
              <h3 className="font-semibold text-lg mb-2">Food Correlation</h3>
              <p className="text-gray-700">
                {foodCorrelations.length > 0 
                  ? `${foodCorrelations[0].name} appears to correlate with higher acne counts.`
                  : "No clear food correlations identified yet."}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Skincare Product Analysis</h2>
        <div className="border rounded-lg shadow p-6 bg-white">
          <p className="text-gray-600 mb-4">
            Based on your entries, here are some observations about your skincare products:
          </p>
          <div className="space-y-2">
            {analyzeSkincareProducts(entries).map((item, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded">
                <strong>{item.product}:</strong> Used {item.count} times with average acne count of {item.avgAcne}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper function to analyze skincare products
function analyzeSkincareProducts(entries) {
  const products = {};
  
  entries.forEach(entry => {
    if (Array.isArray(entry.skincareProducts)) {
      entry.skincareProducts.forEach(product => {
        const cleanProduct = product.trim();
        if (!cleanProduct) return;
        
        if (!products[cleanProduct]) {
          products[cleanProduct] = { count: 0, totalAcne: 0 };
        }
        
        products[cleanProduct].count += 1;
        products[cleanProduct].totalAcne += entry.acneCount;
      });
    }
  });
  
  return Object.keys(products)
    .map(product => ({
      product,
      count: products[product].count,
      avgAcne: Math.round((products[product].totalAcne / products[product].count) * 10) / 10
    }))
    .sort((a, b) => a.avgAcne - b.avgAcne) // Sort by lowest average acne count first
    .slice(0, 5); // Show top 5 products
}

export default AcneAnalysisPage;