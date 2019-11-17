import moment from 'moment'
import { monotonicFactory as ulid, decodeTime } from 'ulid'

export function stamp(event) {
  const now = moment.utc()
  const timestamp = now.valueOf()
  const publishedAt = now.toDate()

  return {
    id: ulid()(timestamp),
    publishedAt,
    ...event,
  }
}

export function eventTimestamp(event) {
  return decodeTime(event.id)
}
