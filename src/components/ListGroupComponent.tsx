import React from 'react';
import { Item } from "../types/Item";


interface Props {
    Items: Item[];
    Heading: string;
    onSelectItem: (item: Item) => void;
}


export default function ListGroupComponent(props : Props) {
    const items = props.Items;
    const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);

    // Event handler for click event on list items
    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
        console.log(e);
    };


    return (
        <>
            <div>
                <h3>{props.Heading}</h3>
                <p className="space-y-1"></p>
                <ul className="list-group list-group-flush border border-gray-800 ">
                    {   items!= null && 
                        items.map((item: Item, index: number) => (
                            <li key={index}><a href="#"
                                className={selectedItem === item ?
                                    "flex items-center px-3 py-2 text-sm font-sm transition-colors bg-yellow-900 text-white border border-gray-900"
                                    :
                                    "flex items-center px-3 py-2 text-sm font-sm transition-colors  border border-gray-900"}
                                key={item.Id}
                                onClick={() => {
                                    setSelectedItem(item);
                                    props.onSelectItem(item);
                                }} >{ item.Name }
                            </a></li>
                        ))
                    }
                </ul>

            </div>
        </>
    );
}