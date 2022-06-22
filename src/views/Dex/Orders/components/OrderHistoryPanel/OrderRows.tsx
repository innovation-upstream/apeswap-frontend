/** @jsxImportSource theme-ui */
import { Flex, InfoIcon, Svg, Text, TooltipBubble } from '@ape.swap/uikit'
import { Order, OrderStatus } from '@autonomylabs/limit-stop-orders'
import ListViewContent from 'components/ListViewContent'
import { CurrencyLogo } from 'components/Logo'
import { useTranslation } from 'contexts/Localization'
import { formatUnits, getAddress } from 'ethers/lib/utils'
import { useAllTokens } from 'hooks/Tokens'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React, { useCallback } from 'react'
import { Grid, Box, Divider } from 'theme-ui'
import MonkeyImage from './MonkeyImage'
import { styles } from './styles'

const OrderRows: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const { chainId } = useActiveWeb3React()
  const allTokens = useAllTokens()
  const { t } = useTranslation()
  return (
    <>
      <Grid gap="0px" columns={['.5fr .2fr 2fr 2fr 2.5fr .5fr']} sx={styles.titleContainer}>
        <span> </span>
        <span> </span>
        <Text size="14px" weight={700} sx={{ alignSelf: 'center' }}>
          {t('Swap')}
        </Text>
        <Text size="14px" weight={700} sx={{ alignSelf: 'center' }}>
          {t('For')}
        </Text>
        <Text size="14px" weight={700} sx={{ alignSelf: 'center' }}>
          {t('Price')}
        </Text>
        <span> </span>
      </Grid>
      <div sx={{ background: 'white3', borderRadius: '0px 0px 10px 10px' }}>
        {orders?.length !== 0 ? (
          orders.map((order, i) => {
            console.log(order)
            const inputToken = allTokens[getAddress(order.inputToken)]
            const outputToken = allTokens[getAddress(order.outputToken)]
            const inputAmount = formatUnits(order.inputAmount, inputToken?.decimals)
            const outputAmount = formatUnits(order.outputAmount, outputToken?.decimals)
            const orderStatus = order.status
            return (
              <>
                <Grid
                  gap="0px"
                  columns={['.5fr .2fr 2fr 2fr 2.5fr .5fr']}
                  sx={{ margin: '10px 0px', padding: '0px 5px' }}
                  key={order.id}
                >
                  <Flex
                    sx={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingLeft: '2.5px',
                    }}
                  >
                    <TooltipBubble body={<>asdasdsad</>} translate="no">
                      <Svg icon="info" width="12px" />
                    </TooltipBubble>
                  </Flex>
                  <span> </span>
                  <Flex sx={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <Text size="12px" weight={700} sx={{ lineHeight: '17.5px' }}>
                      {parseFloat((+inputAmount).toFixed(6))}
                    </Text>
                    <Flex sx={{ alignItems: 'center' }}>
                      <CurrencyLogo currency={inputToken} size="12px" />
                      <Text size="10px" weight={400} ml="3px" sx={{ lineHeight: '15px' }}>
                        {inputToken.getSymbol(chainId)}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex sx={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <Text size="12px" weight={700} sx={{ lineHeight: '17.5px', wordBreak: 'break-all' }}>
                      {parseFloat((+outputAmount).toFixed(6))}
                    </Text>
                    <Flex sx={{ alignItems: 'center' }}>
                      <CurrencyLogo currency={outputToken} size="12px" />
                      <Text size="10px" weight={400} ml="3px" sx={{ lineHeight: '15px' }}>
                        {outputToken.getSymbol(chainId)}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex sx={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <Text size="12px" weight={700} sx={{ lineHeight: '17.5px', wordBreak: 'break-all' }}>
                      {parseFloat((+outputAmount / +inputAmount).toFixed(6))}
                    </Text>
                    <Flex sx={{ alignItems: 'center' }}>
                      <Text size="10px" weight={400} sx={{ lineHeight: '15px', wordBreak: 'break-all' }}>
                        {outputToken.getSymbol(chainId)} / {inputToken.getSymbol(chainId)}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
                    {orderStatus === 'cancelled' ? (
                      <Svg icon="cancelled" width="12px" color="error" />
                    ) : orderStatus === 'open' ? (
                      <Svg icon="trash" width="12px" />
                    ) : (
                      <Svg icon="successOutline" width="12px" color="success" />
                    )}
                  </Flex>
                </Grid>
                {i !== orders?.length - 1 && <Divider sx={{ background: 'text' }} />}
              </>
            )
          })
        ) : (
          <Flex sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px 0px' }}>
            <MonkeyImage />
            <Text size="14px" sx={{ margin: '10px 0px 5px 0px', opacity: '.5' }}>
              {t('Empty list')}
            </Text>
            <Text size="12px" sx={{ opacity: '.5' }}>
              {t('Your orders will appear here')}
            </Text>
          </Flex>
        )}
      </div>
    </>
  )
}

export default React.memo(OrderRows)
