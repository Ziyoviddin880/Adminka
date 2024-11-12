import axios from "axios";
import { toast } from "react-toastify";

export const Delete = async (url, onDeleteSuccess) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response?.data?.success) {
      toast.success(response.data.message);
      onDeleteSuccess();
    }
  } catch (err) {
    if (err.status === 500) {
      toast.error("This cannot be deleted.");
    }
  }
};
