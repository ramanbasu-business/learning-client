import React from 'react'
import AlertComponent from '../components/AlertComponent';

export default function TestAlert() {
  return (
      <>
          <div className="p-4 mt-2 border border-slate-950 w-sm">
              <AlertComponent title="Alert" isVisible={true} OnClose={() => {}}>
                  This is an alert message.
              </AlertComponent>
          </div>

          <div className="p-4 mt-2 border border-slate-950 w-sm">
              <AlertComponent title="Alert" isVisible={true} OnClose={() => {}}>
                  <span className="font-bold">Our privacy policy has changed</span>
                  <span className="text-sm">Make sure you know how these changes affect you.</span>
              </AlertComponent>
          </div>
      </>
  );
}
