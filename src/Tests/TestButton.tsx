import React from "react";
import ButtonComponent from "../components/ButtonComponent";
import AlertComponent from "@/components/AlertComponent";

export default function TestButton() {
    const [showSubmitAlert, setShowSubmitAlert] = React.useState(false);

    const handleClick = () => {
        console.log("Button clicked!");
    };

    const handleSubmit = () => {
        setShowSubmitAlert(true);
        console.log("Submit button clicked!");
    };

    return (
        <>
            <AlertComponent isVisible={showSubmitAlert}
                title="Button Component"
                OnClose={() => setShowSubmitAlert(false)}>
                You clicked the submit button!
                </AlertComponent>

            <div className="p-4 mt-2 border border-slate-950 w-sm">
                <ButtonComponent onClick={handleSubmit} color="primary">
                    Submit
                </ButtonComponent>

                <p className="text-sm text-slate-400 mt-2">
                </p>

                <ButtonComponent onClick={handleClick} color="secondary">
                    Cancel
                </ButtonComponent>

                <p className="text-sm text-slate-400 mt-2">
                </p>

                <ButtonComponent onClick={handleClick} color="danger">
                    Okay
                </ButtonComponent>

            </div>
        </>
    );
}