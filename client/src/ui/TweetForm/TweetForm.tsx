import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import Modal from 'react-modal'

import moment from 'moment'
import Button from '../basic/Button/Button'
import { resetInput } from '../helpers/mixins'
import { color } from '../helpers/color'
import { RootState } from '../../store/state'
import { closeTweetForm } from '../../store/ducks/tweetForm'
import { api } from '../../api/api'
import { TweetData } from '../../api/api-types'
import { addTweet, updateTweet } from '../../store/ducks/tweetsList'

moment.locale('en')

export type NewTweetFormData = {
  text: string
  userName: string
  userHandle: string
}

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
  const onSubmit = async (data: NewTweetFormData) => {
    if (type === 'create') {
      const newTweetData = {
        ...data,
        likes: 0,
        published: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000]'),
      }

      const result = await api.tweetCreate(newTweetData)

      onTweetAdd(result)
    } else {
      const updatedTweetData = {
        ...(tweetData as TweetData),
        userName: data.userName,
        userHandle: data.userHandle,
        text: data.text,
        updated: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000]'),
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

  let initialValues: NewTweetFormData = {
    userName: '',
    userHandle: '',
    text: '',
  }

  if (!!tweetData) {
    initialValues = {
      userName: tweetData.userName,
      userHandle: tweetData.userHandle || '',
      text: tweetData.text,
    }
  }

  console.log('init val', initialValues)

  const { register, handleSubmit, watch, errors, reset } = useForm({
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
          <input
            name="userHandle"
            disabled={type === 'update'}
            ref={register({ required: false })}
            placeholder="Twitter handle"
          />
          <input
            name="userName"
            disabled={type === 'update'}
            ref={register({ required: true })}
            placeholder="Display name"
          />
          <input
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
    height: '468px',
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
}

const TweetFormContainer = styled.div``

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

export default connect(mapStateToProps, mapDispatchToProps)(TweetForm)
