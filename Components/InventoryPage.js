import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import './InventoryPage.css'; // ✅ Make sure this CSS file is correctly imported

function InventoryPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar /> {/* ✅ Add Navbar at the top */}
      <div className="inventory-page-container">
        <h1 className="inventory-title">📦 Inventory Management</h1>

        <div className="inventory-buttons">
          <button onClick={() => navigate("/view-inventory")}>📜 View Inventory</button>
          <button onClick={() => navigate("/add-item")}>➕ Add Item</button>
          <button onClick={() => navigate("/update-item")}>🔄 Update Item</button>
          <button onClick={() => navigate("/delete-item")}>🗑 Delete Item</button>
          <button onClick={() => navigate("/low-stock")}>⚠️ Low Stock Alerts</button>
        </div>
      </div>
    </>
  );
}

export default InventoryPage;
