import "./Modal.css";

export default function Modal({ title }) {
  return (
    <div>
      <label style={{ display: "flex", alignItems: "center", gap: "4px" }} className="add-counter" for="modal-2">
        <p>{title}</p>

        <img src="info.svg" />
      </label>

      <input className="modal-state" id="modal-2" type="checkbox" />
      <div className="modal">
        <label className="modal__bg" for="modal-2"></label>
        <div className="modal__inner">
          <div className="modal_header">
            <div className="modal_header_icon_text">
              <img src="/ExclamationCircle.svg" alt="info-icon" />{" "}
              <h2>پارامتر شغلی </h2>
            </div>
            <p>
              در جدول زیر درصد هر یک از پارامترهای دسته بندی شغلی را مشاهده
              می‌کنید.
            </p>
          </div>
          <div className="table">
            <div className="tableBox">
              <div className="tableBoxHeader">
                <p>عنوان پارامتر</p>
              </div>
              <div className="tableBoxRows">
                <p>نوع شغل</p>
                <p>نوع شغل</p>
                <p>نوع شغل</p>
              </div>
            </div>
            <div className="tableBox">
              <div className="tableBoxHeader">
                <p>میزان تاثیر</p>
              </div>
              <div className="tableBoxRows">
                <p>+1.6</p>
                <p>+1.6</p>
                <p>-1.6</p>
              </div>
            </div>
          </div>
          <label className="modalButton modal__close" for="modal-2">
            متوجه شدم
          </label>
        </div>
      </div>
    </div>
  );
}
