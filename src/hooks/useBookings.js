import { useQuery } from "react-query";
import baseUrl from "../utilities/baseUrl";

const useBookings = () => {
    const { data, isLoading, refetch } = useQuery('all-bookings', () => fetch(baseUrl + `/booking/all`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));


    return [data, isLoading, refetch];
};

export default useBookings;