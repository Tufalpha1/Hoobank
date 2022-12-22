import { useQuery } from "react-query";
import axios from "axios";

const useGetAccountInfo = (userId) => {
  return useQuery(["account-info", userId], async () => {
    const res = await axios.get(`http://localhost:3000/api/users/account-info?id=${userId}`);
    return res?.data;
  });
};

export default useGetAccountInfo;
