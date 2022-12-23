import { useQuery } from "react-query";
import axios from "axios";

const useGetSession = () => {
    return useQuery(["session"], async () => {
        const res = await axios.get("http://localhost:3000/session");
        return res?.data;
    });
};

export default useGetSession;
