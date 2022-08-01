interface TotalTradeVolumeInterface {
  date: number
  bnb: number
  polygon: number
  ethereum: number
}

const stubData: TotalTradeVolumeInterface[] = [
  {
    date: 1,
    bnb: 177835760,
    polygon: 17357600,
    ethereum: 173,
  },
  {
    date: 2,
    bnb: 1778357650,
    polygon: 1735765000,
    ethereum: 1735,
  },
  {
    date: 3,
    bnb: 27783576500,
    polygon: 1735765000,
    ethereum: 5735,
  },
  {
    date: 4,
    bnb: 37783576550,
    polygon: 2735765005,
    ethereum: 17355,
  },
  {
    date: 5,
    bnb: 57783576553,
    polygon: 37357655003,
    ethereum: 173553,
  },
]

export default stubData
