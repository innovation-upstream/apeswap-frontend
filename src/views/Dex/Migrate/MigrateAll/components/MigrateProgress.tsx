/** @jsxImportSource theme-ui */
import { Flex, Svg, Text, TooltipBubble } from '@ape.swap/uikit'
import React, { ReactNode } from 'react'

interface MigrateProcessBarInterface {
  activeIndex: number
  steps: { title: string; description: string; complete: boolean; active: boolean }[]
  children: ReactNode
}

const MigrateProgress: React.FC<MigrateProcessBarInterface> = ({ steps, activeIndex, children }) => {
  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Flex sx={{ alignItems: 'center' }}>
        {steps?.map(({ title, description, complete, active }, i) => {
          return (
            <>
              <Flex
                key={title}
                sx={{
                  background: active || complete ? 'gradient' : 'white2',
                  height: '100px',
                  width: `${100 - steps.length}%`,
                  alignItems: 'center',
                  padding: '10px',
                  borderRadius: '10px',
                }}
              >
                <Flex
                  sx={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '30px',
                    background: 'white3',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: '15px',
                  }}
                >
                  {complete ? (
                    <Svg icon="success" width="100%" />
                  ) : (
                    <Text
                      size="35px"
                      color={active ? 'smartGradient' : 'text'}
                      weight={700}
                      sx={{
                        lineHeight: '2.5px',
                        width: '100%',
                        height: '0px',
                        textAlign: 'center',
                        opacity: '.6',
                      }}
                    >
                      {i + 1}
                    </Text>
                  )}
                </Flex>
                <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text size="20px" weight={700} mr="5px" color={active || complete ? 'primaryBright' : 'text'}>
                    {title}
                  </Text>
                  <Flex sx={{ mt: '2.5px' }}>
                    <TooltipBubble
                      placement="bottomRight"
                      body={description}
                      transformTip="translate(10%, 0%)"
                      width="200px"
                    >
                      <Svg icon="info" width="16.5px" color={active || complete ? 'primaryBright' : 'text'} />
                    </TooltipBubble>
                  </Flex>
                </Flex>
              </Flex>
              {i !== steps.length - 1 && (
                <Flex
                  sx={{ background: complete ? 'gradient' : 'white2', width: `${10 - steps.length}%`, height: '10px' }}
                />
              )}
            </>
          )
        })}
      </Flex>
      <Flex sx={{ width: '100%', position: 'relative', flexDirection: 'column' }}>
        <Flex
          sx={{
            background: 'gradient',
            height: '75px',
            width: '10px',
            left: `${(activeIndex / steps.length) * 100 + 11}%`,
            position: 'absolute',
            zindex: -1,
          }}
        />
        <Flex
          sx={{
            width: '100%',
            height: 'fit-content',
            padding: '10px',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            background: 'gradient',
            borderRadius: '10px',
            mt: '70px',
          }}
        >
          <Flex sx={{ height: '100%', width: '100%', background: 'white2', borderRadius: '10px', padding: '50px' }}>
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default React.memo(MigrateProgress)
