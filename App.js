// App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

// Import all your Components (make sure they have default exports)
import ViewPurchases from './Components/ViewPurchases';
import Home from "./Components/Home";
import About from "./Components/About";

import Work from "./Components/Work";
import Testimonial from "./Components/Testimonial";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import InventoryPage from "./Components/InventoryPage";
import VendorPage from "./Components/VendorPage";
import PurchasePage from "./Components/PurchasePage";
import RecipePage from "./Components/RecipePage";
import OrderPage from "./Components/OrderPage";
import ViewInventory from "./Components/ViewInventory";
import VendorListPage from './Components/VendorListPage';
import AddItem from "./Components/AddItem";
import UpdateItem from "./Components/UpdateItem";
import DeleteItem from "./Components/DeleteItem";
import LowStockAlert from "./Components/LowStockAlert";
import Signup from "./Components/Signup";
import ViewOrders from './Components/ViewOrders';
function App() {
  return (
    <Router>
      <Routes>
        {/* Inventory Management Routes */}
        <Route path="/view-inventory" element={<ViewInventory />} />
        <Route path="/view-vendors" element={<VendorListPage />} />     
        <Route path="/signup" element={<Signup />} />
        <Route path="/view-purchases" element={<ViewPurchases />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/update-item" element={<UpdateItem />} />
        <Route path="/delete-item" element={<DeleteItem />} />
        <Route path="/low-stock" element={<LowStockAlert />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/vendor" element={<VendorPage />} />
        <Route path="/purchase" element={<PurchasePage />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/view-orders" element={<ViewOrders />} />
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/testimonials" element={<Testimonial />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
