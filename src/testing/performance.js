export default (func, iterations = 10000) => {
  const start = Date.now();
  while(iterations--) { func(); }
  const end = Date.now();
  return end - start;
};
