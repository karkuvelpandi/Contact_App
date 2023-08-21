// Contacts service file

import { Contact } from "../types/contact";

// Function responsible for fetching all contacts
export const getAllContacts = async () => {
  const response = await fetch("http://localhost:5000/contacts");
  const jsonResponse = await response.json();
  return jsonResponse;
};

// Function responsible for fetching single contact based on unique id
export const getContact = async (id: number) => {
  const response = await fetch(`http://localhost:5000/contacts/${id}`);
  const jsonResponse = await response.json();
  return jsonResponse;
};

// Function responsible for deleting single contact based on unique id
export const deleteContact = async (id: number) => {
  const options = {
    method: "DELETE",
  };
  const response = await fetch(`http://localhost:5000/contacts/${id}`, options);
  const jsonResponse = await response.json();
  return jsonResponse;
};

// Function responsible for fetching single contact based on unique id
export const updateContact = async (id: number, data: Contact) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(`http://localhost:5000/contacts/${id}`, options);
  const jsonResponse = await response.json();
  return jsonResponse;
};

// Function responsible for fetching single contact based on unique id
export const addContact = async (data: Contact) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(`http://localhost:5000/contacts`, options);
  const jsonResponse = await response.json();
  return jsonResponse;
};
