import axios from "axios";
const baseUrl = `${process.env.NEXT_PUBLIC_APP_SERVER}`;

export const getHistory = (token, controller) => {
  const url = `${baseUrl}/transaction/history?page=1&limit=4&filter=MONTH`;
  return axios.get(url, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getHistories = (token, params, controller) => {
  const { page, limit, filter } = params;
  const url = `${baseUrl}/transaction/history?page=${page}&limit=${limit}&filter=${filter}`;
  return axios.get(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};
