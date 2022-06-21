import React from 'react'
import { Text, Box } from 'theme-ui'
import ReactMarkdown from 'react-markdown'

const Preview = ({ title, description }) => {
  const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g
  const links = Array.from(new Set(description.match(urlRegex)))
  let dataMain = description

  links?.map((val, index) => {
    if (!`'${val}'`.includes('ipfs.infura.io')) {
      const data = dataMain?.replaceAll(val, `[${val}](${val})`)
      dataMain = data
    }
    return dataMain
  })

  return (
    <>
      <Box sx={{ minHeight: '80vh', maxWidth: '580px', wordBreak: 'break-all' }}>
        <Text sx={{ fontSize: '36px', fontWeight: '600px', lineHeight: '50px' }}>
          {title.length > 0 ? title : 'Untitled'}
        </Text>
        <br />
        <Box>
          <ReactMarkdown>{dataMain}</ReactMarkdown>
        </Box>
      </Box>
    </>
  )
}
export default Preview
