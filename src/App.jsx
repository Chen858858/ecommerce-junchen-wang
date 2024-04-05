import { useEffect, useState } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { Navigate, useNavigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import "./bulma1.css"
import SearchPage from "./pages/SearchPage";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import ItemPage from "./pages/ItemPage";
import DeletePage from "./pages/DeletePage";

function App() {

  // Fetch original items.
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // Fetch original items.
  useEffect(() => {
    const getItems = async() => {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      setItems(data.products);
    };
    getItems();
  }, []);
  
  // Fetch categories.
  useEffect(() => {
    const getCategories = async() => {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();
      setCategories(data);
    };
    getCategories();
  }, []);

  // Add item function.
  const addItem = async (newItem) => {
    const res = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem)
    });
    let modifiedItems = [...items];
    modifiedItems.push(newItem);
    setItems(modifiedItems);
    return;
  };

  // Edit item function.
  const editItem = async (id, modifiedItem) => {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...modifiedItem})});
    const itemIdx = items.findIndex(item => item.id == id);
    let modifiedItems = [...items];
    modifiedItems[itemIdx] = {...modifiedItem};
    setItems([...modifiedItems]);
    return;
  };

  // Delete item function.
  const deleteItem = async (id) => {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE"
    })
    const itemIdx = items.findIndex(item => item.id == id);
    let modifiedItems = [...items];
    modifiedItems.splice(itemIdx, 1);
    setItems([...modifiedItems]);
    return;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<SearchPage items={items} categories={categories} />}></Route>
        <Route path="/search" element={<SearchPage items={items} categories={categories} />}></Route>
        <Route path="/add" element={<AddPage items={items} categories={categories} addItem={addItem} />}></Route>
        <Route path="/edit/:id" element={<EditPage items={items} categories={categories} editItem={editItem} />}></Route>
        <Route path="/item/:id" element={<ItemPage items={items} />}></Route>
        <Route path="/delete/:id" element={<DeletePage items={items} deleteItem={deleteItem} />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  )
}

export default App
