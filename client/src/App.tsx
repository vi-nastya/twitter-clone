import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'

import './App.css'
import { TweetsList } from './ui/TweetsList/TweetsList'
import Button from './ui/basic/Button/Button'
import { TweetData } from './api/api-types'
import moment from 'moment'
import TweetForm from './ui/TweetForm/TweetForm'
import { fetchTweets } from './store/ducks/tweetsList'
import { RootState } from './store/state'
import { openCreateTweetForm } from './store/ducks/tweetForm'

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
    fetchTweets()
  }, [])

  return (
    <div className="App">
      <Wrapper>
        <TweetsList tweetsData={tweetsData} />
        <TweetForm />
        <Button ghost onClick={openCreateTweetForm} text="Add tweet" />
      </Wrapper>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App))

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > *:last-child {
    margin-top: 32px;
  }
`
