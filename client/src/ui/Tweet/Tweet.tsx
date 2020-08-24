import React from 'react'
import styled from 'styled-components'
import { TweetData } from '../../api/api-types'
import { color } from '../helpers/color'
import defaultAvatar from '../../assets/default_avatar.png'
import { ReactComponent as LikeIcon } from '../../assets/icons/like.svg'
import { ReactComponent as LikedIcon } from '../../assets/icons/liked.svg'
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg'
import IconButton from '../basic/IconButton/IconButton'
import { connect } from 'react-redux'
import { openUpdateTweetForm } from '../../store/ducks/tweetForm'
import { deleteTweetById, likeTweet } from '../../store/ducks/tweetsList'
import { formatTweetTime } from '../helpers/formatters'

export type TweetProps = {
  data: TweetData
  openUpdateTweetForm: (tweetId: string) => void
  deleteTweet: (tweetId: string) => void
  likeTweet: (tweetId: string) => void
}

const mapDispatchToProps = {
  openUpdateTweetForm,
  deleteTweet: deleteTweetById,
  likeTweet,
}

const ConnectedTweet: React.FC<TweetProps> = ({
  data,
  openUpdateTweetForm,
  deleteTweet,
  likeTweet,
}) => {
  return (
    <StyledTweet>
      <Avatar>
        <img src={defaultAvatar} />
      </Avatar>
      <TweetWrapper>
        <TweetTopSection>
          <AuthorName>{data.userName}</AuthorName>
          <AuthorHandle>@{data.userHandle}</AuthorHandle>
          <TweetDate>{formatTweetTime(data.created)}</TweetDate>
        </TweetTopSection>
        <TweetText>{data.text}</TweetText>
        <TweetActions>
          <Likes>
            <IconButton onClick={() => likeTweet(data.id)}>
              {data.likes === 0 ? <LikeIcon /> : <LikedIcon />}
            </IconButton>
            {data.likes}
          </Likes>
          <IconButton onClick={() => openUpdateTweetForm(data.id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => deleteTweet(data.id)}>
            <DeleteIcon />
          </IconButton>
        </TweetActions>
      </TweetWrapper>
    </StyledTweet>
  )
}

export default connect(null, mapDispatchToProps)(ConnectedTweet)

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
  width: 100%;
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
  justify-content: space-between;
`

const Likes = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 15px;
    height: 15px;
  }
`
