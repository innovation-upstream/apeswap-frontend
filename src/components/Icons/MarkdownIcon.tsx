import * as React from 'react'

const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={23} height={18} {...props}>
    <path
      fill="#231F20"
      d="M351.659 48H-31.659C-49.496 48-64 62.484-64 80.308v255.349C-64 353.493-49.496 368-31.659 368h383.318C369.496 368 384 353.493 384 335.656V80.308C384 62.484 369.496 48 351.659 48zM188.023 304h-56.048v-96l-42.04 53.878L47.913 208v96H-8.131V112h56.044l42.022 67.98 42.04-67.98h56.048v192zm83.657 0l-69.635-96h42v-96h56.043v96h42.027l-70.453 96h.018z"
      transform="translate(96 48)"
    />
  </svg>
)

export default SvgComponent
