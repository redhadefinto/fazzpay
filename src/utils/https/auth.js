/* eslint-disable no-undef */
import axios from "axios";
// import { transform } from "lodash";

const baseUrl = `${process.env.NEXT_PUBLIC_APP_SERVER}`;
// import { get } from '../localStorage'

export const login = (email, password, controller) => {
  // console.log(email, password
  const body = {
    email,
    password,
  };
  const url = `${baseUrl}/auth/login`;
  return axios.post(url, body, {
    signal: controller.signal,
  });
};

export const register = (body, controller) => {
  const url = `${baseUrl}/auth/register`;
  return axios.post(url, body, {
    signal: controller.signal,
  });
};

export const setPin = (pin, id, token, controller) => {
  const url = `${baseUrl}/user/pin/${id}`;
  return axios.patch(url, pin, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const forgot = (body, controller) => {
  const url = `${baseUrl}/auth/forgot-password`;
  return axios.post(url, body, {
    signal: controller.signal,
  });
};

export const resetPassword = (body, controller) => {
  const url = `${baseUrl}/auth/reset-password`;
  return axios.patch(url, body, {
    signal: controller.signal,
  });
};
