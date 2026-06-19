import React from "react";
import ButtonComponent from "./ButtonComponent";
import CartRowComponent from "./CartRowComponent";
import { CartItem } from "../types/CartItem";

// Reducer function to manage cart state
function cartReducer(state: CartItem[], action: { type: string; payLoad: CartItem }) {
    
    switch (action.type) {
        case "ADD_TO_CART":
            return [...state, action.payLoad];

        case "REMOVE_FROM_CART":
            return state.filter(item => item.ProductId !== action.payLoad.ProductId);

        case "UPDATE_QUANTITY":
            return state.map(item => item.ProductId === action.payLoad.ProductId ?
                { ...item, Quantity: action.payLoad.Quantity } : item
            );

        case "CLEAR_CART":
            return [];
        default:
            return state;
    }
}

export default function CartComponent() {
    const cartItems: CartItem[] = [
        { ProductId: 1, Sku: "SKU001", Quantity: 2, Price: 19.99 },
        { ProductId: 2, Sku: "SKU002", Quantity: 1, Price: 9.99 },
        { ProductId: 3, Sku: "SKU003", Quantity: 3, Price: 5.99 }
    ];

    const [cart, dispatch] = React.useReducer(cartReducer, cartItems);
    const cartTotal = cart.reduce(
        (sum: number, item: CartItem) => sum + (item.Price * item.Quantity), 0
    );

    const [newSku, setNewSku] = React.useState("");
    const [newQuantity, setNewQuantity] = React.useState("");

    const AddToCart = () => {
        
        if (newSku && newQuantity) {
            const quantity = parseInt(newQuantity);
            const newCartItem: CartItem = { ProductId: Math.random(), Sku: newSku, Quantity: quantity, Price: 10.00 };

            dispatch({
                type: "ADD_TO_CART",
                payLoad: newCartItem
            });

            setNewSku("");
            setNewQuantity("");
        }
        else {
            console.log("New Sku/Qty cannot be added");
        }
    };

    return (
        <>
            <div className="border border-gray-700 bg-[#0b1220] p-5 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                    CART
                </h3>

                <div className="mt-4 space-x-3 space-y-3">
                    <input type="text" placeholder="Search products..."
                        value={newSku}
                        onChange={(e) => setNewSku(e.target.value)}
                        className="border border-slate-700 bg-[#111a31] px-4 py-1 text-sm text-white focus:border-blue-500 focus:ring focus:ring-blue-500/50" />

                    <span className="space-x-10"> </span>

                    <input type="text" placeholder="Quantity..."
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(e.target.value)}
                        className="border border-gray-700 bg-[#111a31] px-4 py-1 text-sm text-white focus:border-blue-500 focus:ring focus:ring-blue-500/50" />

                    <span className="space-x-10"> </span>
                    <ButtonComponent color="primary" onClick={AddToCart}>
                        Add to Cart
                    </ButtonComponent>
                </div>

                <table className="w-full border-separate border-slate-900 border-spacing-1 text-left text-xs">
                    <thead className="border-slate-9700">
                        <tr className="text-xs uppercase">
                            <th className="px-3 py-2">SL</th>
                            <th className="px-3 py-2">Sku</th>
                            <th className="px-3 py-2">Price</th>
                            <th className="px-3 py-2">Qty</th>
                            <th className="px-3 py-2">Total</th>
                            <th className="px-3 py-2"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {cart.map((cartItem, index) => (
                            <CartRowComponent
                                key={cartItem.ProductId}
                                cartItem={cartItem}
                                index={index}
                                dispatch={dispatch}
                            />
                        )
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={4} className="px-3 py-2 text-right">TOTAL</td>
                            <td className="px-3 py-2 text-right font-bold text-green-400">${cartTotal.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>

            </div>
        </>
    );
}
