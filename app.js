import React from 'react'
import { FlatList, TouchableHighlight, View, Text, StyleSheet, ScrollView } from 'react-native'

import { connect } from 'react-redux'
import { fetchDataFromAPI } from './actions'

import {
  appDataSelector,
  dataSelector,
  facebookSelector,
  facebookDHSSelector,
  greaterThan1kSelector,
  twitterDHSElector
}  from './selectors'

let styles

class App extends React.Component {
  componentDidMount() {
    this.props.getData()
  }
  renderItem = ({ item, index }) => {
    return <View style={{ paddingBottom: 20, paddingTop: 20, borderBottomWidth: 1, borderBottomColor: '#ededed' }}>
      <Text>Agency: {item[8]}</Text>
      <Text>Platform: {item[9]}</Text>
      <Text>Url: {item[10]}</Text>
      <Text>Interactions (Likes/Followers/Visits/Downloads): {item[12]}</Text>
    </View>
  }
  render() {
    const {
      container,
      text,
      button,
      buttonText
    } = styles
    const { data, isFetching } = this.props.data;
    const { results } = this.props
    return (
      <ScrollView style={container}>
        <Text style={text}>Twitter and Facebook statistics from various NYC agencies and organization</Text>
        {
          isFetching && <Text>Loading</Text>
        }
        {
          results.length ? (
            <FlatList
              data={results}
              renderItem={this.renderItem}
              keyExtractor={(item) => item[0]}
            />
          ) : null
        }
      </ScrollView>
    )
  }
}

styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingLeft: 20,
    paddingRight: 20
  },
  text: {
    textAlign: 'center'
  },
  button: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b7eff'
  },
  buttonText: {
    color: 'white'
  }
})

function mapStateToProps (state) {
  return {
    data: appDataSelector(state),
    results: twitterDHSElector(state)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getData: () => dispatch(fetchDataFromAPI())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
