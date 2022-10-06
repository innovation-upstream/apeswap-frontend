import { useCallback } from 'react'
import mailchimp from '@mailchimp/mailchimp_marketing'

const MC_KEY = 'b839aea5d159a8b3dd6fa1acd46fd99a-us18'
const MC_SERVER_PREFIX = 'us18'
const MC_LIST_ID = '46a5ff3f2c'

const useMailChimpSubscribe = (subscriber: string) => {
  mailchimp.setConfig({
    apiKey: MC_KEY,
    server: MC_SERVER_PREFIX,
  })

  const mailchimpSubscribe = useCallback(async () => {
    console.log(`Subscriber::: ${subscriber}`)
    if (subscriber !== '') {
      const response = await mailchimp['ping'].get()
      // const response = await mailchimp.lists.addListMember(MC_LIST_ID, {
      //   // eslint-disable-next-line camelcase
      //   email_address: subscriber,
      //   status: 'subscribed',
      // })
      // console.log(`Contact-${JSON.stringify(response)} added as an audience member.`)
      return response
    }
  }, [subscriber])
  return [mailchimpSubscribe]
}

export default useMailChimpSubscribe
