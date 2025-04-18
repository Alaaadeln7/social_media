import { useState } from "react";

export default function Model() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="btn">
        Open Modal
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="modal modal-open" role="dialog">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Hello!</h3>
            <p className="py-4">This modal works with React state!</p>
            <div className="modal-action">
              <button onClick={() => setIsOpen(false)} className="btn">
                Close!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
