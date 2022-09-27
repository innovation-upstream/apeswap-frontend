/** @jsxImportSource theme-ui */
import { Flex, Link, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import ReactPlayer from 'react-player'

const BabInfoCard: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Flex
      sx={{
        background: 'white2',
        padding: ['20px', '40px'],
        borderRadius: '10px',
        mt: '25px',
        minHeight: '400px',
        width: '100%',
        alignItems: 'center',
        '@media screen and (max-width: 725px)': { flexWrap: 'wrap-reverse' },
      }}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          width: '666px',
          padding: '0px 10px 0px 0px',
        }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            padding: '0px 20px 0px 30px',
            mr: '30px',
            '@media screen and (max-width: 725px)': {
              padding: '0px 0px',
              alignItems: 'center',
              justifyContent: 'center',
              mr: '0px',
            },
          }}
        >
          <Text
            size="30px"
            mb="50px"
            weight={700}
            sx={{
              textAlign: 'left',
              lineHeight: '45px',
              '@media screen and (max-width: 725px)': { textAlign: 'center' },
            }}
          >
            {t('The 30-Day Non-Fungible Banana NFT Raffle')}
          </Text>
          <Text
            size="22px"
            weight={500}
            sx={{ textAlign: 'left', '@media screen and (max-width: 725px)': { textAlign: 'center' } }}
          >
            {t(
              `From October 1st through October 31st, all holders of an ApeSwap BAB NFT will be eligible to participate in a daily raffle to win a Non Fungible Banana NFT.`,
            )}
            <br />
            <br />
            {t(`Make sure to return to this page daily in October to see if you have won an NFB!`)}
            <br />
            <br />
          </Text>
          <Text
            sx={{ textDecoration: 'underline', marginTop: '25px', fontSize: ['16px', '22px'], fontWeight: '700px' }}
          >
            <Link
              href="https://ape-swap.medium.com/apeswap-adds-launch-support-for-binances-first-soulbound-token-dbb2e0e4c263"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('Check out our Medium article to learn more >')}
            </Link>
          </Text>
        </Flex>
      </Flex>
      <Flex sx={{ width: ['240px', '414px'] }}>
        <ReactPlayer playing muted loop url="videos/bab-nfb.mp4" height="100%" width="100%" playsInline />
      </Flex>
    </Flex>
  )
}

export default React.memo(BabInfoCard)
