import React from 'react'
import styled from 'styled-components'
import { TweetData } from '../../api/api-types'
import { color } from '../helpers/colors'
import defaultAvatar from '../../assets/default_avatar.png'

export type TweetProps = {
  data: TweetData
}

export const Tweet: React.FC<TweetProps> = ({ data }) => {
  return (
    <StyledTweet>
      <Avatar>
        <img src={defaultAvatar} />
      </Avatar>
      <TweetWrapper>
        <TweetTopSection>
          <AuthorName>{data.userName}</AuthorName>
          <AuthorHandle>@{data.user}</AuthorHandle>
          <TweetDate>{data.date}</TweetDate>
        </TweetTopSection>
        <TweetText>{data.text}</TweetText>
        <TweetActions>
          <span>Comments</span>
          <span>Share</span>
          <span>Like</span>
        </TweetActions>
      </TweetWrapper>
    </StyledTweet>
  )
}

const StyledTweet = styled.div`
  width: 100%;
  padding: 16px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const Avatar = styled.div`
  flex-shrink: 0;
  width: 49px;
  height: 49px;
  border-radius: 50%;
  overflow: hidden;

  margin-right: 32px;

  & img {
    width: 100%;
    height: auto;
  }
`

const TweetWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const TweetTopSection = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const AuthorName = styled.span`
  line-height: 1.3125;
  font-size: 15px;
  font-weight: bold;
  color: ${color.dark};

  margin-right: 16px;
`

const AuthorHandle = styled.span`
  font-size: 14px;
  color: ${color.grey};

  margin-right: 34px;
  position: relative;

  &::before {
    position: absolute;
    content: '';
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background-color: ${color.grey};

    top: 8px;
    right: -18px;
  }
`

const TweetDate = styled.span`
  font-size: 14px;
  color: ${color.grey};
`

const TweetText = styled.div`
  line-height: 1.3125;
  font-size: 15px;
  color: ${color.dark};

  text-align: left;
`

const TweetActions = styled.div`
  width: 100%;
  padding-top: 16px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  & > * {
    margin-right: 32px;
  }
`
