import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ProductPage from "./Pages/products/ProductPage";
import CategoryPage from "./Pages/CategoryPage";
import NotFoundPage from "./Pages/NotFoundPage";
import SettingPage from "./Pages/SettingPage";
import Dashboard from "./Pages/DashboardPage";
import BrandPage from "./Pages/BrabdPage";
import RolePage from "./Pages/RolePage"; 
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/"         element={<Dashboard />} />
          <Route path="/*"        element={<NotFoundPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/brand"    element={<BrandPage />} />
          <Route path="/product"  element={<ProductPage />} />
          <Route path="/setting"  element={<SettingPage />} />
          <Route path="/role"     element ={<RolePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
