// Esta variable le indica el estado de la autenticacion de axios a react
export let isAuthenticated = true;
export let hasPermission = true
// Esta función setea el estado de la variable que puede ser en react
export const setAuthenticated = (value) => {
  isAuthenticated = value;
};

export const setPermission = (value) => {
  hasPermission = value;
};
