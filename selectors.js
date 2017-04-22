import { createSelector } from 'reselect'

const appDataSelector = state => state.data

const dataSelector = state => state.data.data

const facebookSelector = createSelector(
  dataSelector,
  data => data.filter(d => d[9] === 'Facebook')
)

const facebookDHSSelector = createSelector(
  facebookSelector,
  data => data.filter(d => d[8] === 'DHS')
)

const greaterThan1kSelector = createSelector(
  dataSelector,
  data => data.filter(d => d[12] >= 1000)
)

const DHSSelector = createSelector(
  dataSelector,
  data => data.filter(d => d[8] === 'DHS')
)

const twitterDHSElector = createSelector(
  DHSSelector,
  data => data.filter(d => d[9] === 'Twitter')
)

export {
  appDataSelector,
  dataSelector,
  facebookSelector,
  facebookDHSSelector,
  greaterThan1kSelector,
  DHSSelector,
  twitterDHSElector
}

