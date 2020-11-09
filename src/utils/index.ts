//! cookie操作
//! export  vs export default 
//!  export 是批量导出，导出多个 
//! export default 是默认导出，导出一个

type SetCookieType = {
  (name:string,value:string,days:number):void
}
type GetCookieType = {
  (name:string): string|undefined
}

export const setCookie:SetCookieType = function (name, value, days) {
  let d = new Date();
  d.setDate(d.getDate() + days)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d};path=/`;
}


export const getCookie:GetCookieType = function (name) {
  let arr = decodeURIComponent(document.cookie).split('; ');
  for (let i = 0; i < arr.length; i++) {
      let newarr = arr[i].split('=');
      if (name === newarr[0]) {
          return newarr[1];
      }
  }
}

export const removeCookie = function (name:string):void {
  setCookie(name,'',-1)
}