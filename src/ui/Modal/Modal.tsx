import React, { PropsWithChildren } from "react";
import ReactDOM from "react-dom";
//
type ModalProps = {
  zIndex?: string;
  withShade?: boolean;
  ghostClose?: boolean;
  onBackdropClick?: () => void;
  allCentered?: boolean;
  modalRoot?: string;
  containerClass?: string;
};
//
// Modal component to render any necessary component in a popup view using React portal.
export const Modal = (props: PropsWithChildren<ModalProps>) => {
  return ReactDOM.createPortal(
    <div
      className={`pageFadeIn fixed inset-0 overflow-y-auto ${
        props.zIndex ? props.zIndex : "z-50"
      }`}
    >
      {props.ghostClose && (
        <button
          onClick={props.onBackdropClick}
          className="h-12 w-12 absolute z-20 right-0 m-2 text-white text-[24px]"
        >
          X
        </button>
      )}
      {props.allCentered ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="relative z-10">{props.children}</div>
        </div>
      ) : (
        <div className="relative z-10">{props.children}</div>
      )}

      <div
        onClick={props.onBackdropClick}
        className={`fixed inset-0 z-0 ${
          props.withShade && "bg-black opacity-75"
        }`}
      />
    </div>,
    document.getElementById(props.modalRoot ?? "modal") as any
  );
};
