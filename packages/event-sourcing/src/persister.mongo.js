import _ from 'lodash'
import mongoose from 'mongoose'
import { stamp } from './domain.event.utilities'

const isInTest = typeof global.it === 'function'

if (!isInTest && mongoose.connection.readyState === 0) {

  // TODO: get config from configured store
  const mongoDbUrl = config.get('database.url')

  mongoose.Promise = global.Promise
  mongoose.connect(mongoDbUrl, { useNewUrlParser: true })

  mongoose.connection.on('error', ({ message }) => {

  })

  mongoose.connection.once('open', () => {

  })
}

const Event = mongoose.model('EventStore_Event', new mongoose.Schema({
  id: { type: mongoose.Schema.Types.String },
  eventType: { type: mongoose.Schema.Types.String },
  aggregateId: { type: mongoose.Schema.Types.String },
  publishedAt: { type: Date, default: Date.now },
  payload: { type: mongoose.Schema.Types.Mixed },
}))

const Projection = mongoose.model('EventStore_Projections', new mongoose.Schema({
  key: { type: mongoose.Schema.Types.String },
  runOnce: { type: mongoose.Schema.Types.Boolean, default: false },
  onlyRealtimeEvents: { type: mongoose.Schema.Types.Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  lastProcessedEvent: { type: mongoose.Schema.Types.String, default: '' },
}))

export { Event, Projection }

export default class MongoPersister {
  async persist(event) {
    const published = await new Event(stamp(event)).save()

    return published
  }

  async destroyEvents() {
    return Event.remove({}).exec()
  }

  async destroyProjections() {
    return Projection.remove({}).exec()
  }

  async getAll() {
    return Event.find({}).sort('id').exec()
  }

  async getEventsFor(aggregateId) {
    return Event.find({ 'payload.aggregateId': aggregateId }).sort('id').exec()
  }

  async getPreviousEventsFor(aggregateId, lastEventId) {
    return Event
      .find({
        'payload.aggregateId': aggregateId,
        id: { $lte: lastEventId },
      })
      .sort('id')
      .exec()
  }

  async saveProjection(projection) {
    await Projection.update(
      { key: projection.key },
      projection,
      { upsert: true },
    ).exec()

    return Projection.findOne({ key: projection.key }).exec()
  }

  async getAllProjections() {
    const projections = await Projection.find({}).exec()

    const result = {}
    _.each(projections, (projection) => {
      result[projection.key] = projection
    })

    return result
  }

  async getProjection(key) {
    return Projection.findOne({ key }).exec()
  }

  async deleteProjection(key) {
    await Projection.remove({ key }).exec()
  }

  async lastProcessedEventWas(eventId, key) {
    await Projection.update(
      { key },
      { lastProcessedEvent: eventId },
      { upsert: false },
    ).exec()

    return Projection.findOne({ key }).exec()
  }
}
