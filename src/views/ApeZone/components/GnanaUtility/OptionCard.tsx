import React from 'react'

import { Option1, HeadCard, HeadBody, HeadTitle, HeadDesc } from './styles'

export const OptionCard: React.FC<{ type: string; title: string; desc: string; children: React.ReactNode }> = ({
  type,
  title,
  desc,
  children,
}) => (
  <Option1 style={{ width: type === '1' ? '100%' : '49%' }}>
    <HeadCard>
      <HeadBody>
        <HeadTitle>{title}</HeadTitle>
        <HeadDesc>{desc}</HeadDesc>
      </HeadBody>
    </HeadCard>
    {children}
  </Option1>
)

export default OptionCard
