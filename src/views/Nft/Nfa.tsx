import React from 'react'
import Page from 'components/layout/Page'
import { useGetNfaSales } from 'hooks/api'
import styled from 'styled-components'
import { Text, Button } from '@apeswapfinance/uikit'
import { Link, Redirect, useParams } from 'react-router-dom'
import nfts from 'config/constants/nfts'
import useI18n from 'hooks/useI18n'
import NfaAttributes from './components/NfaAttributes'
import NfaSales from './components/NfaSales'
import Image from './components/Image'
import styles from './nfa.module.css'

const NfaImageHolder = styled.div.attrs({
  className: styles.nfaImageHolder,
})`
  overflow: hidden;
`

const NfaHolder = styled.div.attrs({
  className: styles.nfaHolder,
})`
  margin-top: 35px;
`

const PageHolder = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

const DetailsHolder = styled.div.attrs({
  className: styles.detailsHolder,
})`
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BoxShadow = styled.div.attrs({
  className: styles.boxShadow,
})`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.card};
  box-shadow: 0px 0px 10px ${(props) => props.theme.colors.textSubtle};
  align-items: center;
`

const Nfa = () => {
  const { id: idStr }: { id: string } = useParams()
  const id = Number(idStr)
  const TranslateString = useI18n()
  const nfa = nfts.find((nft) => nft.index === id)
  const sales = useGetNfaSales(id)

  if (!nfa) {
    return <Redirect to="/404" />
  }

  return (
    <Page>
      <Link to="/nft">
        <Button size="sm" style={{ marginTop: '25px' }}>
          {TranslateString(999, 'Back')}
        </Button>
      </Link>
      <PageHolder>
        <NfaHolder>
          <NfaImageHolder>
            <Image src={nfa.image} alt="" originalLink="" rarityTier={nfa.attributes.rarityTierNumber} />
          </NfaImageHolder>
          <NfaAttributes nfa={nfa} />
        </NfaHolder>
        <DetailsHolder>
          <BoxShadow>
            <Text fontSize="32px" color="primary">
              {TranslateString(999, `${nfa.name} ${nfa.index}`)}
            </Text>
            <Text fontFamily="poppins" fontSize="20px" color="textSubtle" style={{ margin: '5px 0px 5px 0px' }}>
              {TranslateString(999, nfa.attributes.rarityTierName)}
            </Text>
            <Text fontFamily="poppins" fontSize="20px" color="textSubtle" style={{ margin: '5px 0px 5px 0px' }}>
              {TranslateString(
                999,
                `Level ${nfa.attributes.rarityTierNumber} | Rarity ${nfa.attributes.rarityOverallRank} / 1000`,
              )}
            </Text>
            <a
              href={`https://nftkey.app/collections/nfas/token-details/?tokenId=${id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text
                fontFamily="poppins"
                fontSize="20px"
                color="textSubtle"
                style={{ textDecoration: 'underline', margin: '5px 0px 20px 0px' }}
              >
                {TranslateString(999, 'Marketplace')}
              </Text>
            </a>
          </BoxShadow>
          {sales && (
            <BoxShadow style={{ marginTop: '25px', padding: '5px 0px 10px 0px' }}>
              <Text fontFamily="poppins" fontSize="23px" color="textSubtle" style={{ margin: '10px 0px 15px 0px' }}>
                {TranslateString(999, sales?.length > 0 ? 'Previous Sales' : 'No Sale History')}
              </Text>
              {sales?.length > 0 ? (
                sales?.map((trx) => (
                  <NfaSales
                    tokenId={trx.tokenId}
                    value={trx.value}
                    blockNumber={trx.blockNumber}
                    transactionHash={trx.transactionHash}
                    from={trx.from}
                    to={trx.to}
                  />
                ))
              ) : (
                <img src="/images/no-sales.svg" alt="no sales" width="300px" />
              )}
            </BoxShadow>
          )}
        </DetailsHolder>
      </PageHolder>
    </Page>
  )
}

export default Nfa
