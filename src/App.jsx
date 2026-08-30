import { useEffect, useState } from 'react'
import { matchRoute, navigate, subscribeToRoute } from './app/router'
import JstnMode from './jstn/JstnMode'

function App() {
  const [route, setRoute] = useState(() => matchRoute(window.location.pathname))

  useEffect(() => subscribeToRoute(() => {
    setRoute(matchRoute(window.location.pathname))
  }), [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [route.path])

  return <JstnMode route={route} onNavigate={navigate} />
}

export default App 
