import axios from "axios";
import { toast } from "react-toastify";

export const updateHook = async (url, formData, onUpdateSuccess) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response?.data?.success) {
      toast.success(response.data.message);
      onUpdateSuccess();
    }
  } catch (err) {}
};
