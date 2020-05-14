// import FormData from 'react-native/Libraries/Network/FormData';
// import {Platform} from 'react-native';
// import MyStorage from '../storage/storage.js';

// const baseUrl = 'http://imprademo.com/Api';
// export const imagesBaseUrl = '';
// const sentOtp = baseUrl+'/Auth/user/otp';
// const register = baseUrl+'/Auth/user/register';
// const login = baseUrl+'/Auth/user/login';
// const profile = baseUrl+'/Auth/user/all';
// const productList = baseUrl+'/products/all';

// const getUserId = async ()=>{
//   let user = await MyStorage.getUser();
//   let user_id = 0;
//   if(user != null)
//     user_id = user.id;
//   return user_id;
// }

// const Api = {
//   sentOtp: async function (mobile, onSuccess, onError) {
//     let params = new FormData();
//     params.append('mobile', mobile);
//     let headers = {
//       'Content-Type': 'multipart/form-data'
//     };
//     apiCall(sentOtp, params, 'POST', headers, onSuccess, onError);  
//   },

//   register: async function (name,email,mobile,password,device_id,onSuccess,onError) {
//     let params = new FormData();
//     params.append('name', name);
//     params.append('email', email);
//     params.append('mobile', mobile);
//     params.append('password', password);
//     params.append('device_id', device_id);
//     let headers = {
//       'Content-Type': 'multipart/form-data'
//     };
//     apiCall(register, params, 'POST', headers, onSuccess, onError);  
//   },

//   login: async function (mobile, password, onSuccess, onError) {
//     let params = new FormData();
//     params.append('username', mobile);
//     params.append('password', password);
//     let headers = {
//       'Content-Type': 'multipart/form-data'
//     };
//     apiCall(login, params, 'POST', headers, onSuccess, onError);  
//   },

//   profile: async function (onSuccess, onError) {
//     let params = new FormData();
//     params.append('id', await getUserId());
//     let headers = {
//       'Content-Type': 'multipart/form-data'
//     };
//     apiCall(profile, params, 'POST', headers, onSuccess, onError);  
//   },

//   productList: async function (lang,limit,pageOffset,category_id,onSuccess,onError) {
//     let params = new FormData();
//     params.append('lang', lang);
//     params.append('limit', limit);
//     params.append('page', pageOffset);
//     params.append('category_id', category_id);
//     let headers = {
//       'Content-Type': 'multipart/form-data'
//     };
//     apiCall(productList, params, 'POST', headers, onSuccess, onError);  
//   },
// }

// const apiCall = (url, params, method, headers, onSuccess, onError)=>{
//   console.log('apiCall: '+url);
//   fetch(url, {
//       method: method,
//       headers: headers,
//       body: params
//     })
//     .then(response => response.json())
//     .then(result => {
//       console.log(JSON.stringify(result));
//       onSuccess(result);
//     })
//     .catch(err => {
//       console.log(err)
//       onError(err);
//     });
// };

// export default Api;
