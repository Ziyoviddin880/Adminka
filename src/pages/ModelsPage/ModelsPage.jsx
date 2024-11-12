import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch/useFetch";
import Button from "../../components/button/Button";
import Loadig from "../../components/loading/Loading";
import Table from "../../components/table/Table";
import { Delete } from "../../hooks/delete/Delete";
import { useCreate } from "../../hooks/usePost/useCreate";
import { updateHook } from "../../hooks/update/updateHook";
import Modal from "../../components/modal/Modal";

const BrandsPage = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [brandId, setBrandId] = useState("");
  const [updateData, setUpdateData] = useState([]);
  const [updateId, setUpdateId] = useState(null);

  const resetForm = () => {
    setName("");
    setUpdateData([]);
    setBrandId(null);
  };

  const postData = (e) => {
    e.preventDefault();
    const formData = new FormData();
    brandId && formData.append("brand_id", brandId);
    formData.append("name", name);
    if (updateData.length > 0) {
      updateHook(`${baseURL}models/${updateId}`, formData, fetchData);
    } else if (brandId) {
      useCreate(`${baseURL}models`, formData, fetchData);
    } else {
    }
    setOpenModal(false);
    resetForm();
    setUpdateData([]);
    setUpdateId(null);
  };

  const updateItem = (item) => {
    setUpdateData((prev) => [...prev, item]);
    setName(item.name);
    setBrandId(item.brand_id);
    setUpdateId(item.id);
  };

  const {
    data: models,
    isPending,
    error,
    fetchData,
  } = useFetch(`${baseURL}models`);
  const { data: brands } = useFetch(`${baseURL}brands`);
  return (
    <>
      <div className="homePage">
        <Table>
          <thead>
            <tr>
              <th>N/0</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Edits</th>
              <th>Deletes</th>
              <th>
                <Button onClick={() => setOpenModal(true)} success={true}>
                  Create
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {models &&
              models?.data.data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.brand_title}</td>
                  <td>
                    <Button
                      onClick={() => {
                        updateItem(item);
                        setOpenModal(true);
                      }}
                      success={true}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        Delete(`${baseURL}models/${item.id}`, fetchData);
                      }}
                      success={false}
                    >
                      Delete
                    </Button>
                  </td>
                  <td></td>
                </tr>
              ))}
          </tbody>
        </Table>
        {isPending && (
          <div style={{ textAlign: "center", paddingTop: "30px" }}>
            <Loadig width={60} />
          </div>
        )}
        {error && <h1>{error}</h1>}
      </div>

      {openModal && (
        <Modal resetForm={resetForm} setOpenModal={setOpenModal}>
          <form className="modal-form" onSubmit={postData}>
            <input
              value={name}
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Title"
            />
            <select
              required
              defaultValue={brandId}
              onChange={(e) => setBrandId(e.target.value)}
            >
              <option value="" disabled>
                Choose model
              </option>
              {brands?.data?.data?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
            <Button style={{ width: "100%" }} success={true}>
              {updateData.length > 0 ? "Edit" : "Add"}
            </Button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default BrandsPage;
