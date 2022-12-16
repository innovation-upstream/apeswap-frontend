/** @jsxImportSource theme-ui */
import React from 'react'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import useIsMobile from 'hooks/useIsMobile'
import ListCard from './ListCard'
import { ListViewContainer } from './styles'
import MobileListCard from './MobileListCard'
import { ListViewProps } from './types'

const ListView: React.FC<{ listViews: ListViewProps[] }> = ({ listViews }) => {
  const isMobile = useIsMobile()

  return (
    <ListViewContainer>
      {listViews.map((view: ListViewProps) => {
        return isMobile ? (
          <MobileListCard
            serviceTokenDisplay={
              <ServiceTokenDisplay {...view.tokenDisplayProps} dualEarn={view.tokenDisplayProps?.token4 != null} />
            }
            {...view.listProps}
          />
        ) : (
          <ListCard
            serviceTokenDisplay={
              <ServiceTokenDisplay {...view.tokenDisplayProps} dualEarn={view.tokenDisplayProps?.token4 != null} />
            }
            {...view.listProps}
          />
        )
      })}
    </ListViewContainer>
  )
}

export default React.memo(ListView)
