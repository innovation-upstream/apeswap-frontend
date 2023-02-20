import { v4 as uuid } from 'uuid'
import HmacSHA256 from 'crypto-js/hmac-sha256'
import EncodeHex from 'crypto-js/enc-hex'

const host = 'https://avengerdao.org'
const url = '/api/v1/address-security'
const endpoint = host + url

const appId = '0349f0caec831010f5ec0704bd11524c4810eeb6f335a7c67e1a21ea3926f4002f'
const appSecret = 'dummy string'

const handler = async (chainId, address_) => {
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

export default handler
