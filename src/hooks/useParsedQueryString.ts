import { ParsedQs } from 'qs'
import { useRouter } from 'next/router'

export default function useParsedQueryString(): ParsedQs {
  const { query } = useRouter()
  return query
}
