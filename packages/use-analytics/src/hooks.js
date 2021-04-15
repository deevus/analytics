import { useContext } from 'react'
import AnalyticsContext from './AnalyticsContext'

/**
  * @callback TrackFunction
  *
  * @param {string} event The event to track
  * @param {Object} traits
  * @param {Object} options
  * @returns {PromiseLike}
  */

/**
  * @callback PageFunction
  *
  * @param {Object} traits
  * @param {Object} options
  * @returns {PromiseLike}
  */

/**
  * @callback IdentifyFunction
  *
  * @param {string} identifier
  * @param {Object} traits
  * @param {Object} options
  * @returns {PromiseLike}
  */

/**
  * @typedef {Object} AnalyticsInstance
  *
  * @property {TrackFunction} track
  * @property {PageFunction} page
  * @property {IdentifyFunction} identify
  */

/**
  * React hook that returns the analytics instance
  *
  * @returns {AnalyticsInstance} The analytics instance
  */
export function useAnalytics() {
  return useContext(AnalyticsContext)
}

/**
  * React hook that returns the analytics.track function
  */
export function useTrack() {
  return useAnalytics().track
}

export function usePage() {
  return useAnalytics().page
}

export function useIdentify() {
  return useAnalytics().identify
}
