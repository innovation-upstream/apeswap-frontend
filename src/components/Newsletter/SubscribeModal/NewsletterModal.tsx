/** @jsxImportSource theme-ui */
import React from 'react'
import { Box } from 'theme-ui'
import { Text, CloseIcon, Flex, Svg, useMatchBreakpoints } from '@ape.swap/uikit'
import useIsMobile from 'hooks/useIsMobile'
import Newsletter from '..'

import { styles } from '../styles'
import { internalStyles } from './styles'

// Separate the Input field section from the Form and make it it's own component
// Input it separately into the NewsletterForm for normal pages
// Input it separately into the Subscribe Modal
const NewsletterModal: React.FC<{ onDismiss?: () => void }> = ({ onDismiss }) => {
  const isMobile = useIsMobile()
  const { isMd } = useMatchBreakpoints()
  return (
    <Flex className="newsletter-modal-con">
      <CloseIcon width={22} onClick={onDismiss} sx={{ cursor: 'pointer', position: 'absolute', right: '20px' }} />
      <Flex
        sx={{
          marginTop: '30px',
          flexDirection: ['column', 'column', 'row'],
          width: '100%',
          justifyContent: ['flex-start', 'flex-start', 'space-between'],
        }}
      >
        <Box
          sx={{
            alignSelf: ['', 'center', ''],
            width: ['', '280px', '46%'],
            height: ['350px', '280px', '400px'],
            '@media screen and (max-width: 320px)': {
              height: '300px',
            },
            background: `url(images/marketing-modals/emailApe.svg)`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            zIndex: 1,
          }}
        />
        <Flex
          sx={{
            flexDirection: 'column',
            marginTop: '25px',
            width: ['100%', '100%', '60%'],
            padding: ['', '', '20px'],
            alignItems: ['', '', 'center'],
            justifyContent: ['', '', 'center'],
          }}
        >
          <Flex sx={{ ...styles.leftForm, width: '100%' }}>
            <Text
              sx={{ ...styles.getLatestText, fontSize: ['16px', '16px', '25px'], lineheight: ['24px', '24px', '28px'] }}
            >
              Get the latest from <br /> ApeSwap right to your <br /> inbox.
            </Text>
          </Flex>
          <Newsletter isModal />
          <Flex sx={{ alignSelf: 'flex-start', marginTop: '10px' }}>
            <Text sx={{ ...styles.privacyText }}>We respect your privacy</Text>
            <Svg icon="question" width="10px" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default NewsletterModal
