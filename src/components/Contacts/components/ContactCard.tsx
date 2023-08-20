import React, { useState, useEffect } from "react";
import { Button } from "../../../ui/Button/Index";
import { Contact } from "../../../types/contact";
import defaultImg from "../../../ui/images/contact.png";
import { Modal } from "../../../ui/Modal/Modal";
import { DeletePopUp } from "./DeletePopUp";
import { useDispatch } from "react-redux";
import { deleteContact, getContact, updateContactId } from "../contacts.slice";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { AsyncState } from "../../../types";
import { ContactForm } from "./ContactForm";
type ContactCardProps = {
  contact: Contact;
};
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
    <div className="w-full sm:w-56 sm:h-72 p-2 bg-[#D9D9D9] rounded-md flex flex-wrap sm:flex-col justify-around items-center">
      <img
        className=" w-full max-w-[8rem] sm:w-32 h-auto bg-slate-500 rounded-full"
        src={img}
        onError={() => setImg(defaultImg)}
        alt=""
      />
      <div className="space-y-2">
        <div className=" space-y-1">
          <p>Name : {props.contact.firstName + " " + props.contact.lastName}</p>
          <p>Email :{props.contact.email}</p>
          <p>status:{props.contact.status}</p>
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
