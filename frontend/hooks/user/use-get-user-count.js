import { useQuery } from "react-query";
import axios from "axios";

const useGetUserCount = (month, year) => {
  return useQuery(["userCount", month, year], async () => {
    const res = await axios.get(
      `http://localhost:3000/api/users/user-count?month=${month}&year=${year}`
    );
    return res?.data;
  });
};

export default useGetUserCount;
