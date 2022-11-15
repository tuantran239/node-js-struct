const errorMiddleware = (req, res) => {
  const { status, error, name } = req.error
  return res.status(status).send({
    error,
    status,
    name
  })
}

export default errorMiddleware
