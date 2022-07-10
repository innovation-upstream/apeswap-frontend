import React, { useState } from 'react'
import { Token } from '@apeswapfinance/sdk'
import { ButtonMenu, ButtonMenuItem, Toggle } from '@ape.swap/uikit'
import { TokenList } from '@uniswap/token-lists'
import { useTranslation } from 'contexts/Localization'
import ManageLists from './ManageLists'
import ManageTokens from './ManageTokens'
import { CurrencyModalView } from './types'

export default function Manage({
  setModalView,
  setImportList,
  setImportToken,
  setListUrl,
}: {
  setModalView: (view: CurrencyModalView) => void
  setImportToken: (token: Token) => void
  setImportList: (list: TokenList) => void
  setListUrl: (url: string) => void
}) {
  const [showLists, setShowLists] = useState(true)
  const { t } = useTranslation()
  return (
    <div style={{ padding: '0px 10px 20px 10px' }}>
      <div style={{ margin: '10px 0px 20px 0px' }}>
        <Toggle labels={[t('LIST'), t('TOKENS')]} checked={!showLists} onChange={() => setShowLists((prev) => !prev)} />
      </div>
      {showLists ? (
        <ManageLists setModalView={setModalView} setImportList={setImportList} setListUrl={setListUrl} />
      ) : (
        <ManageTokens setModalView={setModalView} setImportToken={setImportToken} />
      )}
    </div>
  )
}
