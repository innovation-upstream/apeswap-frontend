/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { Flex, Svg, Text } from '@ape.swap/uikit'
import { styles } from '../../styles'
import { useTranslation } from 'contexts/Localization'
import { MergedZap } from 'state/zap/actions'
import DetailsPanel from './DetailsPanel'
import ConvertionPanel from './ConvertionPanel'

interface DistributionPanelProps {
  zap: MergedZap
}

const DistributionPanel: React.FC<DistributionPanelProps> = ({ zap }) => {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const { currencyOut1, currencyOut2 } = zap

  return (
    <Flex sx={styles.distributionPanelContainer}>
      <Flex sx={styles.panelTopContainer}>
        <Text sx={styles.swapDirectionText}>{t('Distribution')}:</Text>
      </Flex>
      <Flex sx={styles.pooledText} onClick={() => setExpanded(!expanded)}>
        {currencyOut1?.outputAmount?.toSignificant(5)} {currencyOut1?.outputCurrency?.symbol} &{' '}
        {currencyOut2?.outputAmount?.toSignificant(5)} {currencyOut2?.outputCurrency?.symbol} Pooled
        <Svg icon="caret" direction={expanded ? 'up' : 'down'} width="10px" />
      </Flex>
      {expanded && (
        <Flex sx={{ flexDirection: 'column', marginTop: '20px' }}>
          <ConvertionPanel zap={zap} />
          <DetailsPanel zap={zap} />
        </Flex>
      )}
    </Flex>
  )
}

export default React.memo(DistributionPanel)
