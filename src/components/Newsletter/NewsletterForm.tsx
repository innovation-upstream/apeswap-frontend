/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import useIsMobile from 'hooks/useIsMobile'
import { Text, Flex, Svg, Input, ChevronRightIcon, useMatchBreakpoints, Button } from '@ape.swap/uikit'
import { useToast } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import { styles } from './styles'

const NewsletterForm: React.FC<{
  status: any
  message: any
  onValidated: any
  isModal?: boolean
}> = ({ status, message, onValidated, isModal }) => {
  const isMobile = useIsMobile()
  const { isMd, isLg, isXl, isXxl } = useMatchBreakpoints()
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
      sx={{
        marginTop: isModal && '25px',
        width: ['100%', '100%', (isModal && '60%') || '100%'],
        padding: [(!isModal && '15px') || '', '', '20px'],
        alignItems: [isModal && 'center', isModal && 'center', isModal && 'center', 'center'],
        justifyContent: [(!isModal && 'flex-start') || '', '', 'center'],
        background: !isModal && 'white2',
        flexDirection: status === 'success' && 'column',
      }}
    >
      <Flex
        sx={{
          width: '100%',
          alignItems: [(!isModal && 'flex-start') || '', '', ''],
          justifyContent: ['', !isModal && 'flex-start', !isModal && ''],
          flexDirection: ['column', (isModal && 'column') || 'row'],
          maxWidth: !isModal && '1200px',
        }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            mr: [0, 0, 0, 0, '82px'],
            width: ['100%', !isModal && '40%', !isModal && '50%', !isModal && '45%'],
          }}
        >
          <Text
            sx={{
              fontWeight: 700,
              fontSize: ['16px', '16px', isModal && '25px'],
              lineHeight: ['24px', '24px', isModal && '28px'],
            }}
          >
            Get the latest from {isModal && <br />} ApeSwap {!isModal && (isMobile || isMd) && <br />} right to your{' '}
            {isModal && <br />} inbox.
          </Text>
          {!isModal && (
            <Flex sx={{ alignSelf: 'flex-start', marginTop: (isModal && '10px') || '5px' }}>
              <Text sx={{ ...styles.privacyText }}>We respect your privacy</Text>
              <Svg icon="question" width="10px" />
            </Flex>
          )}
        </Flex>

        <Flex
          className="input-form-container"
          as="form"
          onSubmit={(e) => handleSubmit(e)}
          sx={{
            ...styles.form,
            width: [
              '100%',
              (!isModal && '45%') || '100%',
              (!isModal && '60%') || '100%',
              (!isModal && ((isLg && '42%') || (isXl && '42%') || (isXxl && '35%'))) || '',
            ],
            marginTop: ['10px', '', isModal && '20px'],
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
                border: 'none',
                paddingRight: '5px',
                width: [(isModal && '190px') || '240px', (isModal && '230px') || '290px', (isModal && '270px') || ''],
                paddingLeft: '10px',
                '@media screen and (min-width: 425px) and (max-width: 768px)': {
                  width: (isModal && '230px') || (!isModal && ((isMd && '225px') || (isXl && '310px'))) || '290px',
                },
                '@media screen and (max-width: 320px)': {
                  paddingLeft: '5px',
                  width: (isModal && '140px') || '185px',
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
          </Flex>
          <Button variant="text" className="input-btn" sx={styles.submit} type="submit" formValues={[subscriber]}>
            {status === 'sending' ? '...' : <ChevronRightIcon sx={{ width: '40px' }} />}
          </Button>
        </Flex>
        {isModal && (
          <Flex sx={{ alignSelf: 'flex-start', marginTop: '10px' }}>
            <Text sx={{ ...styles.privacyText }}>We respect your privacy</Text>
            <Svg icon="question" width="10px" />
          </Flex>
        )}
        {isModal && status === 'error' && (
          <Text color="error" sx={styles.status}>
            {t(`${message}`)}
          </Text>
        )}
      </Flex>
      {!isModal && status === 'error' && (
        <Text color="error" sx={{ ...styles.status, alignSelf: ['flex-start', '', 'center'] }}>
          {t(`${message}`)}
        </Text>
      )}
    </Flex>
  )
}

export default NewsletterForm
