import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { wpApi } from "../../utils/wpApi"; 
import { useSelector } from "react-redux";
import SellerTab from "../../components/seller/sellerTab";

const AcountProfile = () => {
    const router = useRouter();
    const { id, token } = router.query;
    const [seller, setSeller] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userToken = useSelector((state) => state.user.token);

    useEffect(() => {
        if (!id) return;

        const fetchSeller = async () => {
            try {
                const response = await wpApi.get(`/wp/v2/users/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    } 
                });
                setSeller(response.data.meta);
            } catch (error) {
                setError('Failed to fetch seller details');
            } finally {
                setLoading(false);
            }
        };

        fetchSeller(); // Call the function inside useEffect

    }, [id, token]);

    if (loading) return <p>Loading seller details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <section className="border-red-500 min-h-screen flex w-full lg:w-100">
            <div className="container mx-auto p-4">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <div className="w-full text-black">
                    <div>
                                            
                    </div>
                </div>
            </div>
        </div>  
        </section>
    );
};

export default AcountProfile;
