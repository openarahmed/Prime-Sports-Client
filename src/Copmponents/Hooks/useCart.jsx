import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../AuthPorvider/AuthPorvider";

const useCart = () => {
    const {user, loading} = useContext(AuthContext)
    const token = localStorage.getItem('token')
    const { refetch, data = [], isLoading } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/carts/${user?.email}`,{headers: {
                authorization: `bearer ${token}`
            }})
            return res.json();
        },
    })
    return [data, refetch, isLoading]
}
export default useCart;