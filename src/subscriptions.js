import {useEffect, useState} from "react";
import {GetSubscriptionModels} from "./databaseAPI";
import { Tag } from 'primereact/tag';
import { DataView } from 'primereact/dataview';

function Subscriptions({subscription_id, set_subscription_id}) {

    const [subscriptionModels, setSubscriptionModels] = useState([]);

    useEffect(() => {
        //TODO remove test subscriptions
        GetSubscriptionModels().then((data) => {
            if (data && data.length > 0) {
                set_subscription_id(data[0].subscriptionId);
            }
            setSubscriptionModels(data);
        });
    }, []);

    const gridItem = (subscriptionModel) => {
        const handleItemClick = () => {
            // Handle item click here, for example, set the selected item in state
            set_subscription_id(subscriptionModel.subscriptionId);
        };
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2 w-6" key={subscriptionModel.subscriptionId} onClick={handleItemClick}>
                <div className={`${(subscription_id === subscriptionModel.subscriptionId)? " p-4 border-2 border-primary":"p-4 border-1 surface-border surface-card border-round"}`}>
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">Subscription</span>
                        </div>
                        <Tag value="IN STOCK" severity="success"></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-1 py-5">
                        <div className="text-2xl font-bold">{subscriptionModel.type}</div>
                        <div className="text-lg font-bold">{subscriptionModel.name}</div>
                    </div>
                    <div className="flex justify-content-center">
                        <span className="text-2xl font-semibold">${subscriptionModel.amount}</span>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product) => {
        if (!product) {
            return;
        }
        return gridItem(product);
    };

    return (
        <div className="card">
            <DataView value={subscriptionModels} itemTemplate={itemTemplate} layout="grid" />
        </div>
    )
}

export default Subscriptions;