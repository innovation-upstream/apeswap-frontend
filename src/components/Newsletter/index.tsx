import React from 'react'
import MailChimpSubscribe from 'react-mailchimp-subscribe'
import Form from './Form'

const { REACT_APP_MAILCHIMP_ID, REACT_APP_MAILCHIMP_U } = process.env

const mailchimpUrl = `https://gmail.us18.list-manage.com/subscribe/post?u=${REACT_APP_MAILCHIMP_U}&id=${REACT_APP_MAILCHIMP_ID}`

const Newsletter: React.FC<{ isModal?: boolean }> = ({ isModal }) => {
  return (
    <MailChimpSubscribe
      url={mailchimpUrl}
      render={({ subscribe, status, message }) => (
        <Form status={status} message={message} onValidated={(formData) => subscribe(formData)} isModal={isModal} />
      )}
    />
  )
}

export default Newsletter
