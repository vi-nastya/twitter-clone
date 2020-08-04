import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import './App.css'
import { TweetsList } from './ui/TweetsList/TweetsList'
import Button from './ui/basic/Button/Button'
import { resetInput } from './ui/helpers/mixins'
import { color } from './ui/helpers/color'
import { TweetData } from './api/api-types'
import { RootState } from './store/reducers'
import { fetchTweets } from './store/actions'
import moment from 'moment'

moment.locale('en')

export type NewTweetFormData = {
  text: string
  userName: string
  userHandle: string
}

type AppProps = {
  tweetsData: TweetData[]
  fetchTweets: () => void
}

const App: React.FC<AppProps> = ({ tweetsData = [], fetchTweets }) => {
  const [apiResponse, setApiResponse] = useState<TweetData[]>([])

  // const callAPI = () => {
  //   fetch('http://localhost:9000/api/tweets')
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setApiResponse(res as TweetData[])
  //     })
  // }

  useEffect(() => {
    // callAPI()
    fetchTweets()
  }, [])

  const { register, handleSubmit, watch, errors, reset } = useForm({
    mode: 'onChange',
  })

  const onSubmit = (data: NewTweetFormData) => {
    console.log(data)

    const newTweetData = {
      ...data,
      comments: 0,
      likes: 0,
      shares: 0,
      published: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000]'),
    }

    axios.post('http://localhost:9000/api/tweets', newTweetData).then(
      (response: any) => {
        console.log(response)
        reset()
        fetchTweets()
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  //console.log('api response', apiResponse)
  return (
    <div className="App">
      {/* <p>Api response: {apiResponse}</p> */}
      <TweetsList tweetsData={tweetsData} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TweetFormWrapper>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            name="userHandle"
            defaultValue=""
            ref={register({ required: true })}
            placeholder="Twitter handle"
          />
          <input
            name="userName"
            defaultValue=""
            ref={register({ required: true })}
            placeholder="Display name"
          />
          <input
            name="text"
            defaultValue=""
            ref={register({ required: true })}
            placeholder="What's happening?"
          />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}
          <Button type="submit" text="Tweet" />
        </TweetFormWrapper>
      </form>
    </div>
  )
}

// export default hot(module)(App)

const mapStateToProps = (state: RootState) => ({
  tweetsData: state.tweets.allTweets,
})

export default connect(mapStateToProps, {
  fetchTweets,
})(hot(module)(App))

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

    font: inherit;
  }
`
