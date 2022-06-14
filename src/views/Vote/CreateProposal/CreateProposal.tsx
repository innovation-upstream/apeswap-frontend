import React, { useState } from 'react'
import { Box, Flex, Text } from 'theme-ui'
import { Svg, ArrowBackIcon, Link, Textarea, Button, Spinner, TooltipBubble } from '@ape.swap/uikit'
import { create } from 'ipfs-http-client'
import { MarkdownIcon } from 'components/Icons'
import InputCreateProposal from './InputCreateProposal'
import { styles } from './styles'
import Preview from './Preview'

const CreateProposal = () => {
  const [proposalData, setPropposalData] = useState({
    preview: true,
    loader: false,
    title: '',
    dicussion: '',
    textarea: '',
  })

  console.log('proposalData.textarea', proposalData.textarea)

  const handleChange = (e) => {
    setPropposalData({ ...proposalData, title: e.target.value })
  }
  const handleChangeDiscussion = (e) => {
    setPropposalData({ ...proposalData, dicussion: e.target.value })
  }
  const handleTextArea = (e) => {
    if (e.target.value.length <= 14400) {
      setPropposalData({
        ...proposalData,
        textarea: e.target.value,
      })
    }
  }
  const client = create({ url: 'https://ipfs.infura.io:5001/api/v0' })

  const handleDrop = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    setPropposalData({ ...proposalData, loader: true })
    const imageFile = e.dataTransfer.files[0]
    try {
      const added = await client.add(imageFile)

      if (e.target.value.length <= 14400) {
        console.log('length', imageFile?.name.length, 'textArea', proposalData?.textarea.length)
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        proposalData.textarea = `${proposalData?.textarea} \n![${imageFile?.name}](${url})\n`
        setPropposalData(proposalData)
      }
      setPropposalData({ ...proposalData, loader: false })
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const LoaderAndtext = () => {
    return (
      <>
        <Flex>
          <Spinner size={25} /> <Box>Uploading Image</Box>
        </Flex>
      </>
    )
  }

  return (
    <>
      <Flex sx={styles.main}>
        <Box>
          <ArrowBackIcon name="ArrowBack" color="text" width="25px" height="15px" />
          <a href="/vote">Back</a>
          <Box sx={styles.firstSection}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Svg icon="info" width="15" />
              <Text sx={{ fontSize: '14px', marginLeft: '10px' }}>
                You need to have a minimum of 2.5K GNANA in order to submit a proposal.
              </Text>
            </Box>
            <Link href="https://vote.apeswap.finance/#/about">
              <Text sx={{ fontSize: '14px', marginTop: '5px' }}>Learn More</Text>
            </Link>
          </Box>
          {proposalData.preview ? (
            <>
              <Text sx={{ marginBottom: '10px', display: 'block' }}>Title</Text>

              <InputCreateProposal onChange={handleChange} value={proposalData?.title} />

              <Flex sx={{ justifyContent: 'space-between', marginTop: '15px' }}>
                <Text sx={{ marginBottom: '15px' }}>Description (optional)</Text>
                <Text>{proposalData?.textarea?.length}/14,400</Text>
              </Flex>
              <Box sx={styles.textArea}>
                <Textarea
                  rows={14}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  value={proposalData?.textarea}
                  onChange={handleTextArea}
                />
                <Text sx={styles.textAreaBottom}>
                  {proposalData.loader ? (
                    <LoaderAndtext />
                  ) : (
                    <Flex sx={{ justifyContent: 'space-between' }}>
                      Attach images by dragging & dropping, selecting or pasting them.
                      <Box>
                        <TooltipBubble
                          body={<Text variant="sm">Styling with the markdown is possible </Text>}
                          placement="topRight"
                        >
                          <MarkdownIcon />
                        </TooltipBubble>
                      </Box>
                    </Flex>
                  )}
                </Text>
              </Box>
              <Text sx={{ marginTop: '10px', marginBottom: '10px', display: 'block' }}>Discussion (optional)</Text>
              <Box sx={{ position: 'relative' }}>
                <Box sx={{ position: 'absolute', bottom: '10px', left: '10px' }}>
                  <Svg icon="website" width="15" />
                </Box>
                <InputCreateProposal
                  placeholder="forum.balancer.fi/proposal..."
                  onChange={handleChangeDiscussion}
                  value={proposalData.dicussion}
                />
              </Box>
            </>
          ) : (
            <>
              <Preview title={proposalData?.title} description={proposalData?.textarea} />
            </>
          )}
        </Box>

        <Box sx={styles.action}>
          <Button
            variant="secondary"
            onClick={() => setPropposalData({ ...proposalData, preview: !proposalData?.preview })}
            fullWidth
          >
            {proposalData?.preview ? 'Preview' : 'Edit'}
          </Button>
          &nbsp;
          <Button fullWidth>Continue</Button>
        </Box>
      </Flex>
    </>
  )
}
export default CreateProposal
