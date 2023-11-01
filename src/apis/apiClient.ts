/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosResponse, AxiosRequestConfig } from 'axios'
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: '/',
})

export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return await apiClient.get(url, config)
}

export const post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return await apiClient.post(url, data, config)
}

export const patch = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return await apiClient.patch(url, data, config)
}

export const put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return await apiClient.put(url, data, config)
}

export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return await apiClient.delete(url, config)
}
