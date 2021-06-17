export const onDecrement = () => ({
  type: 'DECREMENT',
});

export const onIncrement = () => ({
  type: 'INCREMENT',
});

export const onIncrementAsync = () => {
  return {
    type: 'INCREMENT_ASYNC',
  };
};
export const createAsync = (dispatch:Function) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      dispatch({ type: 'INCREMENT' });
      console.log('121212');
      resolve();
    }, 3000);
  });
};
