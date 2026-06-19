import React from 'react'

interface AlertComponentProps {
    children?: React.ReactNode;
    title: string;
    isVisible?: boolean;
    OnClose: () => void;
}

const AlertComponent = ({ title = "", children = null, isVisible = false, OnClose }: AlertComponentProps) => {
    const [alertVisible, setAlertVisible] = React.useState(isVisible);

    React.useEffect(() => {
        setAlertVisible(!!isVisible);
    }, [isVisible]);


    if (!alertVisible) return null; // Cleaner than returning an empty fragment

    const handleClose = () => {
        setAlertVisible(false);
        OnClose?.();
        console.log("Alert alertVisible", alertVisible);
    }

    return (
        <>
            { alertVisible && (
            <section className="relative rounded-2xl border border-white/10 bg-[#201e3c] p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Information Alert
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                    {title || " "}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                    {children == null ? " " : children}
                </p>
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-yellow-400"
                    aria-label="Close"
                >
                    <svg
                        className="h-6 w-6 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                </button>
            </section>)}
</>
    );
}

export default AlertComponent