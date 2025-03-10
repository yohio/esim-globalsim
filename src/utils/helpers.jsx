import Link from 'next/link';
export const ColGenerate = (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) return null;
    return (
        <div className="bg-gray-50 flex border-b">
            {data.map((column) => (
                <div 
                    key={column} 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider flex-1"
                >
                    {column}
                </div>
            ))}
        </div>
    );
} 

export const RowGenerate = (data) => {
    if(!data || !Array.isArray(data) || data.length === 0) return false;

    return(
        <div className="flex w-full hover:bg-gray-50">
                {data.map((node, index) => (
                    <Link key={index} href={`/accounts/${node.id}`} className='w-full' passHref>
                    <div className="flex w-full hover:bg-gray-50">
                        {Object.values(node).map((value, cellIndex) => (  
                            <div 
                                key={cellIndex} 
                                className="px-6 py-4 whitespace-nowrap flex-1"
                            >
                                {typeof value === 'object' ? JSON.stringify(value) : value}
                            </div>
                        ))}
                    </div>
                    </Link>
                ))}
        </div>
    ); 
}