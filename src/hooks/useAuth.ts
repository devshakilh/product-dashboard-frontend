// // hooks/useAuth.ts
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { setCredentials, clearCredentials } from '../redux/slices/authSlices';

// export const useAuth = () => {
//   const dispatch = useDispatch();
//   const token = useSelector((state: RootState) => state.auth.token);
//   const user = useSelector((state: RootState) => state.auth.user);

//   const login = (token: string, user: { role: string; [key: string]: any }) => {
//     dispatch(setCredentials({ token, user, role: user.role }));
//   };

//   const logout = () => {
//     dispatch(clearCredentials());
//   };

//   const hasRole = (role: string) => {
//     return user?.role === role;
//   };

//   return {
//     token,
//     user,
//     login,
//     logout,
//     hasRole,
//   };
// };
