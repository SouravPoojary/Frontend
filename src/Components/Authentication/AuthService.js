// // src/services/authService.js
// import axios from 'axios';



// export const login = async (email, password, role) => {
//   try {
//     const response = await axios.post("http://localhost:8080/auth/login", {
//       email,
//       password,
//       role
//     });
    
//     if (response.data.token) {
//       localStorage.setItem('jwtToken', response.data.token);
//       localStorage.setItem('userRole', role);
//       localStorage.setItem('userData', JSON.stringify(response.data.user));
//     }
    
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const logout = () => {
//   localStorage.removeItem('jwtToken');
//   localStorage.removeItem('userRole');
//   localStorage.removeItem('userData');
// };

// export const getCurrentUser = () => {
//   return JSON.parse(localStorage.getItem('userData'));
// };

// export const getToken = () => {
//   return localStorage.getItem('jwtToken');
// };

// // Axios interceptor for adding token to requests
// axios.interceptors.request.use(config => {
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, error => {
//   return Promise.reject(error);
// });