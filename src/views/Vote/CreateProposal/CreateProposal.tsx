/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { Box, Flex, Text } from 'theme-ui'
import { Svg, ArrowBackIcon, Link, Textarea, Button, Spinner, TooltipBubble, Input } from '@ape.swap/uikit'
import { create } from 'ipfs-http-client'
import { MarkdownIcon } from 'components/Icons'
import { styles } from './styles'
import Preview from './Preview'

export interface InputProps {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  value: string
}

const CreateProposal = () => {
  const [proposalData, setPropposalData] = useState({
    title: '',
    dicussion: '',
    textarea: '',
  })
  const [preview, setPreview] = useState<boolean>(true)
  const [loader, setLoader] = useState<boolean>(false)

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

  const handleDrop = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    setLoader(true)
    const imageFile = e.dataTransfer.files[0]
    const client = create({ url: 'https://ipfs.infura.io:5001/api/v0' })
    try {
      const added = await client.add(imageFile)
      if (e.target.value.length + imageFile?.name.length + 5 <= 14400) {
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        setPropposalData((prevValue) => ({
          ...prevValue,
          textarea: `${prevValue.textarea} \n![${imageFile?.name}](${url})\n`,
        }))
      }
    } catch (error) {
      console.log('Error uploading file: ', error)
    } finally {
      setLoader(false)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
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
        {preview ? (
          <>
            <Text sx={{ marginBottom: '10px', display: 'block' }}>Title</Text>
            <Box sx={styles.inputMain}>
              <Input sx={styles.input} value={proposalData?.title} onChange={handleChange} width="100%" />
            </Box>

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
                {loader ? (
                  <Flex>
                    <Spinner size={25} /> <Box>Uploading Image</Box>
                  </Flex>
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
              <Box sx={styles.inputMain}>
                <Input
                  sx={styles.input}
                  placeholder="forum.balancer.fi/proposal..."
                  value={proposalData.dicussion}
                  onChange={handleChangeDiscussion}
                  width="100%"
                />
              </Box>
            </Box>
          </>
        ) : (
          <Preview title={proposalData?.title} description={proposalData?.textarea} />
        )}
      </Box>

      <Box sx={styles.action}>
        <Button variant="secondary" onClick={() => setPreview(!preview)} fullWidth>
          {preview ? 'Preview' : 'Edit'}
        </Button>
        &nbsp;
        <Button fullWidth>Continue</Button>
      </Box>
    </Flex>
  )
}
export default CreateProposal
