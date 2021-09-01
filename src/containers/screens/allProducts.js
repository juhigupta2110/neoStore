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
      dataInCompDidUpdate: '',
    };

    console.log('inside constructor');
  }
  myFunction = () => {
    this.setState({
      updatedList: this.props.data,
      dataFetched: 'fetched',
    });
  };

  componentDidMount() {
    this.props.getProducts();

    //this.myFunction();

    setTimeout(this.myFunction, 1500);

    console.log('entering comp did mount...');

    console.log('after dispatch, props.data is ...', this.props.data);

    if (this.state.categoryFetched === '') {
      this.props.getAllCategory();
      this.setState({categoryFetched: 'fetched'});
    }

    if (this.state.colorFetched === '') {
      this.props.getAllColor();
      this.setState({colorFetched: 'fetched'});
    }

    // this.setState({updatedList: this.props.data});
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
    return (
      item.category.name == this.state.categorySelected ||
      item.color.name == this.state.colorSelected
    );
  };

  componentDidUpdate() {
    // console.log(
    //   'inside comopnent did update..this.props.data is ...',
    //   this.props.data,
    // );
    // if (this.state.dataInCompDidUpdate === '') {
    //   this.setState({
    //     updatedList: this.props.data,
    //     dataInCompDidUpdate: 'gotit',
    //   });
    // }
    // console.log('comp did update. updatedList ....', this.state.updatedList);
    // console.log('dataincompdidupdate....', this.state.dataInCompDidUpdate);
  }

  render() {
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
                      showFiterModal: false,
                      filterApplied: 'yes',
                    });

                    var DATA_new = this.state.updatedList.filter(
                      this.checkFilters,
                    );

                    this.setState({updatedList: DATA_new});
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
                      updatedList: this.props.data,
                    })
                  }
                />
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.filterSortViewStyle}>
          <TouchableOpacity style={styles.filterViewStyle}>
            <Text style={styles.fiterSortTextStyle}>Filter</Text>
            <Icon
              name="funnel-outline"
              size={28}
              color={Colors.GREY}
              onPress={() =>
                this.setState({
                  showFiterModal: true,
                  categorySelected: '',
                  colorSelected: '',
                  filterApplied: '',

                  updatedList: this.props.data,
                })
              }
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
              <Icon
                name="star-outline"
                color={
                  this.state.sortBy == 'star'
                    ? Colors.tabYellowColor
                    : Colors.GREY
                }
                size={18}
                style={styles.iconStyle}
                onPress={() => this.sortByStar()}
              />
            </View>
          </View>
        </View>

        {this.state.sortedList.length === 0 &&
        this.state.updatedList.length === 0 &&
        this.state.dataFetched !== '' ? (
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgStyle: {
    width: wp('60%'),
    height: hp('25%'),
    marginRight: 10,
  },
});
