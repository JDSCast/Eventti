// Esta variable le indica el estado de la autenticacion de axios a react
export let isAuthenticated = true;

// Esta función setea el estado de la variable que puede ser en react
export const setAuthenticated = (value) => {
  isAuthenticated = value;
};
