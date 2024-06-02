import app from '../app'
const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Express running on http://localhost:${port}`)
  // console.log('run')
})