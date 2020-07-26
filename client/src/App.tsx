import React, { useState, useEffect } from 'react'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'

import './App.css'
import { TweetsList } from './ui/TweetsList/TweetsList'

const tweetsData = [
  {
    text: 'Who is your favorite author that most people haven’t heard of?',
    date: '3 hours ago',
    user: 'IAmMarkManson',
    userName: 'Mark Manson',
  },
  {
    text: 'Which book do you think every developer should read? Books',
    date: 'Jul 11',
    user: 'johnlindquist',
    userName: 'John Lindquist',
  },
  {
    text:
      "Writing a resume (as part of my coursework). Looking at this list of stuff I realize I never celebrated the book launches, the longed for conference invite, any of it. Shipped. Move on. Please, celebrate your wins, even if those close to you don't value them.",
    date: 'Jul 3',
    user: 'rachelandrew',
    userName: 'Rachel Andrew',
  },
]

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
      {/* <p>Api response: {apiResponse}</p> */}
      <TweetsList tweetsData={tweetsData} />
    </div>
  )
}

export default hot(module)(App)
