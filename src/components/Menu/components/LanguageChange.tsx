import React, { useEffect, useState } from 'react'
import { Modal, useModal, ModalProps, IconButton, Button } from '@ape.swap/uikit'
import { Box, Text } from 'theme-ui'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'

const LanguageChange = ({ onDismiss }) => {
  const { t, setLanguage, currentLanguage } = useTranslation()
  const [laguages, setLanguge] = useState([])

  const handleLanguageChange = (val) => {
    setLanguage(val)
    onDismiss()
    console.log('currentLanguage', currentLanguage, 'val', val)
  }

  useEffect(() => {
    setLanguge(languageList)
  }, [])
  console.log('languageList', languageList)

  return (
    <>
      <Modal title="Language" onDismiss={onDismiss} minWidth="350px">
        <Box sx={{ justifyContent: 'center', textAlign: 'center' }}>
          {laguages?.map((val, index) => {
            return (
              <Button
                key={val?.locale}
                onClick={() => handleLanguageChange(val)}
                csx={{
                  margin: '0 0 10px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  width: '100%',
                  height: '48px',
                }}
                color="text"
                variant="secondary"
              >
                <Text sx={{ fontWeight: 600, color: 'text', fontSize: '16px', letterSpacing: '0.03em' }}>
                  {val?.language}
                </Text>
              </Button>
            )
          })}
        </Box>
      </Modal>
    </>
  )
}

export default function LanguageChangeButton() {
  const [onPresentModal] = useModal(<LanguageChange onDismiss={undefined} />)
  return <IconButton icon="website" variant="transparent" color="text" onClick={onPresentModal} />
}
