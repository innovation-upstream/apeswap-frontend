/** @jsxImportSource theme-ui */
import 'chart.js/auto'
import { Flex } from '@ape.swap/uikit'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import useTheme from 'hooks/useTheme'
import { styles } from './styles'

const data = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
      hoverOffset: 4,
    },
  ],
}

const BananaSupplyDistribution: React.FC = () => {
  return (
    <Flex sx={styles.cardContainer}>
      <Flex sx={{ height: '100px' }}>
        <Doughnut data={data} />
      </Flex>
    </Flex>
  )
}

export default BananaSupplyDistribution
