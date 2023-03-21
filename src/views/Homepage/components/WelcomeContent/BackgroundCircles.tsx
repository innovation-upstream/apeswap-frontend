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
          //outerCircle
          sx={{
            position: 'absolute',
            borderRadius: '50%',
            width: ['600px', '900px', '1200px'],
            height: ['600px', '900px', '1200px'],
            top: ['-75px', '-150px', '-300px'],
            left: ['-100vw', '-50px', '0'],
            background: 'var(--theme-ui-colors-home-c3)',
            boxShadow: 'none',
          }}
        />
        <Flex
          //middleCircle
          sx={{
            position: 'absolute',
            borderRadius: '50%',
            width: ['450px', '675px', '900px'],
            height: ['450px', '675px', '900px'],
            top: ['0', '-75px', '-150px'],
            background: 'var(--theme-ui-colors-home-c2)',
            left: ['calc(-100vw + 75px)', '25px', '150px'],
            boxShadow: 'var(--theme-ui-colors-homeCircles-cShadow)',
          }}
        />
        <Flex
          //innerCircle
          sx={{
            position: 'absolute',
            borderRadius: '50%',
            width: ['300px', '450px', '600px'],
            height: ['300px', '450px', '600px'],
            left: ['calc(-100vw + 150px)', '100px', '300px'],
            top: ['75px', '0px', '0px'],
            background: 'var(--theme-ui-colors-home-c1)',
            boxShadow: 'var(--theme-ui-colors-home-cShadow)',
          }}
        />
      </Flex>
      <Flex
        sx={{
          position: 'absolute',
          bottom: '-201px',
          width: '1200px',
          height: '200px',
          boxShadow: 'var(--theme-ui-colors-home-hideCircles)',
          zIndex: 5,
        }}
      />
      <Flex
        sx={{
          position: 'absolute',
          width: '150px',
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
