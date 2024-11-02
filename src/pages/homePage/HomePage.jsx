import React from "react";
import { Navigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch/useFetch";
import "./home.scss";

const HomePage = () => {
  const token = localStorage.getItem("token");

  const baseURL = import.meta.env.VITE_BASE_URL;

  const {
    data: categories,
    isPending,
    error,
  } = useFetch(`${baseURL}categories`);

  return token ? (
    <div className="homePage">
      <table id="customers">
        <thead>
          <tr>
            <th>N/0</th>
            <th>Nom-En</th>
            <th>Nom-Ru</th>
            <th>Rasmlar</th>
            <th>Tahrirlash</th>
            <th>O'chirish</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories?.data.data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name_en}</td>
                <td>{item.name_ru}</td>
                <td>
                  <img
                    width={40}
                    height={40}
                    src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`}
                    alt={item.name_en}
                  />
                </td>
                <td>
                  <button>Edit</button>
                </td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isPending && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default HomePage;
