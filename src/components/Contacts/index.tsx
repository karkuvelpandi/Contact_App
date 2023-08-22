import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { AsyncState } from "../../types";
import { Modal } from "../../ui/Modal/Modal";
import { ContactGetData } from "../../types/contact";
import { Button } from "../../ui/Button/Index";
import { Loader } from "../../ui/Loader/Loader";
import searchIcon from "../../ui/svgs/searchIcon.svg";
import { ContactForm } from "./components/ContactForm";
import { ContactCard } from "./components/ContactCard";
import { EmptyMessage } from "./components/EmptyMessage";
// Component to create and display contacts
export const Contacts = () => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>("");
  const [allContacts, setAllContacts] = useState<ContactGetData[]>();
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
    setAllContacts(availableContacts);
  }, [availableContacts]);
  //
  useEffect(() => {
    if (addContactStatus === AsyncState.FULFILLED) {
      setIsModalActive(false);
    }
  }, [addContactStatus]);

  //Function to filter and update contacts
  let searchHandler = () => {
    if (!searchName) {
      setAllContacts(availableContacts);
    }
    if (searchName !== "") {
      const result = availableContacts.filter((singleData) => {
        return (
          (singleData.firstName + singleData.lastName)
            .toLowerCase()
            .includes(searchName.toLowerCase()) ||
          singleData.email.toLowerCase().includes(searchName.toLowerCase())
        );
      });
      setAllContacts(result);
    }
  };
  //
  const isContactsAvailable = availableContacts.length > 0;
  //
  return (
    <div className="w-full h-full flex-1 flex flex-col justify-start items-center relative ">
      <div className="py-4 w-full relative flex justify-center sm:justify-between px-6 flex-wrap gap-4 items-center mt-2">
        {getAllContactsStatus !== AsyncState.PENDING && (
          <Button
            children="Create Contact"
            className="w-56 font-semibold border-b-4 border-black active:translate-y-1"
            bgColor="#D9D9D9"
            textColor="black"
            onClick={() => setIsModalActive(true)}
          />
        )}
        <div className="flex border-gray-400 border-2 p-1.5 rounded-lg ">
          <input
            type="text"
            placeholder="Search contact..."
            className="outline-none border-r-2 border-black"
            onChange={(e) => setSearchName(e.target.value)}
            onFocus={() => setAllContacts(availableContacts)}
          />
          <button>
            <img
              src={searchIcon}
              height="30px"
              width="30px"
              alt=""
              className="ml-1"
              onClick={() => searchHandler()}
            />
          </button>
        </div>
      </div>
      <div
        className={`w-full ${
          getAllContactsStatus === AsyncState.PENDING ||
          (!isContactsAvailable && "mt-24 flex justify-center")
        }`}
      >
        {getAllContactsStatus === AsyncState.PENDING && (
          <div className="w-full h-4/5 flex justify-center items-center">
            <Loader size="lg" />
          </div>
        )}
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
          <div className=" m-2 p-2 border-2 border-gray-200 rounded-md flex gap-2 flex-wrap justify-center sm:justify-start items-center h-fit overflow-auto">
            {allContacts &&
              allContacts.map((contact: ContactGetData, index) => {
                return <ContactCard contact={contact} key={index} />;
              })}
            {allContacts?.length === 0 && (
              <p className="text-md">
                Contact your are searching is not found...
              </p>
            )}
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
