import React from "react";
import { Button } from "../../ui/Button/Index";
import { EmptyMessage } from "./components/EmptyMessage";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
export const Contacts = () => {
  const availableContacts = useSelector(
    (state: RootState) => state.contact.availableContacts
  );
  console.log(availableContacts);
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-10">
      <Button
        children="Create Contact"
        className="w-56 font-semibold border-b-4 border-black active:border-b-0"
        bgColor="#D9D9D9"
        textColor="black"
      />

      <EmptyMessage message="No contact Found Please add contact from Create contact button" />
    </div>
  );
};
