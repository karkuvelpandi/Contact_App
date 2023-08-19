export const getAllContacts = async () => {
  const response = await fetch("http://localhost:5000/contacts");
  console.log(response);
  const jsonResponse = await response.json();
  return jsonResponse;
};
