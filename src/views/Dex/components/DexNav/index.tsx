/** @jsxImportSource theme-ui */
import { Link, useHistory } from 'react-router-dom'
import { CogIcon, Flex, Text, useModal } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { CHAIN_ID } from 'config/constants/chains'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import SettingsModal from '../../../../components/Menu/GlobalSettings/SettingsModal'
import { styles } from './styles'

const DexNav = () => {
  const { t } = useTranslation()
  const { pathname } = useHistory().location
  const { chainId } = useActiveWeb3React()

  const onLiquidity =
    pathname?.includes('add') ||
    pathname?.includes('pool') ||
    pathname?.includes('remove') ||
    pathname?.includes('find')

  const [onPresentSettingsModal] = useModal(<SettingsModal />)

  return (
    <Flex sx={styles.dexNavContainer}>
      <Flex
        sx={{ ...styles.navLinkContainer, justifyContent: chainId === CHAIN_ID.BSC ? 'space-between' : 'flex-start' }}
      >
        <Text
          size="14px"
          sx={{
            ...styles.navLink,
            color: !pathname?.includes('swap') && 'textDisabled',
            mr: chainId === CHAIN_ID.BSC ? '0px' : '30px',
          }}
          as={Link}
          to="/swap"
          id="swap-link"
          className="swap"
        >
          {t('Swap')}
        </Text>
        {chainId === CHAIN_ID.BSC && (
          <Text
            size="14px"
            sx={{
              ...styles.navLink,
              color: !pathname?.includes('orders') && 'textDisabled',
            }}
            as={Link}
            to="/orders"
            id="orders-link"
            className="orders"
          >
            {t('Orders')}
          </Text>
        )}
        <Text
          size="14px"
          sx={{ ...styles.navLink, color: !onLiquidity && 'textDisabled' }}
          as={Link}
          to="/add"
          id="liquidity-link"
          className="liquidity"
        >
          {t('Liquidity')}
        </Text>
      </Flex>
      <Flex sx={{ ...styles.navIconContainer }}>
        {/* <CardIcon sx={{cursor: 'pointer'}}/> */}
        <CogIcon sx={{ cursor: 'pointer' }} onClick={onPresentSettingsModal} />
      </Flex>
    </Flex>
  )
}

export default React.memo(DexNav)
