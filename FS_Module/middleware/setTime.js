/*
 * this setTime middleware set the time and date in the req header. and calls the next
 */
export const setTime = (req, res, next) => {
  const time = Date.now();
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  req.timestamp = {
    start: Date.now(),
    date: `${day}/${month + 1}/${year}`,
    time: `${h}:${m}:${s}`,
  };
  next();
};
