import React, { Component } from "react";
import PropTypes from "prop-types";
import { FlatList, View } from "react-native";
import ListItem from "./ListItem";

class SwipeableList extends Component {
  constructor(props) {
    super(props);
    this.success = this.success.bind(this);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.setScrollEnabled = this.setScrollEnabled.bind(this);

    const { data } = this.props;
    this.state = {
      enable: true,
      data
    };
  }

  setScrollEnabled(enable) {
    this.setState({
      enable
    });
  }

  success(key) {
    const { data } = this.state;
    const newData = data.filter(item => item.key !== key);
    this.setState({
      data: newData
    });
  }

  renderSeparator() {
    const { styles } = this.props;
    return (
      <View style={styles.separatorViewStyle}>
        <View style={styles.separatorStyle} />
      </View>
    );
  }

  renderItem(item) {
    return (
      <ListItem
        text={item.key}
        success={this.success}
        setScrollEnabled={enable => this.setScrollEnabled(enable)}
      />
    );
  }

  render() {
    const { data, enable } = this.state;
    const { styles } = this.props;
    return (
      <FlatList
        style={styles}
        data={data}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={({ item }) => this.renderItem(item)}
        scrollEnabled={enable}
      />
    );
  }
}

SwipeableList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired
    })
  ).isRequired,
  styles: PropTypes.shape({
    separatorViewStyle: PropTypes.shape({
      flex: PropTypes.number.isRequired,
      backgroundColor: PropTypes.string.isRequired
    }),
    separatorStyle: PropTypes.shape({
      height: PropTypes.number.isRequired,
      backgroundColor: PropTypes.string.isRequired
    })
  }).isRequired
};

export default SwipeableList;
