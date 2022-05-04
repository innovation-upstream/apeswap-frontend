import { Flex, Text } from 'theme-ui'
import { DropDownIcon } from 'components/ListView/styles'
import React, { useState } from 'react'

interface expandCardProps {
  expandedContent: any
  open: boolean
}

const PoolsListView: React.FC<expandCardProps> = ({ expandedContent, open }) => {
  const [expanded, setExpanded] = useState(open)
  return (
    <>
      <Flex sx={{ justifyContent: 'center', padding: '0 0 15px', alignItems: 'center' }}>
        <Text sx={{ textAlign: 'center', padding: '0 10px 0px 0' }}>Details</Text>
        {expandedContent && <DropDownIcon onClick={() => setExpanded((prev) => !prev)} open={expanded} mr="30px" />}
      </Flex>
      {expandedContent && expanded && <Text variant="sm">{expandedContent}</Text>}
    </>
  )
}
export default PoolsListView
