import React from "react";
import { Button } from "../../../ui/Button/Index";
export const ContactCard = () => {
  return (
    <div className="w-60 h-80 bg-[#D9D9D9]">
      <img className="w-32 h-32 bg-slate-500" src="" alt="" />
      <div>
        <p>Name : </p>
        <p>Email :</p>
        <p>status:</p>
      </div>
      <div>
        <Button children="Edit" />
        <Button children="Delete" />
      </div>
    </div>
  );
};
