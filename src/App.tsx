import { CloseIcon } from './assets/icons'
import { worker } from './mocks'

if (process.env.NODE_ENV === 'development') {
  worker.start()
}

function App() {
  return (
    <>
      <CloseIcon />
      <h1 className="bg-blue-500 text-red-500">Hellosadasds</h1>
      <button className="btn btn-primary">Hello World!</button>
    </>
  )
}

export default App
