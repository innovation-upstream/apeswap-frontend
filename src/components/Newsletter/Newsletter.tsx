/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import useIsMobile from 'hooks/useIsMobile'
import { Text, Flex, Svg, Input, ChevronRightIcon, useMatchBreakpoints, Button } from '@ape.swap/uikit'
import useMailChimpSubscribe from 'hooks/useMailChimpSubscribe'
import { useToast } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'

// TWO OPTIONS
// - FORM ACTION - USING THIS
// - API KEY
// - subscribe a user to mailchimp

const Newsletter: React.FC<{
  status: any
  message: any
  onValidated: any
}> = ({ status, message, onValidated }) => {
  const isMobile = useIsMobile()
  const { isMd } = useMatchBreakpoints()
  // const { toastSuccess } = useToast()
  const { t } = useTranslation()
  const [subscriber, setSubscriber] = useState('')

  // const [mailchimpSubscribe] = useMailChimpSubscribe(subscriber)

  const onHandleChange = (evt) => {
    const { value } = evt.target
    setSubscriber(value)
  }

  // const subscribe = async () => {
  //   const subscribed = await mailchimpSubscribe()
  //   console.log('subscribed:::', subscribed)
  //   if (subscribed) {
  //     toastSuccess(t('Subscribe Successful'))
  //   }
  //   setSubscriber('')
  // }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    console.log('subscriber:::', subscriber)
    subscriber.indexOf('@') > -1 &&
      onValidated({
        EMAIL: subscriber,
      })
    setSubscriber('')
  }

  return (
    <Flex
      className="newsletter-con"
      sx={{
        width: '100%',
        background: 'white2',
        height: ['155px', '90px', '66px'],
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Flex
        sx={{
          width: ['88%', '90%', '90%', '90%', '100%'],
          maxWidth: '1200px',
          alignItems: 'center',
          flexDirection: ['column', 'row'],
          gap: ['12px', 0],
        }}
      >
        <Flex sx={{ flexDirection: 'column', mr: [0, 0, 0, 0, '82px'], width: ['100%', '50%', '50%', '50%', '100%'] }}>
          <Text sx={{ fontWeight: 700, fontSize: '16px', lineHeight: '24px' }}>
            Get the latest from ApeSwap {isMobile && isMd && <br />} right to your inbox.
          </Text>
          <Flex>
            <Text sx={{ fontWeight: 500, fontSize: '12px', lineHeight: '14px', fontStyle: 'italic', mr: '5px' }}>
              We respect your privacy
            </Text>
            <Svg icon="question" width="10px" />
          </Flex>
        </Flex>

        <Flex
          className="input-form-container"
          as="form"
          onSubmit={(e) => handleSubmit(e)}
          sx={{
            background: 'white3',
            width: ['360px', '360px', '360px', ''],
            height: '42px',
            borderRadius: '10px',
            paddingLeft: ['8px', '10px', '24px'],
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Flex sx={{ alignItems: 'center' }}>
            <Svg icon="message" />
            <Input
              className="input"
              name="EMAIL"
              onChange={onHandleChange}
              value={subscriber}
              placeholder="hornyape@domain.com"
              sx={{
                border: 'none',
                width: ['220px', '230px', '220px'],
                paddingRight: '5px',
                '::placeholder': {
                  opacity: 0.5,
                  fontStyle: 'italic',
                  fontSize: ['12px', '14px'],
                  lineHeight: '14px',
                },
              }}
            />
          </Flex>
          <Button
            variant="text"
            className="input-btn"
            sx={{
              border: 'none',
              background: 'white4',
              width: '75px',
              height: '42px',
              borderRadius: '10px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            type="submit"
            formValues={[subscriber]}
          >
            {status === 'sending' ? '...' : <ChevronRightIcon sx={{ width: '40px' }} />}
          </Button>
        </Flex>
      </Flex>
      <Text fontWeight={700}>Thank you for subscribing...</Text>
      {status === 'error' && <Text color="error">{t(`${message}`)}</Text>}
      {status === 'success' && <Text color="success">{t(`${message}`)}</Text>}
    </Flex>
  )
}

export default Newsletter
