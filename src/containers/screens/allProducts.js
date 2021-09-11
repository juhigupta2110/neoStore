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
      // sortBy: '',
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
      // clearSearchClicked: false,
      mounted: false,
      inGDSFP: false,
    };

    this.props.getProducts();
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.fiteredCat === '' &&
      state.filterApplied === '' &&
      state.searchClicked === false
    ) {
      return {
        updatedList: props.data,
        inGDSFP: true,
      };
    } else if (
      props.fiteredCat !== '' &&
      state.filterApplied === '' &&
      state.searchClicked === false
    ) {
      console.log('inside else in inGD..');
      return {
        updatedList: props.getFilteredData,
        inGDSFP: true,
      };
    }
  }

  myFunction = () => {
    this.setState({
      updatedList:
        this.props.fiteredCat === ''
          ? this.props.data
          : this.props.getFilteredData,
      dataFetched: 'fetched',
      sortBy: 'sort by',
    });
    // this.forceUpdate();
  };

  componentDidMount() {
    if (this.state.categoryFetched === '') {
      this.props.getAllCategory();
      this.setState({categoryFetched: 'fetched'});
    }

    if (this.state.colorFetched === '') {
      this.props.getAllColor();
      this.setState({colorFetched: 'fetched'});
    }
  }

  sortByPriceUp = () => {
    if (this.state.sortBy !== 'price_up') {
      this.setState({sortBy: 'price_up'});
      const data_1 = [...this.state.updatedList];
      data_1.sort(function (a, b) {
        return a.price - b.price;
      });
      this.setState({sortedList: data_1});
    } else {
      this.setState({sortBy: '', sortedList: []});
    }
  };

  sortByPriceDown = () => {
    if (this.state.sortBy !== 'price_down') {
      this.setState({sortBy: 'price_down'});
      const data_1 = [...this.state.updatedList];
      data_1.sort(function (a, b) {
        return b.price - a.price;
      });
      this.setState({sortedList: data_1});
    } else {
      this.setState({sortBy: '', sortedList: []});
    }
  };

  sortByStar = () => {
    if (this.state.sortBy !== 'star') {
      this.setState({sortBy: 'star'});
      const data_1 = [...this.state.updatedList];
      data_1.sort(function (a, b) {
        return b.avgRating - a.avgRating;
      });
      this.setState({sortedList: data_1});
    } else {
      this.setState({sortBy: '', sortedList: []});
    }
  };

  sortByStarDown = () => {
    if (this.state.sortBy !== 'starDown') {
      this.setState({sortBy: 'starDown'});
      const data_1 = [...this.state.updatedList];
      data_1.sort(function (a, b) {
        return a.avgRating - b.avgRating;
      });
      this.setState({sortedList: data_1});
    } else {
      this.setState({sortBy: '', sortedList: []});
    }
  };

  filterByCategoryColor = () => {};

  getCategoryName = (item) => {
    var name = item.name;
    return name;
  };

  getColorName = (item) => {
    var name = item.name;
    return name;
  };

  renderItem = ({item}) => {
    const backgroundColor =
      item === this.state.categorySelected
        ? Colors.tabYellowColor
        : Colors.LIGHTGREY;
    const color =
      item === this.state.categorySelected ? Colors.WHITE : Colors.BLACK;

    return (
      <Item
        item={item}
        onPress={() => this.setState({categorySelected: item})}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  renderItemColor = ({item}) => {
    const backgroundColor =
      item === this.state.colorSelected
        ? Colors.tabYellowColor
        : Colors.LIGHTGREY;
    const color =
      item === this.state.colorSelected ? Colors.WHITE : Colors.BLACK;

    return (
      <Item
        item={item}
        onPress={() => this.setState({colorSelected: item})}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  checkFilters = (item) => {
    if (
      this.state.categorySelected.length > 0 &&
      this.state.colorSelected.length > 0
    ) {
      return (
        item.category.name == this.state.categorySelected &&
        item.color.name == this.state.colorSelected
      );
    } else if (
      this.state.categorySelected.length === 0 &&
      this.state.colorSelected.length > 0
    ) {
      return item.color.name == this.state.colorSelected;
    } else if (
      this.state.categorySelected.length > 0 &&
      this.state.colorSelected.length === 0
    ) {
      return item.category.name == this.state.categorySelected;
    } else return item;
  };

  searchFilters = (item) => {
    console.log('item searched...', item);
    console.log('search word..', this.state.searchItem);
    return item.name.includes(this.state.searchItem);
  };

  clearSearch = () => {
    this.setState({
      updatedList: this.props.data,
    });
  };

  setModalVisible = (logout) => {
    this.setState({logoutModal: false, logout: logout});
    if (logout) {
      this.props.logout();
    }
  };

  selectedCategoryFromDashboard = () => {};

  render() {
    console.log('ingdf...', this.state.inGDSFP);
    setTimeout(
      () => console.log('updatedList is...', this.state.updatedList),
      1000,
    );
    var CATEGORY = [...this.props.categories];
    var COLORS = [...this.props.allColors];

    var categoryNames = CATEGORY.map(this.getCategoryName);
    var uniqueCategoryNames = [...new Set(categoryNames)];

    var colorNames = COLORS.map(this.getColorName);
    var uniqueColorNames = [...new Set(colorNames)];

    return (
      <View>
        <Modal transparent={true} visible={this.state.showFiterModal}>
          <View style={{backgroundColor: '#000000aa', flex: 1}}>
            <View style={styles.headingViewStyle}>
              <Text style={styles.headingTextStyle}>Select Category</Text>
              <FlatList
                data={uniqueCategoryNames}
                keyExtractor={(item) => item}
                renderItem={this.renderItem}
                extraData={this.state.categorySelected}
              />

              <Text style={[styles.headingTextStyle, {marginTop: hp('2%')}]}>
                Select Color
              </Text>
              <FlatList
                data={uniqueColorNames}
                keyExtractor={(item) => item}
                renderItem={this.renderItemColor}
                extraData={this.state.colorSelected}
              />

              <View style={styles.filterButtonViewStyle}>
                <Button
                  title="Apply filter"
                  onPress={() => {
                    this.setState({
                      filterApplied: 'yes',
                    });
                    console.log(
                      'category selected..',
                      this.state.categorySelected,
                    );
                    console.log('color selected..', this.state.colorSelected);

                    var DATA_new = this.state.updatedList.filter(
                      this.checkFilters,
                    );
                    console.log('DATA_new...', DATA_new);
                    this.setState({updatedList: DATA_new});

                    setTimeout(() => {
                      console.log(
                        'updated list after funnel filter..',
                        this.state.updatedList,
                      );
                      this.setState({
                        showFiterModal: false,
                        filterApplied: 'yes',
                      });
                    }, 500);
                  }}
                />
                <Button
                  title="Clear filter"
                  onPress={() =>
                    this.setState({
                      categorySelected: '',
                      colorSelected: '',
                      filterApplied: '',
                      showFiterModal: false,
                      // updatedList: this.props.data,
                    })
                  }
                />
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.searchViewStyle}>
          <TextInput
            style={styles.searchStyle}
            placeholder="Search NeoStore"
            maxLength={30}
            onChangeText={(text) => this.setState({searchItem: text})}
            value={this.state.searchItem}
          />

          <Icon
            name="search-outline"
            size={30}
            onPress={() => {
              this.setState({searchClicked: true});
              var DATA_search = this.props.data.filter(this.searchFilters);

              this.setState({updatedList: DATA_search});
            }}
          />
        </View>
        {this.state.searchClicked === true ? (
          <TouchableOpacity
            onPress={() => {
              this.setState({searchClicked: false, searchItem: ''});
              this.clearSearch();
            }}>
            <Text style={styles.ClearSearchTextStyle}>Clear Search</Text>
          </TouchableOpacity>
        ) : null}

        <View style={styles.filterSortViewStyle}>
          <TouchableOpacity style={styles.filterViewStyle}>
            <Text style={styles.fiterSortTextStyle}>Filter</Text>
            <Icon
              name="funnel-outline"
              size={28}
              color={Colors.GREY}
              onPress={() => {
                this.setState({
                  showFiterModal: true,
                  // categorySelected: '',
                  // colorSelected: '',
                  filterApplied: '',

                  // updatedList: this.props.data,
                });

                // this.props.FilteredData([]);
              }}
            />
          </TouchableOpacity>

          <View style={styles.sortViewStyle}>
            <Text style={styles.fiterSortTextStyle}>Sort by</Text>
            <View style={styles.sortIconsView}>
              <IconFA name="rupee" size={10} color={Colors.GREEN} />
              <Icon
                name="arrow-up"
                size={26}
                color={
                  this.state.sortBy == 'price_up' ? Colors.GREEN : Colors.GREY
                }
                onPress={() => {
                  this.sortByPriceUp();
                }}
              />
              <IconFA
                name="rupee"
                size={10}
                style={styles.iconStyle}
                color={Colors.GREEN}
              />
              <Icon
                name="arrow-down"
                color={
                  this.state.sortBy == 'price_down' ? Colors.GREEN : Colors.GREY
                }
                size={26}
                onPress={() => this.sortByPriceDown()}
              />

              <Icon name="arrow-up" size={10} style={styles.iconStyle} />
              <Icon
                name="star-outline"
                color={
                  this.state.sortBy == 'star'
                    ? Colors.tabYellowColor
                    : Colors.GREY
                }
                size={18}
                onPress={() => this.sortByStar()}
              />
              <Icon name="arrow-down" size={10} style={styles.iconStyle} />
              <Icon
                name="star-outline"
                color={
                  this.state.sortBy == 'starDown'
                    ? Colors.tabYellowColor
                    : Colors.GREY
                }
                size={18}
                onPress={() => this.sortByStarDown()}
              />
            </View>
          </View>
        </View>

        {this.state.sortedList.length === 0 &&
        this.state.updatedList.length === 0 ? (
          //&& this.state.dataFetched !== ''
          <Image
            source={require('../../assets/images/no_data_available.png')}
            style={styles.imgStyle}
          />
        ) : null}
        <FlatList
          data={
            this.state.sortedList.length > 0
              ? this.state.sortedList
              : this.state.updatedList
          }
          renderItem={({item}) => (
            <RenderProduct
              productName={item.name}
              imageUrl={item.mainImageUrl}
              category={item.category.name}
              description={item.description}
              price={item.price}
              stars={item.avgRating}
              features={item.features}
              subImages={item.subImagesUrl}
              id={item.id}
              sortBy={this.state.sortBy}
              {...this.props}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.allProductsReducer,
  categories: state.allCategoryReducer,
  allColors: state.allColorReducer,
  fiteredCat: state.filteredCategory,
  getFilteredData: state.filteredData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => {
      dispatch(authActions.allProductsAsyc());
    },
    clearState: () => {
      dispatch(authActions.clearState());
    },
    getAllCategory: () => {
      dispatch(authActions.getCategory());
    },
    getAllColor: () => {
      dispatch(authActions.getColor());
    },
    logout: () => {
      dispatch(authActions.logout());
    },
    FilteredData: (data) => {
      dispatch(authActions.getFilteredData(data));
    },
    filterCategorySelected: (category) => {
      dispatch(authActions.filterCategory(category));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);

const styles = StyleSheet.create({
  filterViewStyle: {
    alignItems: 'center',
    marginHorizontal: wp('2.5%'),
  },
  filterSortViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('90%'),
  },
  sortIconsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('0.3%'),
  },
  sortViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    marginLeft: wp('3%'),
  },
  fiterSortTextStyle: {
    color: Colors.GREY,
    fontSize: 14,
  },
  ClearSearchTextStyle: {
    color: Colors.BLUE,
    fontSize: 14,
    marginLeft: wp('3%'),
  },
  item: {
    backgroundColor: Colors.LIGHTGREY,
    paddingVertical: hp('0.7%'),
    marginVertical: hp('0.5%'),
    paddingLeft: wp('2%'),
    width: wp('100%'),
  },
  title: {
    fontSize: 18,
  },
  headingViewStyle: {
    backgroundColor: Colors.WHITE,
    height: hp('70%'),
    marginHorizontal: wp('10%'),

    paddingHorizontal: wp('10%'),
    paddingVertical: hp('5%'),

    alignItems: 'center',
    marginVertical: hp('20%'),
  },
  headingTextStyle: {
    fontSize: 20,
    color: Colors.GREEN,
    marginBottom: hp('1%'),
  },
  filterButtonViewStyle: {
    width: wp('60%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgStyle: {
    width: wp('60%'),
    height: hp('30%'),
    marginRight: 10,
    alignSelf: 'center',
    marginTop: hp('20%'),
  },
  searchViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.DisabledButton,
    width: wp('93%'),
    height: hp('5.5%'),
    borderRadius: 2,
    marginLeft: wp('3%'),
    marginVertical: hp('1%'),
  },
  searchStyle: {
    width: wp('80%'),
    height: hp('6.5%'),
    paddingHorizontal: wp('2%'),
    paddingTop: hp('2%'),
    fontSize: 18,
    //marginTop: hp('1%'),
  },
});
