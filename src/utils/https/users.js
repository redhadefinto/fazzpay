import axios from "axios";
const baseUrl = `${process.env.NEXT_PUBLIC_APP_SERVER}`;

export const getDashBoard = (id, token, controller) => {
  const url = `${baseUrl}/dashboard/${id}`;
  return axios.get(url, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserProfile = (id, token, controller) => {
  const url = `${baseUrl}/user/profile/${id}`;
  return axios.get(url, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const topUp = (body, token, controller) => {
  const url = `${baseUrl}/transaction/top-up`;
  return axios.post(url, body, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getContact = (page, search, token, controller) => {
  const url = `${baseUrl}/user?page=${page}&limit=10&search=${search}`;
  return axios.get(url, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const cekPin = (getPin, token, controller) => {
  const url = `${baseUrl}/user/pin/${getPin}`;
  return axios.get(url, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
