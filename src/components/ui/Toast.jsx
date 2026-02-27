import { useState, useEffect } from 'react'

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
  return (
    <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-4 py-2 rounded shadow-lg z-50`}>
      {message}
    </div>
  )
}

export default Toast