// function to create a delay
const delay = async (sec: number) =>
  new Promise((resolve) => setTimeout(resolve, sec * 1000));

export { delay };
