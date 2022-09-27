/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import Banner from 'components/Banner'
import SwiperProvider from 'contexts/SwiperProvider'
import Values from 'views/Homepage/components/Values/Values'
import BabInfoCard from './components/BabInfoCard'
import NFBGiveaway from './components/NFBGiveaway'
import Services from 'views/Homepage/components/Services/Services'

const Nft = () => {
  const { t } = useTranslation()

  // Stage #1
  // Change all wording for components that already exist
  // on the /bab-raffle page
  // Implement "New to DeFi" section
  // Implement "Featured ApeSwap Products" section
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        mb: '100px',
        marginTop: '10px',
      }}
    >
      <Flex sx={{ flexDirection: 'column', width: '100%', maxWidth: '1200px' }}>
        <Banner
          banner="BABbanner"
          link="https://ape-swap.medium.com/apeswap-adds-launch-support-for-binances-first-soulbound-token-dbb2e0e4c263"
          title={t('ApeSwap BAB Pass')}
          margin="0 0 20px 0"
        />
        <BabInfoCard />
        <NFBGiveaway />
      </Flex>
      <Flex className="services-con" sx={{ width: '100%', flexDirection: 'column' }}>
        <SwiperProvider>
          <Services bab />
        </SwiperProvider>
        <Flex sx={{ marginTop: '25px' }} />
        <SwiperProvider>
          <Values />
        </SwiperProvider>
      </Flex>
    </Flex>
  )
}

export default Nft
