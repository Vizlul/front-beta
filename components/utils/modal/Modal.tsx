import { useSelector } from "react-redux";
import "./Modal.css";
import { XaiGroupedExpandedJson } from "@/utils/XaiGroupedExpandedJson";
import { PredictInterface } from "@/store/features/predictSlice";

export default function Modal({ title, title_en }) {
  const predict = useSelector((state: { predict: PredictInterface }) => state.predict.groupedXaiExpanded);

  return (
    <div>
      <label style={{ display: "flex", alignItems: "center", gap: "4px" }} className="add-counter" htmlFor={`modal-${title_en}`}>
        <p>{title}</p>
        <img src="info.svg" />
      </label>

      <input className="modal-state" id={`modal-${title_en}`} type="checkbox" />
      <div className="modal">
        <label className="modal__bg" htmlFor={`modal-${title_en}`}></label>
        <div className="modal__inner">
          <div className="modal_header">
            <div className="modal_header_icon_text">
              <img src="/ExclamationCircle.svg" alt="info-icon" /> <h2>پارامتر {title} </h2>
            </div>
            <p>در جدول زیر درصد هر یک از پارامترهای دسته بندی {title} را مشاهده می‌کنید.</p>
          </div>
          <div className="table">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "100%",
                borderBottom: "1px solid #999999",
              }}
            >
              <p style={{ margin: "0", width: "70%", textAlign: "center" }}>عنوان پارامتر</p>
              <p style={{ width: "1px", margin: "0", height: "30px", background: "#999999" }}></p>
              <p style={{ width: "30%", margin: "0", textAlign: "center" }}>میزان تاثیر</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "space-around", width: "100%" }}>
              {predict[`${title_en}`]
                ? Object?.entries(predict[`${title_en}`])?.map(
                    ([param, value], idx) =>
                      idx < 4 && (
                        <div
                          className="tableBoxCont"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            width: "100%",
                            margin: "0 !important",
                          }}
                        >
                          <p className="textMargin" style={{ width: "70%", textAlign: "right", borderLeft: "1px solid #999999" }}>
                            تاثیر {param}
                          </p>

                          <p style={{ width: "30%", textAlign: "center" }} className="tableValueText textMargin">
                            {Math.round(Number(value) * 100)} %
                          </p>
                        </div>
                      )
                  )
                : ""}
            </div>
            {/* <div className="tableBox">
              <div className="tableBoxHeader">
              </div>
              <div className="tableBoxRows">
                
              </div>
            </div>
            <div className="tableBox">
              <div className="tableBoxHeader">
              </div>
              <div className="tableBoxRows">
                {predict[`${title_en}`]
                  ? Object?.entries(predict[`${title_en}`])?.map(
                      ([param, value], idx) => idx < 4 && 
                    )
                  : ""}
              </div>
            </div> */}
          </div>
          <label className="modalButton modal__close" htmlFor={`modal-${title_en}`}>
            متوجه شدم
          </label>
        </div>
      </div>
    </div>
  );
}
