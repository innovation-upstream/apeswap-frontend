/** @jsxImportSource theme-ui */
import React from 'react'
import { Button, Flex, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import DefiRedefined from './slides/DefiRedefined'
import { Box } from 'theme-ui'
import { easeOut } from 'polished'

const WelcomeContent: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Flex
      sx={{
        position: 'relative',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Flex sx={{ width: '100%', height: '600px', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
        <Flex
          sx={{
            padding: '100px 0 0 0',
            maxWidth: '1412px',
            zIndex: 2,
            width: '95vw',
          }}
        >
          <DefiRedefined />
          <Flex sx={{ width: '70%', position: 'relative', justifyContent: 'center' }}>
            <Flex
              sx={{
                marginTop: '50px',
                position: 'absolute',
                width: '543px',
                height: '305px',
                background: 'lvl1',
                zIndex: 10,
                padding: '10px',
                borderRadius: '15px',
                // animate div on hover
                // Mouse enter

                transition: 'all 0.5s ease-out',
                transform: 'matrix(1, 0.04, -0.34, 0.94, 0, 0)',
                '&:hover': {
                  transform: 'none',
                  scale: '1.2',
                  boxShadow: '0px 4px 134px rgba(255, 168, 0, 0.25)',
                  cursor: 'pointer',
                },
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url('/images/homepageBill.jpg')`,
                  borderRadius: '6px',
                  width: '100%',
                  height: '100%',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </Flex>
            <Flex
              sx={{
                width: '1200px',
                height: '600px',
                position: 'relative',
                margin: '0 auto',
                opacity: '.9',
              }}
            >
              <Flex
                //3
                sx={{
                  position: 'absolute',
                  borderRadius: '50%',
                  width: '1200px',
                  height: '1200px',
                  top: '-300px',
                  left: 0,
                  background: 'var(--theme-ui-colors-home-c3)',
                  boxShadow: 'none',
                }}
              />
              <Flex
                //2
                sx={{
                  position: 'absolute',
                  borderRadius: '50%',
                  width: '900px',
                  height: '900px',
                  top: '-150px',
                  background: 'var(--theme-ui-colors-home-c2)',
                  left: '150px',
                  boxShadow: 'var(--theme-ui-colors-homeCircles-cShadow)',
                }}
              />
              <Flex
                //1
                sx={{
                  position: 'absolute',
                  borderRadius: '50%',
                  width: '600px',
                  height: '600px',
                  left: '300px',
                  top: '0px',
                  background: 'var(--theme-ui-colors-home-c1)',
                  boxShadow: 'var(--theme-ui-colors-home-cShadow)',
                }}
              />
            </Flex>
            <Flex
              sx={{
                position: 'absolute',
                bottom: '-200px',
                width: '1200px',
                height: '200px',
                boxShadow: 'var(--theme-ui-colors-home-hideCircles)',
                zIndex: 5,
              }}
            />
            <Flex
              sx={{
                position: 'absolute',
                width: '200px',
                height: '1130px',
                right: '-468px',
                top: '-100px',
                boxShadow: 'var(--theme-ui-colors-home-hideCircles)',
                transform: 'rotate(-180deg)',
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default React.memo(WelcomeContent)
