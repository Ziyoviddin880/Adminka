import axios from "axios";
import { toast } from "react-toastify";

export const useCreate = async (url, formData, onPostSuccess) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response?.data?.success) {
      toast.success(response.data.message);
      onPostSuccess();
    }
  } catch (err) {
    console.log(err);
  }
};
