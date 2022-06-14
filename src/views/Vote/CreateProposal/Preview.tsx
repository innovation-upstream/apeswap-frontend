import React from 'react'
import { Text, Box } from 'theme-ui'
import ReactMarkdown from 'react-markdown'

const Preview = ({ title, description }) => {
  return (
    <>
      <Box sx={{ minHeight: '80vh', maxWidth: '580px', wordBreak: 'break-all' }}>
        <Text sx={{ fontSize: '36px', fontWeight: '600px', lineHeight: '50px' }}>
          {title.length > 0 ? title : 'Untitled'}
        </Text>
        <br />
        <Box>
          <ReactMarkdown>{description}</ReactMarkdown>
        </Box>
      </Box>
    </>
  )
}
export default Preview
