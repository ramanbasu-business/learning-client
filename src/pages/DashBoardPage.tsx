import WebSocketMessageComponent from "@/components/WebSocketMessageComponent";

export default function DashBoardPage() {
    return (
        <div className="space-y-5 text-slate-100">
            
            <section className="rounded-2xl border border-white/10 bg-[#10192e] p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Output mapping
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white antialiased">Document Processing</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                    Review incoming documents, validate fields, and continue the mapped workflow steps in a focused dark workspace.
                </p>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
                {[
                    { label: 'Pending', value: '11' },
                    { label: 'In Review', value: '4' },
                    { label: 'Completed', value: '27' },
                ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-[#0f1729] p-4 shadow-sm">
                        <p className="text-sm text-slate-400">{item.label}</p>
                        <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
                    </div>
                ))}
            </section>

            <section className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
                <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-5 shadow-sm">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Current process
                    </h3>
                    <div className="mt-4 space-y-3">
                        {['Upload', 'Extract', 'Review', 'Approve'].map((step, index) => (
                            <div key={step} className="flex items-center gap-3 rounded-xl border border-white/8 bg-[#111a31] px-4 py-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4f46e5] text-sm font-semibold text-white">
                                    {index + 1}
                                </span>
                                <div>
                                    <p className="font-medium text-white">{step}</p>
                                    <p className="text-sm text-slate-400">Workflow stage {index + 1}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-5 shadow-sm">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Socket Chat
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-slate-400">
                        
                    </p>
                    
                    <WebSocketMessageComponent />
                </div>
            </section>
        </div>
    );
}
