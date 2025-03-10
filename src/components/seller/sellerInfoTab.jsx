import { useState } from "react";

const InfoTab = ({ data }) => {
    const demoData = 
        {
            name: 'Mike miller',
            sims: 10,
            status: ['active','processing', 'panding'],
        };
    const [selectedStatus, setSelectedStatus ] = useState(demoData.status[0]);    

    // Ensure `data` is a valid object before trying to map it
    if (!data || typeof data !== 'object') {
        console.error('InfoTab expected an object but received:', data);
        return <p>No data available</p>;
    }
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    return (
        <div className="info-tab-container">
            <div className="bg-white divide-y divide-gray-200 p-4">
                {Object.entries(demoData).map(([key, value], index) => (
                    <div key={index} className="px-6 py-4 whitespace-nowrap flex-1">
                        <strong>{key.replace(/_/g, ' ')}:</strong> 
                        {Array.isArray(value) ? (
                            <select 
                                value={selectedStatus} 
                                onChange={handleStatusChange} 
                                className="ml-2 p-1 border rounded"
                            >
                                {value.map((status, idx) => (
                                    <option key={idx} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <span className="ml-2">{value}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfoTab;
