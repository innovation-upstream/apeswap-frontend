/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import useIsMobile from 'hooks/useIsMobile'
import { Text, Flex, Svg, Input, ChevronRightIcon, useMatchBreakpoints, Button } from '@ape.swap/uikit'
import { useToast } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import { styles } from './styles'

const Form: React.FC<{
  status: any
  message: any
  onValidated: any
  isModal?: boolean
}> = ({ status, message, onValidated, isModal }) => {
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
      className="input-form-container"
      as="form"
      onSubmit={(e) => handleSubmit(e)}
      sx={{
        ...styles.form,
        width: [(isModal && '100%') || '360px', (isModal && '100%') || '360px', (isModal && '100%') || '360px', ''],
        marginTop: ['', '', isModal && '20px'],
      }}
    >
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
            width: ['190px', '290px'],
            paddingLeft: '10px',
            '@media screen and (min-width: 425px)': {
              width: '230px',
            },
            '@media screen and (max-width: 320px)': {
              paddingLeft: '5px',
              width: '140px',
            },
            '::placeholder': {
              opacity: (status === 'success' && 0.8) || 0.5,
              fontStyle: 'italic',
              fontSize: ['12px', '14px'],
              lineHeight: '14px',
              fontWeight: status === 'success' && 500,
              color: (status === 'success' && 'success') || 'text',
            },
          }}
        />
        {/* xs: 370 sm:576 md: 852 lg: 968 xl: 1080 */}
      </Flex>
      <Button variant="text" className="input-btn" sx={styles.submit} type="submit" formValues={[subscriber]}>
        {status === 'sending' ? '...' : <ChevronRightIcon sx={{ width: '40px' }} />}
      </Button>
    </Flex>
  )
}

export default Form
