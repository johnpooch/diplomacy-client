export default (conf) => {
  const { statusCode, getData, latency } = conf;
  return async (req, res, ctx) => {
    await new Promise((r) => setTimeout(r, latency));
    const data = getData ? getData(statusCode, req.params) : null;
    if (statusCode === 204) {
      return res(ctx.status(statusCode), null);
    }
    const responseData = statusCode === 204 ? null : ctx.json(data);
    return res(ctx.status(statusCode), responseData);
  };
};
