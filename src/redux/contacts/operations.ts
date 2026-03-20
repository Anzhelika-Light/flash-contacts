import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AxiosError } from "axios";

interface Contact {
  id: string;
  name: string;
  number: string;
}

export const fetchContacts = createAsyncThunk<Contact[], void>(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get<Contact[]>("/contacts");
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(axiosError.message);
    }
  },
);

export const addContact = createAsyncThunk<Contact, Omit<Contact, "id">>(
  "contacts/addContact",
  async (newContact, thunkAPI) => {
    try {
      const res = await axios.post<Contact>("/contacts", newContact);
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(axiosError.message);
    }
  },
);

export const deleteContact = createAsyncThunk<string, string>(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(axiosError.message);
    }
  },
);
