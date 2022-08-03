/** @jsxImportSource theme-ui */
import React from 'react'
import { Box } from 'theme-ui'
import { Flex, Heading, Button, Text, ChevronRightIcon } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { gnanaStyles } from './styles'

const Gnana = () => {
  const { t } = useTranslation()

  return (
    <Flex>
      <Flex
        sx={{
          width: '100%',
          alignItems: 'center',
          backgroundColor: 'yellow',
          padding: '10px',
          borderRadius: '10px',
          marginTop: '10px',
          opacity: 0.7,
        }}
      >
        <Flex sx={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Heading as="h1" sx={{ ...gnanaStyles.warningHeader, color: 'primaryBright' }}>
            {t('HEADS UP, APES!')}
          </Heading>

          <Box
            sx={{
              padding: '0px',
              fontSize: ['14px'],
            }}
          >
            <Text
              align="center"
              sx={{
                fontSize: ['12px'],
                letterSpacing: '5%',
                fontWeight: 500,
                color: 'primaryBright',
                textAlign: 'center',
              }}
            >
              {t(
                'Converting from BANANA to GNANA involves paying a 28% burn fee and a 2% reflect fee for a total cost of 30% per conversion. For every 1 BANANA you convert, you will receive 0.7 GNANA.',
              )}
            </Text>
          </Box>

          <Button
            variant="text"
            sx={{
              textDecorationLine: 'underline',
              fontSize: '12px',
              fontWeight: 500,
              color: 'primaryBright',

              '&&:hover': {
                color: 'primaryBright',
              },
            }}
          >
            {t('Learn More')} <ChevronRightIcon color="primaryBright" />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default React.memo(Gnana)
