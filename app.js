import React from 'react'
import { FlatList, TouchableHighlight, View, Text, StyleSheet, ScrollView } from 'react-native'

import { connect } from 'react-redux'
import { fetchDataFromAPI } from './actions'

let styles

class App extends React.Component {
  componentDidMount() {
    this.props.getData()
  }
  renderItem = ({ item, index }) => {
    return <View>
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
    console.log('data:', data);
    return (
      <ScrollView style={container}>
        <Text style={text}>Twitter and Facebook statistics from various NYC agencies and organization</Text>
        {
          isFetching && <Text>Loading</Text>
        }
        {
          data.length ? (
            <FlatList
              data={data}
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
    data: state.data
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
