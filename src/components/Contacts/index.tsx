import React, { useState, useEffect } from "react";
import { Button } from "../../ui/Button/Index";
import { EmptyMessage } from "./components/EmptyMessage";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { AsyncState } from "../../types";
import { Loader } from "../../ui/Loader/Loader";
import { ContactCard } from "./components/ContactCard";
import { Modal } from "../../ui/Modal/Modal";
import { ContactForm } from "./components/ContactForm";

// Component to create and display contacts
export const Contacts = () => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  // Accessing the store
  const availableContacts = useSelector(
    (state: RootState) => state.contact.availableContacts
  );
  const getAllContactsStatus = useSelector(
    (state: RootState) => state.contact.getAllContactsStatus
  );
  const addContactStatus = useSelector(
    (state: RootState) => state.contact.addContactStatus
  );
  //
  useEffect(() => {
    if (addContactStatus === AsyncState.FULFILLED) {
      setIsModalActive(false);
    }
  }, [addContactStatus]);
  const isContactsAvailable = availableContacts.length > 0;
  //
  return (
    <div className="w-full h-full overflow-auto flex-1 flex flex-col justify-start items-center relative ">
      <div className="h-20 w-full relative">
        {getAllContactsStatus !== AsyncState.PENDING && (
          <Button
            children="Create Contact"
            className={`w-56 font-semibold border-b-4 border-black active:border-b-0 active:translate-y-1 ${
              isContactsAvailable && "absolute top-5 right-5"
            }`}
            bgColor="#D9D9D9"
            textColor="black"
            onClick={() => setIsModalActive(true)}
          />
        )}
      </div>
      <div className="w-full">
        {getAllContactsStatus === AsyncState.PENDING && <Loader size="lg" />}
        {!isContactsAvailable &&
          getAllContactsStatus !== AsyncState.PENDING && (
            <EmptyMessage
              message={
                getAllContactsStatus !== AsyncState.REJECTED
                  ? "No contact Found Please add contact from Create contact button"
                  : "Something wrong happened...!"
              }
            />
          )}
        {isContactsAvailable && (
          <div className=" bg-slate-400 p-5 flex gap-2 flex-wrap justify-center items-center h-fit overflow-auto">
            {availableContacts.map((contact, index) => {
              return <ContactCard contact={contact} key={index} />;
            })}
          </div>
        )}
      </div>
      {isModalActive && (
        <Modal
          ghostClose
          allCentered
          withShade
          onBackdropClick={() => setIsModalActive(false)}
        >
          <ContactForm context="Create" />
        </Modal>
      )}
    </div>
  );
};
