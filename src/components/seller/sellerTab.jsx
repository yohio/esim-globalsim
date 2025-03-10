import { useState } from "react";
import InfoTab from "./sellerInfoTab";
import SellerContactTab from "./sellerContactTab";
import AccountsTab from "./sellerAccountsTab";

const SellerTab = ({data}) => {
    const [activeTab, setActiveTab] = useState('info');
    const [activeComponent, setActiveComponent] = useState(<InfoTab data={data}/>);
    
    const tabHandler = (activeTab) => {
        setActiveTab(activeTab);
        switch (activeTab) {
            case 'info':
                setActiveComponent(<InfoTab data={data}/>);
                break;
            case 'contact':
                setActiveComponent(<SellerContactTab data={data}/>);
                break;
            case 'accounts':
                setActiveComponent(<AccountsTab data={data}/>);
                break;                
            default:
                setActiveComponent('');
                break;
        }
    }

    return(
        <div className="seller-tab">
            <div className="tabHeader bg-white divide-y divide-gray-200">
                <ul className="flex px-4 py-4">
                    <li className="px-4"><button onClick={() => tabHandler('info')}>Info</button></li>
                    <li className="px-4"><button onClick={() => tabHandler('contact')}>Contact</button></li>
                    <li className="px-4"><button onClick={() => tabHandler('accounts')}>Accounts</button></li>
                </ul>
            </div>
            <div className="tabBody">
                {activeComponent ? (
                    activeComponent
                ) : (
                    <p>Sorry not found</p>
                )}
            </div>
        </div>
    );
}
export default SellerTab;