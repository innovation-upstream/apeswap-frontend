import { v4 as uuid } from 'uuid'
import HmacSHA256 from 'crypto-js/hmac-sha256'
import EncodeHex from 'crypto-js/enc-hex'

export const TOKEN_RISK = {
  VERY_LOW: 0,
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  VERY_HIGH: 4,
} as const

export const TOKEN_RISK_MAPPING = {
  '5/5': TOKEN_RISK.VERY_LOW,
  '4/5': TOKEN_RISK.LOW,
  '3/5': TOKEN_RISK.MEDIUM,
  '2/5': TOKEN_RISK.HIGH,
  '1/5': TOKEN_RISK.VERY_HIGH,
} as const

const host = 'https://avengerdao.org'
const url = '/api/v1/address-security'
const endpoint = host + url

const appId = '0349f0caec831010f5ec0704bd11524c4810eeb6f335a7c67e1a21ea3926f4002f'
const appSecret = '00b565ec4e9f408d68c1a8ebdb9c49fc92a6259d3e8a476279975767a528d95e3c'

export const fetchRiskData = async (chainId, address_) => {
  const address = address_.toLowerCase()
  const timeStamp = new Date().valueOf().toString()
  const nonce = uuid().replaceAll('-', '')
  const body = JSON.stringify({
    chainId,
    address,
  })
  const method = 'POST'

  const hasSecret = !!appSecret

  let headers: HeadersInit = {
    'Content-Type': 'application/json;charset=UTF-8',
  }

  if (hasSecret) {
    const data = [appId, timeStamp, nonce, method, url, body].join(';')
    const sig = EncodeHex.stringify(HmacSHA256(data, appSecret))
    headers = {
      ...headers,
      'X-Signature-appid': appId,
      'X-Signature-timestamp': timeStamp,
      'X-Signature-nonce': nonce,
      'X-Signature-signature': sig,
    }
  }

  const response = await fetch(endpoint, {
    headers,
    body,
    method,
  })
  const json = await response.json()

  return json
}

export const parsedRiskData = async (chainId, address) => {
  const { data } = await fetchRiskData(chainId, address)
  const { band } = data

  return {
    address,
    chainId,
    risk: TOKEN_RISK_MAPPING[band],
  }
}
