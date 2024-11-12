import { useState, useRef } from "react";
import { useFetch } from "../../hooks/useFetch/useFetch";
import Button from "../../components/button/Button";
import Loadig from "../../components/loading/Loading";
import Table from "../../components/table/Table";
import Modal from "../../components/modal/Modal";

import { Delete } from "../../hooks/delete/Delete";
import { useCreate } from "../../hooks/usePost/useCreate";
import { updateHook } from "../../hooks/update/updateHook";
const BrandsPage = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [openModal, setOpenModal] = useState(false);

  const [updateData, setUpdateData] = useState([]);
  const [updateId, setUpdateId] = useState(null);

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const pictureRef = useRef();

  const resetForm = () => {
    setName("");
    setText("");
    pictureRef.current.value = "";
    setUpdateData([]);
  };

  const {
    data: cities,
    isPending,
    error,
    fetchData,
  } = useFetch(`${baseURL}cities`);

  const postData = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("text", text);
    formData.append("images", pictureRef.current.files[0]);
    if (updateData.length > 0) {
      updateHook(`${baseURL}cities/${updateId}`, formData, fetchData);
    } else {
      useCreate(`${baseURL}cities`, formData, fetchData);
    }
    setOpenModal(false);
    resetForm();
    setUpdateData([]);
    setUpdateId(null);
  };

  const updateItem = (item) => {
    setUpdateData((prev) => [...prev, item]);
    setName(item.name);
    setText(item.text);
    setUpdateId(item.id);
  };

  return (
    <>
      {" "}
      <div className="homePage">
        <Table>
          <thead>
            <tr>
              <th>N/0</th>
              <th>Name</th>
              <th>Text</th>
              <th>Images</th>
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
            {cities &&
              cities?.data.data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.text}</td>
                  <td>
                    <img
                      width={60}
                      // height={40}
                      src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`}
                      alt={item.name_en}
                    />
                  </td>
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
                        Delete(`${baseURL}cities/${item.id}`, fetchData);
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
              placeholder="Name"
            />
            <input
              value={text}
              required
              onChange={(e) => {
                setText(e.target.value);
              }}
              type="text"
              placeholder="Text"
            />
            <input
              ref={pictureRef}
              accept="image/png, image/jpeg"
              required
              type="file"
              placeholder="Upload
              "
            />

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
