import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Form />
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default App;
