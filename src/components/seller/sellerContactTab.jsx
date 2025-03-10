const SellerContactTab = ({data}) => {

    const demoData = {
        name: 'Mike miller',
        email: 'mike@gmail.com',
        phone: '0501234567',
        country: 'Israel'
    };
    return (
        <div className="contact-tab-container">
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
}
export default SellerContactTab;