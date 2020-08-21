import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Modal from 'react-modal'

import moment from 'moment'
import Button from '../basic/Button/Button'
import { resetInput } from '../helpers/mixins'
import { color } from '../helpers/color'
import { RootState } from '../../store/state'
import { closeTweetForm } from '../../store/ducks/tweetForm'
import { api } from '../../api/api'

moment.locale('en')

export type NewTweetFormData = {
  text: string
  userName: string
  userHandle: string
}

type TweetFormProps = {
  type: 'create' | 'edit'
  isOpen: boolean
  onClose: () => void
}

const mapStateToProps = (state: RootState) => ({
  isOpen: !!state.form.tweetForm,
})

const mapDispatchToProps = {
  onClose: closeTweetForm,
}

const TweetForm: React.FC<TweetFormProps> = ({ isOpen, onClose, type }) => {
  const { register, handleSubmit, watch, errors, reset } = useForm({
    mode: 'onChange',
  })

  const onSubmit = async (data: NewTweetFormData) => {
    const newTweetData = {
      ...data,
      likes: 0,
      published: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000]'),
    }

    const result = await api.tweetCreate(newTweetData)
    // TODO: update tweets list
    reset()

    // TODO: handle errors
  }

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
    //osition: 'absolute',

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
