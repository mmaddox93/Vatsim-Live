// eslint-disable-next-line import/prefer-default-export
export const saveStatePlugin = (store) => {
  store.subscribe((mutation, state) => {
    if (mutation.type === 'SET_OPTIONS') {
      localStorage.setItem(
        'options',
        JSON.stringify(state.options),
      );
    }
  });
};
