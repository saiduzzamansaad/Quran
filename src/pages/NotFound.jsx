import { Link } from 'react-router-dom'
import Container from '../components/layout/Container'

const NotFound = () => {
  return (
    <Container className="py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">৪০৪</h1>
      <p className="text-lg mb-6">পৃষ্ঠাটি পাওয়া যায়নি</p>
      <Link to="/" className="bg-primary text-white px-6 py-2 rounded">হোম পৃষ্ঠায় যান</Link>
    </Container>
  )
}

export default NotFound