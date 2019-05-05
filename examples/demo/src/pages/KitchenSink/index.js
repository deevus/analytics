import React, { Component } from 'react'
import analytics from '../../utils/analytics'
import Log from '../../components/Log'
import Navigation from '../../fragments/Nav'

export default class App extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      history: window.__ANALYTICS_HISTORY__ || []
    }
  }
  componentDidMount() {
    this.listener = analytics.on('*', ({ payload }) => {
      this.setState({
        history: window.__ANALYTICS_HISTORY__.concat(payload)
      })
    })
    this.sync = setInterval(() => {
      this.setState({
        history: window.__ANALYTICS_HISTORY__
      })
    }, 1000)
  }
  componentWillUnmount() {
    // remove listener
    this.listener()
  }
  handleIdentify = () => {
    analytics.identify('xyz-123', {
      traitOne: 'blue',
      traitTwo: 'red',
    })
  }
  handleOptOut = () => {
    analytics.identify('xyz-123', {
      optOut: true
    })
  }
  handleAnonTraits = () => {
    analytics.identify({
      super: true,
      rad: 'dope'
    })
  }
  handleIdExcludeInt = () => {
    analytics.identify('xyz-123', {
      super: true,
      rad: 'dope'
    }, {
      plugins: {
        vanilla: false
      }
    })
  }
  handleLargeIdentify = () => {
    analytics.identify('xyz-123', {
      address: {
        city: null,
        country: null,
        postalCode: null,
        state: null,
        street: null
      },
      age: 20,
      avatar: 'http://url.com/thumbnail.jpg',
      birthday: 122321212,
      createdAt: 1111111,
      description: 'Description of the user',
      email: 'email@email.com',
      firstName: 'david',
      lastName: 'wells',
      name: 'david wells',
      gender: 'male',
      id: 'String Unique ID in your database for a user',
      phone: '727-777-8888',
      title: 'boss ceo',
      username: 'davidwells',
    })
  }
  handleTrack = () => {
    /*
    ga('send', 'event', gaData)
    _cio.track(eventName, payload)
    analytics.track()
    intercom.event(blah)
    */

    analytics.track('buttonClick', {
      other: 'wow'
    })
  }
  handleTrackNoEvent = () => {
    analytics.track({
      other: 'wow'
    })
  }
  handleDisabledTrack = () => {
    analytics.track('buttonClickNoGewg', {
      other: 'wow'
    }, {
      plugins: {
        'google-analytics': false
      }
    })
  }
  handlePage = () => {
    analytics.page()
  }
  handlePageNoSegment = () => {
    analytics.page(null, {
      plugins: {
        segment: false
      }
    })
  }
  handlePageWithCallback = () => {
    analytics.page(() => {
      alert('page called')
    })
  }
  handleDisable = () => {
    analytics.disablePlugin(['google-analytics'], (x) => {
      console.log('disabled!', x)
    })
  }
  handleEnable = () => {
    analytics.enablePlugin(['google-analytics'], (x) => {
      console.log('enableIntegration!', x)
    })
  }
  sendMalformattedEvent = () => {
    // Malformatted event
    analytics.track({
      eventName: 'wowza',
      other: 'shit'
    })
  }

  detachAllListener = () => {
    // call the listner again to detach it
    this.allListener()
  }
  detachTrackListener = () => {
    // call the listner again to detach it
    this.trackListener()
  }
  clearLog = () => {
    // Clear previous history
    clearInterval(this.sync)
    this.listener()

    this.setState({
      history: []
    }, () => {
      // re-attach listener to show history
      this.listener = analytics.on('*', ({ payload }) => {
        this.setState({
          history: this.state.history.concat(payload)
        })
      })
    })
  }
  render() {
    const { history } = this.state
    return (
      <div className="app">
        <Navigation />
        <h2>Kitchen Sink</h2>
        <div>
          <button onClick={this.handleTrack}>
            Track
          </button>
          <button onClick={this.handleDisabledTrack}>
            Track no gewg
          </button>
          <button onClick={this.handleTrackNoEvent}>
            Track no event
          </button>
        </div>
        <div>
          <button onClick={this.handleIdentify}>
            Identify
          </button>
          <button onClick={this.handleAnonTraits}>
            Identify anon traits
          </button>
          <button onClick={this.handleIdExcludeInt}>
            Identify no vanilla
          </button>
          <button onClick={this.handleLargeIdentify}>
            Identify large
          </button>
        </div>
        <div>
          <button onClick={this.handlePage}>
            Page
          </button>
          <button onClick={this.handlePageNoSegment}>
            Page no seg
          </button>
          <button onClick={this.handlePageWithCallback}>
            Page with callback
          </button>
        </div>
        <button onClick={this.handleDisable}>
          Disable google-analytics integration
        </button>
        <button onClick={this.handleEnable}>
          Enable google-analytics integration
        </button>
        <button onClick={this.detachAllListener}>
          Detach * Listener
        </button>
        <button onClick={this.detachTrackListener}>
          Detach track Listener
        </button>
        <button onClick={this.handleOptOut}>
          Opt out
        </button>
        <button onClick={this.clearLog}>
          Clear
        </button>
        <div>
          <a href="/?an_uid=12345">Identify via param</a> |
          <a href="/?an_event=email-click">Track via param</a> |
          <a href="/?an_uid=12345&an_trait_color=blue&an_trait_accountLevel=pro">Identify via param w/ attributes</a>
        </div>
        <Log items={history} />
      </div>
    )
  }
}
