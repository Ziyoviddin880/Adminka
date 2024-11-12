import { useFetch } from "../../hooks/useFetch/useFetch";
import "./home.scss";
import Loading from "../../components/loading/Loading";
import Button from "../../components/button/Button";
import { Delete } from "../../hooks/delete/Delete";
import { useRef, useState } from "react";
import { useCreate } from "../../hooks/usePost/useCreate";
import { updateHook } from "../../hooks/update/updateHook";
import Table from "../../components/table/Table";
import Modal from "../../components/modal/Modal";

const HomePage = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [openModal, setOpenModal] = useState(false);

  const [updateData, setUpdateData] = useState([]);
  const [updateId, setUpdateId] = useState(null);

  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const pictureRef = useRef();

  const resetForm = () => {
    setNameEn("");
    setNameRu("");
    pictureRef.current.value = "";
    setUpdateData([]);
  };

  const {
    data: categories,
    isPending,
    error,
    fetchData,
  } = useFetch(`${baseURL}categories`);

  const postData = (e) => {
    e.preventDefault();
    console.log(pictureRef.current.files[0]);
    const formData = new FormData();
    formData.append("name_en", nameEn);
    formData.append("name_ru", nameRu);
    formData.append("images", pictureRef.current.files[0]);
    if (updateData.length > 0) {
      updateHook(`${baseURL}categories/${updateId}`, formData, fetchData);
    } else {
      useCreate(`${baseURL}categories`, formData, fetchData);
    }
    setOpenModal(false);
    resetForm();
    setUpdateData([]);
    setUpdateId(null);
  };

  const updateItem = (item) => {
    setUpdateData((prev) => [...prev, item]);
    setNameEn(item.name_en);
    setNameRu(item.name_ru);
    setUpdateId(item.id);
  };

  const deleteData = (id) => {
    Delete(`${baseURL}categories/${id}`, fetchData);
  };

  return (
    <>
      <div className="homePage">
        <Table>
          <thead>
            <tr>
              <th>N/0</th>
              <th>Nom-En</th>
              <th>Nom-Ru</th>
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
            {categories &&
              categories?.data.data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name_en}</td>
                  <td>{item.name_ru}</td>
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
                        deleteData(item.id);
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
            <Loading width={60} />
          </div>
        )}
        {error && <h1>{error}</h1>}
      </div>
      {openModal && (
        <Modal resetForm={resetForm} setOpenModal={setOpenModal}>
          <form className="modal-form" onSubmit={postData}>
            <input
              value={nameEn}
              required
              onChange={(e) => {
                setNameEn(e.target.value);
              }}
              type="text"
              placeholder="name En"
            />
            <input
              value={nameRu}
              required
              onChange={(e) => {
                setNameRu(e.target.value);
              }}
              type="text"
              placeholder="name Ru"
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

export default HomePage;
