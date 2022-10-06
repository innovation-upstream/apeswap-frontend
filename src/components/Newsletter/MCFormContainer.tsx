import { Flex } from '@ape.swap/uikit'
import React from 'react'
import MailChimpSubscribe from 'react-mailchimp-subscribe'
import Newsletter from './Newsletter'

const { REACT_APP_MAILCHIMP_ID, REACT_APP_MAILCHIMP_U } = process.env

const mailchimpUrl = `https://gmail.us18.list-manage.com/subscribe/post?u=${REACT_APP_MAILCHIMP_U}&id=${REACT_APP_MAILCHIMP_ID}`

const MCFormContainer = () => {
  return (
    <Flex className="mc-form-container">
      <MailChimpSubscribe
        url={mailchimpUrl}
        render={({ subscribe, status, message }) => (
          <Newsletter status={status} message={message} onValidated={(formData) => subscribe(formData)} />
        )}
      />
    </Flex>
  )
}

export default MCFormContainer
