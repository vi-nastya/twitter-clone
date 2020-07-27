import React, { useState, useEffect } from 'react'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

import './App.css'
import { TweetsList } from './ui/TweetsList/TweetsList'
import Button from './ui/basic/Button/Button'
import { resetInput } from './ui/helpers/mixins'
import { color } from './ui/helpers/color'

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

export type NewTweetFormData = {
  text: string
}

const App = () => {
  const [apiResponse, setApiResponse] = useState('')

  const callAPI = () => {
    fetch('http://localhost:9000/testAPI')
      .then((res) => res.text())
      .then((res) => setApiResponse(res))
  }

  useEffect(() => {
    callAPI()
  }, [])

  const { register, handleSubmit, watch, errors } = useForm({
    mode: 'onChange',
  })

  const onSubmit = (data: NewTweetFormData) => console.log(data)

  return (
    <div className="App">
      {/* <p>Api response: {apiResponse}</p> */}
      <TweetsList tweetsData={tweetsData} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TweetFormWrapper>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            name="text"
            defaultValue=""
            ref={register({ required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}
          <Button type="submit" text="Tweet" />
        </TweetFormWrapper>
      </form>
    </div>
  )
}

export default hot(module)(App)

const TweetFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  padding-top: 24px;

  & input {
    ${resetInput};
    width: 400px;
    height: 40px;
    border: 1px solid ${color.border};

    margin-bottom: 16px;
    border-radius: 8px;
    padding: 8px 16px;
  }
`
