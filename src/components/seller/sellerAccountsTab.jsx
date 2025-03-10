import { ColGenerate, RowGenerate } from "../../utils/helpers";
const AccountsTab = ({data}) => {
    const demoData = {
        id: 1,
        name: 'Mike miller',
        email: 'mike@gmail.com',
        phone: '0501234567',
        country: 'Israel'
    };

    const colData = [
        'ID','Name', 'Amount of sims', 'Type', 'Blance'
    ];
    const rowData = [
        {
            id: 1,
            name: 'Account name',
            simsAmount: 20,
            type: 'Type 1',
            balance: 2000
        }
    ];
    
    return (
        <div className="account-tab-container">
            <div className="bg-white divide-y divide-gray-200 p-4">
                <div className="w-full text-black">
                    {ColGenerate(colData)}
                    {RowGenerate(rowData)}
                </div>
            </div>
        </div>
    );
}
export default AccountsTab;