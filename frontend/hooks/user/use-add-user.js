import { useMutation } from "react-query";
import axios from "axios";


export default function useAddUserMutation() {
    return useMutation(
        async ({ email, password, name, address, phone, branch, type }) => {
            return await axios.post("http://localhost:3000/api/users/add-user", {
                email, password, name, address, phone, branch, type
            });
        },
        {
            onSuccess: async (res, variables, context) => {
                console.log("User added");
            },
            onError: (err, variables, context) => {
                console.log(err);
            },
        }
    );
}
