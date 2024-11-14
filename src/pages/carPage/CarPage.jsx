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
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [seconds, setSeconds] = useState("");
  const [maxSpeed, setMaxSpeed] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [premium, setPremium] = useState("");
  const [checked, setChecked] = useState(false);
  const [transmission, setTransmission] = useState("");
  const [motor, setMotor] = useState("");
  const [driveside, setDriveside] = useState("");
  const [petrol, setPetrol] = useState("");
  const [limitperday, setLimitperday] = useState("");
  const [deposit, setDeposit] = useState("");
  const [priceaed, setPriceaed] = useState("");
  const [priceusd, setPriceusd] = useState("");
  const [saleaed, setSaleaed] = useState("");
  const [saleusd, setSaleusd] = useState("");

  const [brandId, setBrandId] = useState("");
  const [modelId, setModelId] = useState("");
  const [cityId, setCityId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [updateData, setUpdateData] = useState([]);
  const [updateId, setUpdateId] = useState(null);

  const picture1Ref = useRef();
  const picture2Ref = useRef();
  const picture3Ref = useRef();

  const {
    data: cars,
    isPending,
    error,
    fetchData,
  } = useFetch(`${baseURL}cars`);

  const { data: brands } = useFetch(`${baseURL}brands`);
  const { data: models } = useFetch(`${baseURL}models`);
  const { data: cities } = useFetch(`${baseURL}cities`);
  const { data: categories } = useFetch(`${baseURL}categories`);
  const { data: locations } = useFetch(`${baseURL}locations`);

  const resetForm = () => {
    setColor("");
    setYear("");
    setSeconds("");
    setMaxSpeed("");
    setMaxPeople("");
    setPremium("");
    setChecked(false);
    setTransmission("");
    setMotor("");
    setDriveside("");
    setPetrol("");
    setLimitperday("");
    setDeposit("");
    setPriceaed("");
    setPriceusd("");
    setSaleaed("");
    setSaleusd("");
    setBrandId("");
    setModelId("");
    setCityId("");
    setLocationId("");
    setCategoryId("");
    setUpdateData("");
    setUpdateData([]);
    picture1Ref.current.value = "";
    picture2Ref.current.value = "";
    picture3Ref.current.value = "";
  };

  const postData = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("brand_id", brandId);
    formData.append("model_id", modelId);
    formData.append("city_id", cityId);
    formData.append("category_id", categoryId);
    formData.append("location_id", locationId);
    formData.append("year", year);
    formData.append("seconds", seconds);
    formData.append("max_speed", maxSpeed);
    formData.append("max_people", maxPeople);
    formData.append("color", color);
    formData.append("premium_protection", premium);
    formData.append("transmission", transmission);
    formData.append("motor", motor);
    formData.append("drive_side", driveside);
    formData.append("petrol", petrol);
    formData.append("limitperday", limitperday);
    formData.append("deposit", deposit);
    formData.append("price_in_aed", priceaed);
    formData.append("price_in_usd", priceusd);
    formData.append("price_in_aed_sale", saleaed);
    formData.append("price_in_usd_sale", saleusd);
    formData.append("inclusive", checked);

    formData.append("cover", picture1Ref.current.files[0]);
    formData.append("images", picture2Ref.current.files[0]);
    formData.append("images", picture3Ref.current.files[0]);
    if (updateData.length > 0) {
      updateHook(`${baseURL}cars/${updateId}`, formData, fetchData);
    } else {
      useCreate(`${baseURL}cars`, formData, fetchData);
    }

    setOpenModal(false);
    resetForm();
    setUpdateData([]);
    setUpdateId(null);
  };

  const updateItem = (item) => {
    console.log(item);
    setUpdateData((prev) => [...prev, item]);

    setColor(item.color);
    setYear(item.year);
    setSeconds(item.seconds);
    setMaxSpeed(item.max_speed);
    setMaxPeople(item.max_people);
    setPremium(item.premium_protection);
    setChecked(item.inclusive);
    setTransmission(item.transmission);
    setMotor(item.motor);
    setDriveside(item.drive_side);
    setPetrol(item.petrol);
    setLimitperday(item.limitperday);
    setDeposit(item.deposit);
    setPriceaed(item.price_in_aed);
    setPriceusd(item.price_in_usd);
    setSaleaed(item.price_in_aed_sale);
    setSaleusd(item.price_in_usd_sale);
    setBrandId(item.brand_id);
    setModelId(item.model_id);
    setCityId(item.city_id);
    setLocationId(item.location_id);
    setCategoryId(item.category_id);
    // setUpdateData([]);

    setUpdateId(item.id);
  };
  return (
    <>
      <div className="homePage">
        <Table>
          <thead>
            <tr>
              <th>N/0</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Color</th>
              <th>City</th>
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
            {cars &&
              cars?.data.data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.brand.title}</td>
                  <td>{item.model.name}</td>
                  <td>{item.color}</td>
                  <td>{item.city.name}</td>

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
                        Delete(`${baseURL}cars/${item.id}`, fetchData);
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
            <select
              required
              defaultValue={brandId}
              onChange={(e) => setBrandId(e.target.value)}
            >
              <option value="" disabled>
                Choose Brand
              </option>
              {brands?.data?.data?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
            <select
              required
              defaultValue={modelId}
              onChange={(e) => setModelId(e.target.value)}
            >
              <option value="" disabled>
                Choose Model
              </option>
              {models?.data?.data?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <select
              required
              defaultValue={cityId}
              onChange={(e) => setCityId(e.target.value)}
            >
              <option value="" disabled>
                Choose City
              </option>
              {cities?.data?.data?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <select
              required
              defaultValue={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="" disabled>
                Choose Category
              </option>
              {categories?.data?.data?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name_en}
                </option>
              ))}
            </select>
            <select
              required
              defaultValue={locationId}
              onChange={(e) => setLocationId(e.target.value)}
            >
              <option value="" disabled>
                Choose Locations
              </option>
              {locations?.data?.data?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <input
              value={color}
              required
              onChange={(e) => {
                setColor(e.target.value);
              }}
              type="text"
              placeholder="Color"
            />
            <input
              value={year}
              required
              onChange={(e) => {
                setYear(e.target.value);
              }}
              type="number"
              placeholder="Year"
            />
            <input
              value={seconds}
              required
              onChange={(e) => {
                setSeconds(e.target.value);
              }}
              type="number"
              placeholder="Seconds"
            />
            <input
              value={maxSpeed}
              required
              onChange={(e) => {
                setMaxSpeed(e.target.value);
              }}
              type="number"
              placeholder="Max Speed"
            />
            <input
              value={maxPeople}
              required
              onChange={(e) => {
                setMaxPeople(e.target.value);
              }}
              type="number"
              placeholder="Max People"
            />
            <input
              value={premium}
              required
              onChange={(e) => {
                setPremium(e.target.value);
              }}
              type="text"
              placeholder="Premium"
            />
            <input
              value={transmission}
              required
              onChange={(e) => {
                setTransmission(e.target.value);
              }}
              type="text"
              placeholder="Transmission"
            />
            <input
              value={motor}
              required
              onChange={(e) => {
                setMotor(e.target.value);
              }}
              type="text"
              placeholder="Motor"
            />
            <input
              value={driveside}
              required
              onChange={(e) => {
                setDriveside(e.target.value);
              }}
              type="text"
              placeholder="Drive side"
            />
            <input
              value={petrol}
              required
              onChange={(e) => {
                setPetrol(e.target.value);
              }}
              type="text"
              placeholder="Petrol"
            />
            <input
              value={limitperday}
              required
              onChange={(e) => {
                setLimitperday(e.target.value);
              }}
              type="text"
              placeholder="LimitPerday"
            />
            <input
              value={deposit}
              required
              onChange={(e) => {
                setDeposit(e.target.value);
              }}
              type="text"
              placeholder="Deposit"
            />
            <input
              value={priceaed}
              required
              onChange={(e) => {
                setPriceaed(e.target.value);
              }}
              type="text"
              placeholder="Price Aed"
            />
            <input
              value={priceusd}
              required
              onChange={(e) => {
                setPriceusd(e.target.value);
              }}
              type="text"
              placeholder="Price Usd"
            />
            <input
              value={saleaed}
              required
              onChange={(e) => {
                setSaleaed(e.target.value);
              }}
              type="text"
              placeholder="Sale Aed"
            />
            <input
              value={saleusd}
              required
              onChange={(e) => {
                setSaleusd(e.target.value);
              }}
              type="text"
              placeholder="Sale Usd"
            />

            <label>
              <input
                checked={checked}
                onChange={(e) => {
                  setChecked(e.target.checked);
                }}
                required
                type="checkbox"
              />
              <span style={{ marginLeft: "20px" }}>Inclusive</span>
            </label>
            <input
              ref={picture1Ref}
              accept="image/png, image/jpeg"
              required
              type="file"
              placeholder="Upload
              "
            />
            <input
              ref={picture2Ref}
              required
              accept="image/png, image/jpeg"
              type="file"
              placeholder="Upload
              "
            />
            <input
              ref={picture3Ref}
              required
              accept="image/png, image/jpeg"
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
