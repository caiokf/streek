import _ from 'lodash'

export default class EventStore {
  constructor(persister) {
    this.persister = persister
    this.projections = {}
  }

  async boot() {
    this.projections = await this.persister.getAllProjections()
  }

  publish(event) {
    return this.persister
      .persist(event)
      .then(e => this.runProjections(e))
  }

  async getEventsFor(aggregateId) {
    return this.persister.getEventsFor(aggregateId)
  }

  async getPreviousEventsFor(aggregateId, lastEventId) {
    return this.persister.getEventsFor(aggregateId, lastEventId)
  }

  async attachProjection(key, reducer, metadata) {
    const persistedProjection = await this.persister.saveProjection({ key, ...metadata })
    persistedProjection.reducer = reducer
    this.projections[key] = persistedProjection

    if (persistedProjection.runOnce && persistedProjection.lastProcessedEvent > 0) {
      return
    }

    if (persistedProjection.onlyRealtimeEvents) {
      return
    }

    const pastEvents = await this.persister.getAll()
    const newEvents = _.filter(pastEvents,
      x => x.id > (persistedProjection.lastProcessedEvent || ''))

    for (let i = 0; i < newEvents.length; i++) {
      // We should run the await inside the loop to make sure events are processed in order
      // eslint-disable-next-line no-await-in-loop
      await this.runEventOnProjection(newEvents[i], persistedProjection)
    }
  }

  async runEventOnProjection(event, projection) {
    if (projection.reducer) {
      await projection.reducer(event)
    }
    await this.persister.lastProcessedEventWas(event.id, projection.key)
  }

  async runProjections(event) {
    await Promise.all(_.keys(this.projections).map(async (key) => {
      const projection = this.projections[key]
      if (projection.runOnce) {
        return
      }
      await this.runEventOnProjection(event, projection)
    }))
  }
}
