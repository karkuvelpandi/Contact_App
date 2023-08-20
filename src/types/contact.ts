export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  status: string;
}

export interface UpdateContactData {
  id: number;
  data: Contact;
}
export interface UpdateContactResponse {
  id: number;
  postData: Contact;
  data: any;
}

export interface AddContactData {
  postData: Contact;
  data: any;
}
