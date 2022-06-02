import localAxios from './common';

export const login = (data) =>
  localAxios
    .post('/api/login', data)
    .then((r) => r.data)
    .catch((error) => {
      console.log(error);
    });

// {
//   const res = await axios.post('/api/login', data).catch((error) => {
//     console.log('erorr here');
//     return error;
//   });
//   console.log('res here');
//   return res.data;
// });
