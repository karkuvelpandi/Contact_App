export interface ContactPostData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  status: string;
}

export interface ContactGetData {
  _id: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  status: string;
  __v?: number;
}

export interface UpdateContactData {
  _id: string;
  data: ContactPostData;
}
export interface UpdateContactResponse {
  _id: string;
  postData: ContactPostData;
  data: any;
}

export interface AddContactData {
  postData: ContactPostData;
  data: any;
}
