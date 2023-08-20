import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { Contact } from "../../../types/contact";
import { isValidEmail } from "../../../utils/general.util";
import { addContact, updateContact } from "../contacts.slice";
//
type ContactFormProps = {
  context: "Create" | "Edit";
};
// Component responsible for handling create and edit form according to the context given.
export const ContactForm = (props: ContactFormProps) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Contact>({
    id: 0,
    firstName: "",
    lastName: "",
    status: "",
    email: "",
    image: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    firstName: "",
    lastName: "",
    email: "",
    status: "",
  });

  // Accessing the store
  const currentContact = useSelector(
    (state: RootState) => state.contact.currentContact
  );
  const updateContactId = useSelector(
    (state: RootState) => state.contact.updateContactId
  );
  const addContactStatus = useSelector(
    (state: RootState) => state.contact.addContactStatus
  );
  const updateContactStatus = useSelector(
    (state: RootState) => state.contact.updateContactStatus
  );
  //
  useEffect(() => {
    if (currentContact) {
      setFormData(currentContact);
    }
  }, [currentContact]);

  //

  let changeImage = (event: any) => {
    let imageFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.addEventListener("load", () => {
      if (reader.result) {
        setFormData({ ...formData, image: reader.result as string });
      }
    });
  };
  //
  const validateForm = () => {
    let isValid = true;
    const newErrorMessages = {
      firstName: "",
      lastName: "",
      status: "",
      email: "",
    };

    // Validate name
    if (formData.firstName.trim() === "") {
      newErrorMessages.firstName = "Name is required";
      isValid = false;
    }
    if (formData.lastName.trim() === "") {
      newErrorMessages.lastName = "Name is required";
      isValid = false;
    }

    // Validate status
    if (formData.status.trim() === "") {
      newErrorMessages.status = "Status is required";
      isValid = false;
    }
    // Validate email
    if (!isValidEmail(formData.email)) {
      newErrorMessages.email = "Invalid email format";
      isValid = false;
    }
    setErrorMessage(newErrorMessages);
    return isValid;
  };
  // Add new contact
  const submitHandler = (e: any) => {
    e.preventDefault();
    let id = new Date().getTime();
    if (validateForm()) {
      dispatch(addContact({ ...formData, id: id }));
      setFormData({
        id: 0,
        firstName: "",
        lastName: "",
        status: "",
        email: "",
        image: "",
      });
    } else {
      console.log("Invalid data");
    }
  };
  // Edit selected contact
  const updateHandler = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(
        updateContact({
          id: updateContactId,
          data: formData,
        })
      );
      setFormData({
        id: 0,
        firstName: "",
        lastName: "",
        status: "",
        email: "",
        image: "",
      });
    } else {
      console.log("Invalid data");
    }
  };
  return (
    <fieldset className="bg-white flex justify-center rounded-md p-6 w-[calc(100vw-30px)] sm:w-[400px]">
      <legend
        className={`${
          props.context === "Create" ? "bg-green-300" : "bg-yellow-400"
        } w-auto ml-auto align-middle mr-auto px-4 py-2 rounded-full font-semibold`}
      >
        {props.context === "Create" ? "Create Contact" : "Edit Contact"}
      </legend>
      <form action="" className="w-full space-y-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex flex-col">
            <label className=" italic font-semibold text-gray-400">
              First Name <span className="text-red-500">*</span>&nbsp;
              <span className="text-red-500 text-sm sm:block">
                {errorMessage.firstName}
              </span>
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  firstName: e.target.value,
                })
              }
              className=" border-2 border-gray-300 outline-green-300"
            />
          </div>
          <div className="flex flex-col">
            <label className=" italic font-semibold text-gray-400">
              Last Name <span className="text-red-500">*</span>
              <span className="text-red-500 sm:block text-sm">
                {errorMessage.lastName}
              </span>
            </label>
            <input
              value={formData.lastName}
              type="text"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lastName: e.target.value,
                })
              }
              className=" border-2 border-gray-300 outline-green-300"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className=" italic font-semibold text-gray-400">
            Email Address <span className="text-red-500">*</span>
            <span className="text-red-500 text-sm">{errorMessage.email}</span>
          </label>
          <input
            value={formData.email}
            type="text"
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            onBlur={(e) =>
              isValidEmail(e.target.value)
                ? setErrorMessage({ ...errorMessage, email: "" })
                : setErrorMessage({
                    ...errorMessage,
                    email: "Please enter valid email.",
                  })
            }
            className=" border-2 border-gray-300 outline-green-300"
          />
        </div>
        <div className="flex flex-col">
          <label className=" italic font-semibold text-gray-400">
            Upload Image <span className="text-red-500">*</span>
          </label>
          <div className="flex justify-between">
            <input
              onChange={(e) => changeImage(e)}
              type="file"
              className=" border-2 border-gray-300 outline-green-300"
            />
            {formData.image ? (
              <img
                src={formData.image}
                alt=""
                className="rounded-sm"
                width="27"
              />
            ) : (
              <div className="w-7 h-auto bg-slate-200 rounded-sm" />
            )}
          </div>
        </div>
        <div className="flex">
          <label className=" italic font-semibold text-gray-400">
            Status <span className="text-red-500">*</span>
            <span className="text-red-500 text-sm">{errorMessage.status}</span>
          </label>
          <div className="flex px-4 space-x-4 ">
            <input
              name="status"
              type="radio"
              checked={formData.status === "active"}
              onChange={(e) => setFormData({ ...formData, status: "active" })}
              className=" border-2 border-gray-300 outline-green-300"
            />
            <p className=" italic font-semibold text-gray-400">Active</p>
            <input
              name="status"
              type="radio"
              checked={formData.status === "inactive"}
              onChange={(e) => setFormData({ ...formData, status: "inactive" })}
              className=" border-2 border-gray-300 outline-green-300"
            />
            <p className=" italic font-semibold text-gray-400">Inactive</p>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            className="w-24 h-8 bg-blue-500 rounded-sm  text-white"
            onClick={(e: any) =>
              props.context === "Create" ? submitHandler(e) : updateHandler(e)
            }
          >
            {(updateContactStatus || addContactStatus) === "pending"
              ? props.context === "Create"
                ? "Creating..."
                : "Updating..."
              : props.context === "Create"
              ? "Create"
              : "Update"}
          </button>
        </div>
      </form>
    </fieldset>
  );
};
