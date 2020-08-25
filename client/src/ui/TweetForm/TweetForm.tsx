import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import Modal from 'react-modal'

import moment from 'moment'
import Button from '../basic/Button/Button'
import { RootState } from '../../store/state'
import { closeTweetForm } from '../../store/ducks/tweetForm'
import { api } from '../../api/api'
import { TweetData, NewTweetData } from '../../api/api-types'
import { addTweet, updateTweet } from '../../store/ducks/tweetsList'
import Input from '../basic/Input/Input'

moment.locale('en')

type TweetFormProps = {
  type: 'create' | 'update' | null
  isOpen: boolean
  onClose: () => void
  onTweetAdd: (tweetData: TweetData) => void
  onTweetUpdate: (tweetData: TweetData) => void
  tweetData: TweetData | null | undefined
}

const mapStateToProps = (state: RootState) => ({
  isOpen: !!state.form.tweetForm,
  type: state.form.tweetForm?.type || null,
  tweetData:
    state.form.tweetForm && state.form.tweetForm.tweetId
      ? // @ts-ignore
        state.list.tweetsList.find((t) => t.id === state.form.tweetForm.tweetId)
      : null,
})

const mapDispatchToProps = {
  onClose: closeTweetForm,
  onTweetAdd: addTweet,
  onTweetUpdate: updateTweet,
}

const TweetForm: React.FC<TweetFormProps> = ({
  isOpen,
  onClose,
  type,
  onTweetAdd,
  onTweetUpdate,
  tweetData,
}) => {
  console.log('TWEET FORM PROPS', type, tweetData)
  const onSubmit = async (data: NewTweetData) => {
    console.log('submit', data)
    if (type === 'create') {
      const newTweetData = {
        ...data,
      }

      const result = await api.tweetCreate(newTweetData)

      onTweetAdd(result)
    } else {
      const updatedTweetData = {
        ...(tweetData as TweetData),
        userName: data.userName,
        text: data.text,
      }

      const result = await api.tweetUpdate(
        updatedTweetData.id,
        updatedTweetData
      )
      onTweetUpdate(result)
    }
    reset()
    onClose()

    // TODO: handle errors
  }

  let initialValues: NewTweetData = {
    userName: '',
    text: '',
  }

  if (!!tweetData) {
    initialValues = {
      userName: tweetData.userName,
      text: tweetData.text,
    }
  }

  console.log('init val', initialValues)

  const { register, handleSubmit, errors, reset } = useForm({
    mode: 'onChange',
    defaultValues: initialValues,
  })

  useEffect(() => {
    reset(initialValues)
  }, [reset, tweetData])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      onAfterOpen={() => (document.documentElement.style.overflow = 'hidden')}
      onAfterClose={() => document.documentElement.removeAttribute('style')}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TweetFormWrapper>
          <Input
            name="userName"
            disabled={type === 'update'}
            ref={register({ required: true })}
            placeholder="Your name"
          />
          <Input
            multiline
            name="text"
            ref={register({ required: true })}
            placeholder="What's happening?"
            defaultValue={type === 'update' && tweetData ? tweetData.text : ''}
          />
          {/* errors will return when field validation fails  */}
          {/* {errors.exampleRequired && <span>This field is required</span>} */}
          <Button type="submit" text="Tweet" />
        </TweetFormWrapper>
      </form>
    </Modal>
  )
}

const customStyles = {
  content: {
    maxWidth: '500px',
    width: 'calc(100% - 32px)',
    /*height: '468px',*/
    top: '50%',
    bottom: 'auto',
    left: '50%',
    right: 'auto',
    transform: 'translate(-50%, -50%)',

    padding: 0,
    backgroundColor: '#F1F1F1',
    border: 'none',
    overflow: 'visible',
    borderRadius: 16,

    '@media (maxWidth:1023px)': {
      width: 'calc(100% - 32px)',
      maxWidth: '510px',
    },
  },
  overlay: {
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
}

const TweetFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  padding-top: 24px;
  padding-bottom: 24px;

  & > * {
    margin-bottom: 16px;
  }
`

export default connect(mapStateToProps, mapDispatchToProps)(TweetForm)
