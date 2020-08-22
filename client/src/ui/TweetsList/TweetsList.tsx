import React from 'react'
import styled from 'styled-components'
import { TweetData } from '../../api/api-types'
import Tweet from '../Tweet/Tweet'
import { color } from '../helpers/color'

export type TweetsListProps = {
  tweetsData: TweetData[]
}

export const TweetsList: React.FC<TweetsListProps> = ({ tweetsData }) => {
  return (
    <StyledTweetsList>
      {tweetsData.map((tweet, index) => (
        <Tweet key={`tweet-${index}`} data={tweet} />
      ))}
    </StyledTweetsList>
  )
}

const StyledTweetsList = styled.div`
  width: 100%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  border-top: 1px solid ${color.border};

  & > * {
    border-bottom: 1px solid ${color.border};
  }
`
