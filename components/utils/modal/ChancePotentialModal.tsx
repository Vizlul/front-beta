import React from "react";
import "./ChancePotentialModal.css";

export default function ChancePotentialModal({ title, description }) {
  return (
    <div>
      <label
        style={{ display: "flex", alignItems: "center", gap: "4px" }}
        className="add-counter"
        htmlFor={`modal-${title}`}
      >
        {title === "more_answer" ? <img src="info.svg" /> : <img src="info.svg" />}
      </label>

      <input className="modal-state" id={`modal-${title}`} type="checkbox" />
      <div className="modal">
        <label className="modal__bg" htmlFor={`modal-${title}`}></label>
        <div className="modal__inner__chance">
          <div className="modal_header">
            <div className="modal_header_icon_text">
              <img src="/ExclamationCircle.svg" alt="info-icon" />
              <p style={{ textAlign: "right", fontSize: "16px", color: "#000" }}>{description}</p>
            </div>
          </div>
          <label
            className="modalButton modal__close"
            htmlFor={`modal-${title}`}
            style={{ marginRight: "auto" }}
          >
            متوجه شدم
          </label>
        </div>
      </div>
    </div>
  );
}
