import React, { lazy, Suspense } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { Skeleton } from '@apeswapfinance/uikit'
import Container from 'components/layout/Container'
import IfoTabButtons from './components/IfoTabButtons'
import Hero from './components/Hero'

const CurrentIfo = lazy(() => import('./CurrentIfo'))
const PastIfo = lazy(() => import('./PastIfo'))

const Ifos = () => {
  const { path } = useRouteMatch()

  return (
    <>
      <Hero />
      <Container>
        <IfoTabButtons />
        <Suspense fallback={<Skeleton width="100%" height="52px" />}>
          <switch>
            <Route exact path={`${path}`}>
              <CurrentIfo />
            </Route>
            <Route path={`${path}/history`}>
              <PastIfo />
            </Route>
          </switch>
        </Suspense>
      </Container>
    </>
  )
}

export default Ifos
