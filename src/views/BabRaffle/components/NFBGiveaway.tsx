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
        minHeight: '400px',
        width: '100%',
        alignItems: 'center',
        flexWrap: ['wrap', 'nowrap'],
        gap: ['20px', 0],
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
            gap: ['20px', '50px'],
            flexDirection: 'column',
            textAlign: ['center', 'left'],
          }}
        >
          <Text
            sx={{
              fontSize: ['25px', '30px'],
              fontWeight: 700,
              lineHeight: '45px',
            }}
          >
            {t('The 30-Day Non-Fungible Banana NFT Raffle')}
          </Text>
          <Text
            sx={{
              fontSize: ['16px', '22px'],
              lineHeight: ['24px', '33px'],
              fontWeight: 500,
            }}
          >
            {t(
              `From October 1st through October 31st, all holders of an ApeSwap BAB NFT will be eligible to participate in a daily raffle to win a Non Fungible Banana NFT.`,
            )}
            <br />
            <br />
            {t(`Make sure to return to this page daily in October to see if you have won an NFB!`)}
          </Text>
          <Text
            sx={{
              textDecoration: 'underline',
              fontSize: ['16px', '22px'],
              fontWeight: '700px',
            }}
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
