import moment from 'moment'
import { monotonicFactory as ulid } from 'ulid'
import revalidator from 'revalidator'

export default class DomainEvent {
  constructor(aggregateType, eventType, schema, data) {
    this.eventType = eventType
    this.aggregateType = aggregateType

    const validated = revalidator.validate(data, schema)
    if (!validated.valid) {
      const errors = validated.errors.reduce(
        (acc, value) => `${acc}\n\t${value.property} ${value.message}`,
        '',
      )

      throw new Error(`Validation error on event ${this.eventType}: ${errors}`)
    }

    this.assertSchemaValid && this.assertSchemaValid(data)

    this.payload = {
      ...data,
    }
  }

  // return a plain js object with all fields in schema, if format exists,
  // or with all properties that are not a function if format does not exist
  // toJS() { }

  generateId() {
    const timestamp = moment.utc().valueOf()
    return ulid()(timestamp)
  }
}
