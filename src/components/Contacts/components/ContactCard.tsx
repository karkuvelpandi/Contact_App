import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { AsyncState } from "../../../types";
import { ContactForm } from "./ContactForm";
import { DeletePopUp } from "./DeletePopUp";
import { Modal } from "../../../ui/Modal/Modal";
import { Contact } from "../../../types/contact";
import { Button } from "../../../ui/Button/Index";
import defaultImg from "../../../ui/images/contact.png";
import { deleteContact, getContact, updateContactId } from "../contacts.slice";
//
type ContactCardProps = {
  contact: Contact;
};
// Responsible for render contact in a card view.
export const ContactCard = (props: ContactCardProps) => {
  const dispatch = useDispatch();
  const [img, setImg] = useState<string>();
  const [activeModal, setActiveModal] = useState<string>("");

  // Accessing the store
  const deleteContactStatus = useSelector(
    (state: RootState) => state.contact.deleteContactStatus
  );
  const updateContactStatus = useSelector(
    (state: RootState) => state.contact.updateContactStatus
  );

  // Closing the Modal popup after particular task is completed
  useEffect(() => {
    setImg(props.contact.image);
    if (deleteContactStatus === AsyncState.FULFILLED) {
      setActiveModal("");
    }
  }, [deleteContactStatus, props.contact.image]);

  // Closing edit modal after update
  useEffect(() => {
    if (updateContactStatus === AsyncState.FULFILLED) setActiveModal("");
  }, [updateContactStatus]);

  return (
    <div className="pageFadeIn shadow-lg min-w-[14rem] sm:h-[19rem] p-2 bg-[#D9D9D9] rounded-md flex flex-wrap gap-2 flex-col justify-start items-center">
      <img
        className=" w-full max-w-[8rem] sm:w-32 h-auto max-h-[8rem] bg-slate-500 rounded-full"
        src={img}
        onError={() => setImg(defaultImg)}
        alt=""
      />
      <div className="space-y-4">
        <div className=" space-y-1 overflow-auto">
          <p className="text-xl font-semibold text-center">
            {props.contact.firstName + " " + props.contact.lastName}
          </p>
          <p className="italic text-center"> {props.contact.email}</p>
          <p
            className={`${
              props.contact.status === "active"
                ? "text-green-500"
                : "text-red-600"
            } text-center`}
          >
            {props.contact.status}
          </p>
        </div>
        <div className=" w-full flex justify-around gap-2">
          <Button
            children="Edit"
            className="w-20"
            bgColor="green"
            onClick={() => {
              setActiveModal("Edit");
              dispatch(updateContactId(props.contact.id));
              dispatch(getContact(props.contact.id));
            }}
          />
          <Button
            children="Delete"
            className="w-20"
            bgColor="red"
            onClick={() => setActiveModal("Delete")}
          />
        </div>
      </div>

      {activeModal && (
        <Modal
          // zIndex="50"
          allCentered
          withShade
          ghostClose
          onBackdropClick={() => setActiveModal("")}
        >
          {activeModal === "Edit" && <ContactForm context="Edit" />}
          {activeModal === "Delete" && (
            <DeletePopUp
              onYes={() => dispatch(deleteContact(props.contact.id))}
              onNo={() => setActiveModal("")}
            />
          )}
        </Modal>
      )}
    </div>
  );
};
