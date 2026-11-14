import './App.css'
import ThriftApp from './Components/thriftApp.tsx'
import { products } from './data/data.ts'
function App() {

  return (
    <>
      <h1>Thrift Happens</h1>
      <ThriftApp data={products} />
    </>
  )
}

export default App
