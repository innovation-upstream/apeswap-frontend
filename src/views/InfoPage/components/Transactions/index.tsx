/** @jsxImportSource theme-ui */
import { Flex, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { orderBy } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { useFetchInfoNativePrice, useFetchInfoTokensData, useFetchInfoTransactions } from 'state/info/hooks'
import { Grid } from 'theme-ui'
import ReactPaginate from 'react-paginate'
import Rows from './Rows'
import styled from 'styled-components'
import { ChainId } from '@ape.swap/sdk'
import { Swaps } from 'state/info/types'

const ROWS_PER_PAGE = 10

const Transactions = () => {
  const [pageCount, setPageCount] = useState(0)
  const [dataOffset, setDataOffset] = useState(0)
  const transactions = useFetchInfoTransactions(20)

  const flattenedTransactions = Object.values(transactions).flatMap((row) =>
    row.initialized
      ? row.data?.flatMap(({ swaps, chainId }) =>
          swaps.map((swap) => {
            return { ...swap, chainId }
          }),
        )
      : [],
  ) as Swaps[]
  // const transactionsInitialized = Object.values(tokens)
  //   .flatMap((row) => row.initialized)
  //   ?.includes(true)
  const sortedTransactions = useMemo(
    () => orderBy(flattenedTransactions, ({ transaction }) => parseFloat(transaction.timestamp), 'desc'),
    [flattenedTransactions],
  )
  const handlePageClick = (event) => {
    const newOffset = (event.selected * ROWS_PER_PAGE) % sortedTransactions.length
    setDataOffset(newOffset)
  }
  useEffect(() => {
    setPageCount(Math.ceil(sortedTransactions.length / ROWS_PER_PAGE))
  }, [sortedTransactions.length, dataOffset])

  return (
    <Flex sx={{ flexDirection: 'column', width: '100%', mt: '20px' }}>
      <Text size="18px" weight={700}>
        Recent Transactions
      </Text>
      <Flex
        sx={{
          width: '100%',
          height: '550px',
          background: 'white2',
          flexDirection: 'column',
          padding: '30px 10px 20px 10px',
          borderRadius: '10px',
          mt: '20px',
        }}
      >
        <Rows
          transactions={sortedTransactions.slice(dataOffset, dataOffset + ROWS_PER_PAGE)}
          activeIndex={dataOffset}
        />
        <Flex sx={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <Pagination
            previousLabel="<"
            nextLabel=">"
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            onPageChange={handlePageClick}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Transactions

const Pagination = styled(ReactPaginate).attrs({
  activeClassName: 'active',
})`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  padding: 0.75rem 0;
  li {
    height: 32px;
    width: 32px;
    border-radius: 7px;
    border: gray 1px solid;
    cursor: pointer;
    margin-right: 0.5rem;
  }
  li.previous,
  li.next,
  li.break {
    border-color: transparent;
  }
  li.active {
    background-color: #ffb300;
    border-color: transparent;
    color: white;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }

  li a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`
