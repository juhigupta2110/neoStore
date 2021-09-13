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
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';

import {types} from '../../redux/auth/actions/actionTypes';
import * as authActions from '../../redux/auth/actions/authActions';
import RenderProduct from '../../components/renderProduct';
import {Colors} from '../../assets/styles/colors';
import Carousel from '../../components/carousel';

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item}</Text>
  </TouchableOpacity>
);

class Dashboard extends React.Component {
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
      dataInCompDidUpdate: '',
      logoutModal: false,
      logout: false,
      searchItem: '',
      searchClicked: false,
      clearSearchClicked: false,

      images: [
        {
          name: 'Table',
          img: 'https://images-na.ssl-images-amazon.com/images/I/61g%2BdwXSY9L._SL1200_.jpg',
        },
        {
          name: 'Table',
          img: 'https://images-na.ssl-images-amazon.com/images/I/71%2BiutneshL._AC_SL1080_.jpg',
        },
        {
          name: 'Sofa',
          img: 'https://images-na.ssl-images-amazon.com/images/I/71JTaeDO3tL._AC_SL1080_.jpg',
        },
        {
          name: 'Table',
          img: 'https://images-na.ssl-images-amazon.com/images/I/71MVSypdArL._SL1500_.jpg',
        },
      ],
    };
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
  }

  sortByStar = () => {
    if (this.state.sortBy !== 'star') {
      this.setState({sortBy: 'star'});
      const data_1 = this.props.data;
      data_1.sort(function (a, b) {
        return b.avgRating - a.avgRating;
      });
      this.setState({sortedList: data_1});
    } else {
      this.setState({sortBy: '', sortedList: []});
    }
  };

  searchFilters = (item) => {
    return item.name.includes(this.props.fiteredCat);
  };

  clearSearch = () => {
    this.setState({
      updatedList: this.props.data,
    });
  };

  render() {
    if (this.state.sortBy !== 'star') {
      this.sortByStar();
    }
    return (
      <SafeAreaView>
        {/* <View style={styles.searchViewStyle}>
          <TextInput
            style={styles.searchStyle}
            placeholder="Search NeoStore"
            maxLength={30}
            onChangeText={(text) => this.setState({searchItem: text})}
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
              this.setState({clearSearchClicked: true});
              this.clearSearch();
            }}>
            <Text style={styles.ClearSearchTextStyle}>Clear Search</Text>
          </TouchableOpacity>
        ) : null} */}

        <View style={{width: wp('100%'), height: hp('40%')}}>
          <Swiper autoplay loop height={250}>
            <TouchableOpacity
              onPress={() => {
                this.props.filterCategorySelected(this.state.images[0].name);
                this.props.getProducts();

                setTimeout(() => {
                  var DATA_filtered = this.props.data.filter(
                    this.searchFilters,
                  );
                  this.props.FilteredData(DATA_filtered);
                  setTimeout(() => {
                    console.log('fitered category...', this.props.fiteredCat);
                    console.log('filtered Data....', this.props.filteredData);
                    this.props.navigation.navigate('AllProducts');
                  }, 1000);
                }, 1500);

                //setTimeout(this.myFunction, 1500);
              }}>
              <Image
                style={styles.swipeImg}
                source={{
                  uri: this.state.images[0].img,
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.filterCategorySelected(this.state.images[1].name);
                this.props.getProducts();

                setTimeout(() => {
                  var DATA_filtered = this.props.data.filter(
                    this.searchFilters,
                  );
                  this.props.FilteredData(DATA_filtered);
                  setTimeout(() => {
                    console.log('fitered category...', this.props.fiteredCat);
                    console.log('filtered Data....', this.props.filteredData);
                    this.props.navigation.navigate('AllProducts');
                  }, 1000);
                }, 1500);

                //setTimeout(this.myFunction, 1500);
              }}>
              <Image
                style={styles.swipeImg}
                source={{uri: this.state.images[1].img}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.filterCategorySelected(this.state.images[2].name);
                this.props.getProducts();

                setTimeout(() => {
                  var DATA_filtered = this.props.data.filter(
                    this.searchFilters,
                  );
                  this.props.FilteredData(DATA_filtered);
                  setTimeout(() => {
                    console.log('fitered category...', this.props.fiteredCat);
                    console.log('filtered Data....', this.props.filteredData);
                    this.props.navigation.navigate('AllProducts');
                  }, 1000);
                }, 1500);

                //setTimeout(this.myFunction, 1500);
              }}>
              <Image
                style={styles.swipeImg}
                source={{uri: this.state.images[2].img}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.filterCategorySelected(this.state.images[3].name);
                this.props.getProducts();

                setTimeout(() => {
                  var DATA_filtered = this.props.data.filter(
                    this.searchFilters,
                  );
                  this.props.FilteredData(DATA_filtered);
                  setTimeout(() => {
                    console.log('fitered category...', this.props.fiteredCat);
                    console.log('filtered Data....', this.props.filteredData);
                    this.props.navigation.navigate('AllProducts');
                  }, 1000);
                }, 1500);

                //setTimeout(this.myFunction, 1500);
              }}>
              <Image
                style={styles.swipeImg}
                source={{uri: this.state.images[3].img}}
              />
            </TouchableOpacity>
          </Swiper>
        </View>

        <View style={styles.top10ViewStyle}>
          <Text style={styles.title}>Top 10 products for you</Text>
        </View>

        <FlatList
          style={styles.flatListStyle}
          data={this.state.sortedList.slice(0, 10)}
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
              {...this.props}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.allProductsReducer,
  categories: state.allCategoryReducer,
  allColors: state.allColorReducer,
  fiteredCat: state.filteredCategory,
  filteredData: state.filteredData,
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
    filterCategorySelected: (category) => {
      dispatch(authActions.filterCategory(category));
    },
    FilteredData: (data) => {
      dispatch(authActions.getFilteredData(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const styles = StyleSheet.create({
  filterViewStyle: {
    alignItems: 'center',
    marginHorizontal: wp('2.5%'),
  },
  top10ViewStyle: {
    marginTop: hp('3%'),
    marginLeft: wp('2.5%'),
  },
  filterSortViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('90%'),
  },
  flatListStyle: {
    height: hp('45%'),
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
    color: Colors.ORANGE,
    fontWeight: 'bold',
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
  swipeImg: {
    width: wp('100%'),
    height: hp('40%'),
  },
});
