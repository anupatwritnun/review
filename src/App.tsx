import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReviewForm from './components/ReviewForm'
import ThankYou from './components/ThankYou'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReviewForm />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
