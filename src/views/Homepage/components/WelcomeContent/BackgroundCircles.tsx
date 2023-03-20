/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex } from '@ape.swap/uikit'

const BackgroundCircles = () => {
  return (
    <>
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
            width: ['600px', '600px', '1200px'],
            height: ['600px', '600px', '1200px'],
            top: ['-75px', '-75px', '-300px'],
            left: ['-100vw', '-100vw', '0'],
            background: 'var(--theme-ui-colors-home-c3)',
            boxShadow: 'none',
          }}
        />
        <Flex
          //2
          sx={{
            position: 'absolute',
            borderRadius: '50%',
            width: ['450px', '450px', '900px'],
            height: ['450px', '450px', '900px'],
            top: ['0', '0', '-150px'],
            background: 'var(--theme-ui-colors-home-c2)',
            left: ['calc(-100vw + 75px)', 'calc(-100vw + 75px)', '150px'],
            boxShadow: 'var(--theme-ui-colors-homeCircles-cShadow)',
          }}
        />
        <Flex
          //1
          sx={{
            position: 'absolute',
            borderRadius: '50%',
            width: ['300px', '300px', '600px'],
            height: ['300px', '300px', '600px'],
            left: ['calc(-100vw + 150px)', 'calc(-100vw + 150px)', '300px'],
            top: ['75px', '75px', '0px'],
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
    </>
  )
}

export default BackgroundCircles
