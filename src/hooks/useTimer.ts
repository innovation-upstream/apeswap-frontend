import { useState, useEffect } from 'react'

export const useCurrentTime = (update = true) => {
  const [currentMillis, setCurrentMillis] = useState(new Date().getTime())

  useEffect(() => {
    if (update) {
      const tick = () => {
        setCurrentMillis((prevMillis) => prevMillis + 1000)
      }

      const timerID = setInterval(() => tick(), 1000)

      return () => clearInterval(timerID)
    }
  }, [update])

  return currentMillis
}

export default useCurrentTime
