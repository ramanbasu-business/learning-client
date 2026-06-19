import React from "react";
import ButtonComponent from "./ButtonComponent";
import { CartItem } from "../types/CartItem";

interface CartRowProps {
    cartItem: CartItem;
    index: number;
    dispatch: React.Dispatch<{ type: string; payLoad: CartItem }>
}

export default function CartRowComponent({ cartItem, index, dispatch }: CartRowProps) {
    const [tempQty, setTempQty] = React.useState(cartItem.Quantity.toString());

    // keep textbox in sync if cartItem.Quantity changes externally
    React.useEffect(() => {
        setTempQty(cartItem.Quantity.toString());
    }, [cartItem.Quantity]);

    return (
        <>
            <tr key={index} className="border-b border-color">
                <td className="border-b border-slate-700 px-3 py-3 font-semibold text-care-ink">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4f46e5] text-sm font-semibold text-white">
                        {index + 1}
                    </span>
                </td>

                <td className="border-b border-slate-700 px-3 py-3 text-care-muted">
                    {cartItem.Sku}
                </td>

                <td className="border-b border-slate-700 px-3 py-3 text-care-muted place-items-end">
                    ${cartItem.Price.toFixed(2)}
                </td>

                <td className="border-b border-slate-700 px-3 py-3 text-care-muted w-2 text-right">
                    <input type="number" value={tempQty}
                        className="border border-slate-700 bg-[#111a31] px-2 py-1 text-sm text-white text-right"
                        onChange={(e) => setTempQty(e.target.value)}
                    />
                </td>

                <td className="border-b border-slate-700 px-3 py-3 text-right font-bold">
                    ${(cartItem.Quantity * cartItem.Price).toFixed(2)}
                </td>

                <td className="border-b border-slate-700 px-3 py-3 text-care-muted place-items-end">
                    <ButtonComponent color="danger" onClick={() => {
                        dispatch({ type: "UPDATE_QUANTITY", payLoad: { ...cartItem, Quantity: parseInt(tempQty) } })
                    }}>update
                    </ButtonComponent>
                </td>
            </tr>
        </>);
}
