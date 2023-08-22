// Contacts service file

import { ContactPostData } from "../types/contact";
// const jsonApi = "https://json-server-pk.onrender.com/contacts";
const nodeApi = "https://cute-hare-attire.cyclic.app/contact-app";

// Function responsible for fetching all contacts
export const getAllContacts = async () => {
  const response = await fetch(`${nodeApi}`);
  const jsonResponse = await response.json();
  return jsonResponse;
};

// Function responsible for fetching single contact based on unique id
export const getContact = async (_id: string) => {
  const response = await fetch(`${nodeApi}/${_id}`);
  const jsonResponse = await response.json();
  return jsonResponse;
};

// Function responsible for deleting single contact based on unique id
export const deleteContact = async (_id: string) => {
  const options = {
    method: "DELETE",
  };
  const response = await fetch(`${nodeApi}/${_id}`, options);
  const jsonResponse = await response.json();
  return jsonResponse;
};

// Function responsible for fetching single contact based on unique id
export const updateContact = async (_id: string, data: ContactPostData) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(`${nodeApi}/${_id}`, options);
  const jsonResponse = await response.json();
  return jsonResponse;
};

// Function responsible for fetching single contact based on unique id
export const addContact = async (data: ContactPostData) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(`${nodeApi}/create`, options);
  const jsonResponse = await response.json();
  return jsonResponse;
};
