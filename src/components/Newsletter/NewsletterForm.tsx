/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import useIsMobile from 'hooks/useIsMobile'
import { Text, Flex, Svg, Input, ChevronRightIcon, useMatchBreakpoints, Button } from '@ape.swap/uikit'
import { useToast } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import { styles } from './styles'

const Newsletter: React.FC<{
  status: any
  message: any
  onValidated: any
}> = ({ status, message, onValidated }) => {
  const isMobile = useIsMobile()
  const { isMd } = useMatchBreakpoints()
  const { toastSuccess } = useToast()
  const { t } = useTranslation()
  const [subscriber, setSubscriber] = useState('')

  const onHandleChange = (evt) => {
    const { value } = evt.target
    setSubscriber(value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    subscriber.indexOf('@') > -1 &&
      onValidated({
        EMAIL: subscriber,
      })
    setSubscriber('')
    return status === 'success' && toastSuccess(t('Subscribe Successful'))
  }

  return (
    <Flex
      className="newsletter-con"
      sx={{
        ...styles.newsletter,
        height: [(status && '170px') || '170px', (status && '110px') || '90px', (status && '100px') || '66px'],
      }}
    >
      <Flex sx={styles.contentBody}>
        <Flex sx={styles.leftForm}>
          <Text sx={styles.getLatestText}>
            Get the latest from ApeSwap {isMobile && isMd && <br />} right to your inbox.
          </Text>
          <Flex>
            <Text sx={styles.privacyText}>We respect your privacy</Text>
            <Svg icon="question" width="10px" />
          </Flex>
        </Flex>

        <Flex className="input-form-container" as="form" onSubmit={(e) => handleSubmit(e)} sx={styles.form}>
          <Flex sx={{ alignItems: 'center' }}>
            <Svg icon="message" />
            <Input
              className="input"
              name="EMAIL"
              onChange={onHandleChange}
              value={subscriber}
              placeholder={(status === 'success' && message) || 'hornyape@domain.com'}
              sx={{
                ...styles.input,
                '::placeholder': {
                  opacity: (status === 'success' && 0.8) || 0.5,
                  fontStyle: 'italic',
                  fontSize: ['12px', '14px'],
                  lineHeight: '14px',
                  fontWeight: status === 'success' && 500,
                  color: status === 'success' && 'success',
                },
              }}
            />
          </Flex>
          <Button variant="text" className="input-btn" sx={styles.submit} type="submit" formValues={[subscriber]}>
            {status === 'sending' ? '...' : <ChevronRightIcon sx={{ width: '40px' }} />}
          </Button>
        </Flex>
      </Flex>
      {status === 'error' && (
        <Text color="error" sx={styles.status}>
          {t(`${message}`)}
        </Text>
      )}
    </Flex>
  )
}

export default Newsletter
