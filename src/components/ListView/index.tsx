import React, { useContext } from 'react'
import { SSRContext } from 'contexts/SSRContext'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import useIsMobile from 'hooks/useIsMobile'
import ListCard from './ListCard'
import { ListViewContainer } from './styles'
import MobileListCard from './MobileListCard'
import { ExtendedListViewProps } from './types'

const ListView: React.FC<{ listViews: ExtendedListViewProps[] }> = ({ listViews }) => {
  const { isDesktop, isBrowser } = useContext(SSRContext)
  const isMobileView = useIsMobile()
  const isMobile = isBrowser ? isMobileView : !isDesktop

  return (
    <ListViewContainer>
      {listViews.map((view) => {
        return isMobile ? (
          <MobileListCard
            serviceTokenDisplay={
              <ServiceTokenDisplay
                token1={view.tokens.token1}
                token2={view.tokens.token2}
                token3={view.tokens?.token3}
                billArrow={view?.billArrow}
                stakeLp={view?.stakeLp === false ? view.stakeLp : true}
              />
            }
            tag={view?.tag}
            title={view.title}
            cardContent={view.cardContent}
            expandedContent={view.expandedContent}
            infoContent={view.infoContent}
            infoContentPosition={view?.infoContentPosition}
            key={view.id}
            open={view?.open}
            expandedContentSize={view?.expandedContentSize}
          />
        ) : (
          <ListCard
            serviceTokenDisplay={
              <ServiceTokenDisplay
                token1={view.tokens.token1}
                token2={view.tokens.token2}
                token3={view.tokens?.token3}
                billArrow={view?.billArrow}
                stakeLp={view?.stakeLp === false ? view.stakeLp : true}
              />
            }
            tag={view?.tag}
            title={view.title}
            cardContent={view.cardContent}
            expandedContent={view.expandedContent}
            infoContent={view.infoContent}
            infoContentPosition={view?.infoContentPosition}
            key={view.id}
            open={view?.open}
          />
        )
      })}
    </ListViewContainer>
  )
}

export default React.memo(ListView)
