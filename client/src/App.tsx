import React, { useState, useEffect } from 'react'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'

import './App.css'

function App() {
  const [apiResponse, setApiResponse] = useState('')

  const callAPI = () => {
    fetch('http://localhost:9000/testAPI')
      .then((res) => res.text())
      .then((res) => setApiResponse(res))
  }

  useEffect(() => {
    callAPI()
  }, [])

  return (
    <div className="App">
      <p>Api response: {apiResponse}</p>
      <TweetsList></TweetsList>
    </div>
  )
}

export default hot(module)(App)

const TweetsList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
