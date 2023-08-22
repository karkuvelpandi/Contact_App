import React from "react";
import { Button } from "../../../ui/Button/Index";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { Loader } from "../../../ui/Loader/Loader";
import { AsyncState } from "../../../types";
type DeletePopUpProps = {
  onYes: () => void;
  onNo: () => void;
};
export const DeletePopUp = (props: DeletePopUpProps) => {
  const deleteContactStatus = useSelector(
    (state: RootState) => state.contact.deleteContactStatus
  );
  return (
    <div className="flex flex-col justify-start h-40 w-[calc(100vw-30px)] sm:w-96 items-center gap-5 bg-white p-5 rounded-md">
      {deleteContactStatus === AsyncState.PENDING ? (
        <Loader size="md" />
      ) : (
        <p className="font-semibold text-lg text-center ">
          Are you sure you want to delete this item?
        </p>
      )}

      <div className="flex justify-around w-full absolute bottom-5 ">
        <Button
          className="w-20"
          bgColor="red"
          children="Yes"
          onClick={props.onYes}
          disabled={deleteContactStatus === AsyncState.PENDING}
        />
        <Button
          className="w-20"
          children="No"
          onClick={props.onNo}
          disabled={deleteContactStatus === AsyncState.PENDING}
        />
      </div>
    </div>
  );
};
