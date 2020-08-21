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
import moment from 'moment'
import TweetForm from './ui/TweetForm/TweetForm'
import { fetchTweets } from './store/ducks/tweetsList'
import { RootState } from './store/state'
import { openCreateTweetForm } from './store/ducks/tweetForm'
import { apiClient } from './api/api-client'
import { api } from './api/api'

moment.locale('en')

export type NewTweetFormData = {
  text: string
  userName: string
  userHandle: string
}

type AppProps = {
  tweetsData: TweetData[]
  fetchTweets: () => void
  openCreateTweetForm: () => void
}

const mapStateToProps = (state: RootState) => ({
  tweetsData: state.list.tweetsList,
})

const mapDispatchToProps = {
  fetchTweets,
  openCreateTweetForm,
}

const App: React.FC<AppProps> = ({
  tweetsData = [],
  fetchTweets,
  openCreateTweetForm,
}) => {
  useEffect(() => {
    // callAPI()
    fetchTweets()
  }, [])

  return (
    <div className="App">
      {/* <p>Api response: {apiResponse}</p> */}
      <Button ghost onClick={openCreateTweetForm} text="New tweet" />
      <TweetsList tweetsData={tweetsData} />
      <TweetForm />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App))
