import Alert from "@/components/AlertComponent";
import ListGroupComponent from "@/components/ListGroupComponent";
import { Item } from "@/types/Item";


export default function TestListGroup() {
    const props = {
        Heading: "List Group Component",
        Items: [
            { Id: 1, Name: "Item 1" },
            { Id: 2, Name: "Item 2" },
            { Id: 3, Name: "Item 3" },
            { Id: 4, Name: "Item 4" },
            { Id: 5, Name: "Item 5" },
            { Id: 6, Name: "Item 6" },
            { Id: 7, Name: "Item 7" },
        ]
    };

    const handleSelectItem = (item: Item) => {
        console.log("Selected item:", item);
    };

    return (
        <>
            
        <div className="p-4 mt-2 border border-slate-950 w-sm">            
            <ListGroupComponent Heading={props.Heading} Items={props.Items} onSelectItem={ handleSelectItem } />
            </div>
        </>
    );
};