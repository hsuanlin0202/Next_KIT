import React from "react";
import Modal from "@material-ui/core/Modal";
import Router from "next/router";
import ClipLoader from "react-spinners/ClipLoader";

type Props = {
  setFunc: any;
  modalData: any;
};
export default function SimpleModal({ setFunc, modalData }: Props) {
  const handleClose = () => {
    setFunc({ ...modalData, open: false });
    if (modalData.backPage === true) {
      Router.back();
    }
  };

  const body = (
    <div className="modal absolute bg-white bg-opacity-25 border-2 rounded border-solid border-white p-4 outline-none leading-tight ">
      <p id="simple-modal-description">{modalData.alertText}</p>
      <br />
      <div
        className="w-full flex justify-center items-center text-blue-700 hover:text-blue-300 cursor-pointer"
        onClick={handleClose}
      >
        我知道了
      </div>
    </div>
  );
  const loading = (
    <div className="loading-spinner absolute bg-white bg-opacity-25 border-2 rounded border-solid border-white p-4 outline-none leading-tight flex justify-center">
      <ClipLoader color={"#828282"} loading={true} css={""} size={50} />
    </div>
  );

  return (
    <div>
      <Modal
        open={modalData.open}
        onClose={handleClose}
        aria-describedby="simple-modal-description"
        disableBackdropClick={true}
      >
        {modalData.loading ? loading : body}
      </Modal>
    </div>
  );
}
