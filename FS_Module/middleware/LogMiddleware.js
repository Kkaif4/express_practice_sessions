const createLog = (req, res, next) => {
  const time = Date.now();
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  req.timestamp = {
    date: `${day}/${month + 1}/${year}`,
    time: `${h}:${m}:${s}`,
  };
  next();
};

export default createLog;
