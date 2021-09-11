import * as React from 'react';

import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Picker,
  Modal,
  Button,
  Pressable,
  TextInput,
  TouchableHighlightBase,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {types} from '../../redux/auth/actions/actionTypes';
import * as authActions from '../../redux/auth/actions/authActions';
import RenderProduct from '../../components/renderProduct';
import {Colors} from '../../assets/styles/colors';

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item}</Text>
  </TouchableOpacity>
);

class AllProducts extends React.Component {
  constructor(props) {
    super(props);

    console.log('props in all products...', this.props);

    this.state = {
      dataFetched: '',
      categoryFetched: '',
      colorFetched: '',
      sortBy: '',
      unSortedData: [],
      dataFromStore: [],
      selectedValue: 'select',
      showFiterModal: false,
      categorySelected: '',
      colorSelected: '',
      filterApplied: '',
      filteredData: [],
      updatedList: [],
      sortedList: [],
      reRender: '',
      sortBy: 'sort',
      dataInCompDidUpdate: '',
      logoutModal: false,
      logout: false,
      searchItem: '',
      searchClicked: false,
      clearSearchClicked: false,
      mounted: false,
    };

    this.props.getProducts();
  }
}
