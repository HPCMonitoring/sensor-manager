import axios from 'axios';
import { AxiosError } from 'axios';
import { AxiosResponse } from 'axios';

export const server = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
});

export async function invoke<R>(call: Promise<AxiosResponse>): Promise<R> {
  try {
    const response = await call;
    return response.data;
  } catch (err) {
    const errPayload = (err as AxiosError).response?.data as ResponseError;
    throw errPayload;
  }
}
