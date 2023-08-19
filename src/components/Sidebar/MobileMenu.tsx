import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux";
import { CloseIcon } from "../../ui/svgs/CloseIcon";
import { HamBurgerIcon } from "../../ui/svgs/HamBurgerIcon";
import { updateSidebarVisibility } from "../../redux/visibility.slice";
export const MobileMenu = () => {
  const dispatch = useDispatch();
  const isSidebarVisible = useSelector(
    (state: RootState) => state.visibility.isSidebarVisible
  );
  return (
    <div
      className="cursor-pointer"
      onClick={() => dispatch(updateSidebarVisibility(!isSidebarVisible))}
    >
      {isSidebarVisible ? (
        <CloseIcon size="24" />
      ) : (
        <HamBurgerIcon height="24" width="32" />
      )}
    </div>
  );
};
