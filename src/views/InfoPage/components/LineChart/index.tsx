/** @jsxImportSource theme-ui */
import { Flex, Spinner } from '@ape.swap/uikit'
import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import { Section } from '../styles'
import moment from 'moment/moment'

interface LineChartProps {
  data?: []
  xField: string
  yField: string
  type: string
}

const LineChart: React.FC<LineChartProps> = (props) => {
  const { data, xField, yField, type } = props

  const formattedData = [
    {
      id: type,
      color: 'hsl(171%, 70%, 50%)',
      data: [],
    },
  ]

  formattedData[0].data = data.map((a) => ({ y: a[yField], x: a[xField] })).reverse()

  function generateToolTip(data: any) {
    return (
      <Section className="smallSection">
        <div className="header">
          <div className="wrapper">
            Date: <div className="value">{moment.unix(Number(data.data.date)).format('MMM DD, YYYY').valueOf()}</div>
          </div>
        </div>
      </Section>
    )
  }

  return (
    <>
      {formattedData[0].data !== [] ? (
        <Flex sx={{ height: '370px' }} mt={10}>
          <ResponsiveLine
            data={formattedData}
            areaOpacity={1}
            enableGridX={false}
            enableGridY={false}
            enablePoints={false}
            axisBottom={null}
            axisTop={null}
            axisRight={null}
            axisLeft={null}
            enableArea={true}
            isInteractive={true}
            tooltip={(data) => generateToolTip(data)}
          />
        </Flex>
      ) : (
        <Flex
          sx={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spinner size={250} />
        </Flex>
      )}
    </>
  )
}

export default LineChart
