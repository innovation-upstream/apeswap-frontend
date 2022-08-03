export interface OverviewTvlInterface {
  farms: number
  jungle: number
  lending: number
  maximizers: number
  pools: number
}

export interface OverviewVolumeInterface {
  description: string
  history: { amount: number; time: number }[]
}

export interface OverviewProtocolMetricsInterface {
  description: 'Banana Holders' | 'Market Cap' | 'Banana Burned' | 'POL'
  amount: number
  history: { amount: number; time: number }[]
}

export interface OverviewBananaDistributionInterface {
  total: number
  distribution: { description: string; amount: number }[]
}

interface TreasuryAssetOverviewInterface {}

interface TreasuryHistoryInterface {}

interface TreasuryBreakdownInterface {}

export interface ProtocolDashboardState {
  overviewTvl: OverviewTvlInterface
  overviewVolume: OverviewVolumeInterface[]
  overviewProtocolMetrics: OverviewProtocolMetricsInterface[]
  overviewBananaDistribution: OverviewBananaDistributionInterface[]
  treasuryAssetOverview: any
  treasuryHistory: any
  treasuryBreakdown: any
}
