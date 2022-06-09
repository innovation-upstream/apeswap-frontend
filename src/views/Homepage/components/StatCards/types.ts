import React from 'react'

export interface StatType {
  logo: React.FC<{ fill?: string; color?: string }>
  title: string
  value: number | null
  id: string
}
