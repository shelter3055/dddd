//! 验证权限
import { getCookie } from '@/utils';
import { request } from 'umi';
import {
  checkAuthURL,
  registerURL,
  loginURL,
  tokenURL,
  g2URL,
  g6URL,
  addURL,
  updateURL,
  delURL,
  getURL
} from './url';
const username = getCookie('username');
const token = getCookie('token');

export function checkAuthReq() {
  return request(checkAuthURL, {
    method: 'POST',
    data: {
      username,
    },
  });
}
export function registerReq(data) {
  return request(registerURL, {
    method: 'POST',
    data,
  });
}

interface DataType {
  username: string;
  password: string;
}
export function loginReq(data: DataType): Promise<any> {
  return request(loginURL, {
    method: 'POST',
    data,
  });
}
export function checkTokenReq(): Promise<any> {
  return request(tokenURL, {
    params: {
      token,
      username,
    },
  });
}

export function g2Req() {
  return request(g2URL);
}
export function g6Req() {
  return request(g6URL);
}

export function addReq(data) {
  return request(addURL,{
    method: 'POST',
    data: {
      ...data,
      token
    }
  });
}
export function delReq(shopId) {
  return request(delURL,{
    method: 'POST',
    data: {
      shopId,
      token
    }
  });
}
export function updateReq(data) {
  return request(updateURL,{
    method: 'GET',
    params: {
      ...data,
      token
    }
  });
}
export function getReq() {
  return request(getURL,{
    method: 'GET',
    params: {
      token
    }
  });
}
