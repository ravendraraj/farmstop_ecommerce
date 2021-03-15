import React,{Component,useState} from 'react'
import {View ,Text,StyleSheet ,Alert,FlatList,ToastAndroid, StatusBar,TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import Autocomplete from 'react-native-autocomplete-input'
import {getAppartment} from '../lib/api'
import constants from '../constants'

function AutoCompleteComp (props){
	const [data, setData] = useState({
		query:'',
	});

	const findAppartment=(query)=>{
		if (query === '' || query.length <= 2) {
			//if the query is null then return blank
			return [];
		}

		if(props.data.apartmentList.length > 0) {
			const { productList } = props.data.apartmentList;
			const regex = new RegExp(`${query.trim()}`, 'i');
			return props.data.apartmentList.filter(prod => (prod.apartment.search(regex) >= 0 ));
		}else{
			return [];
		}
    }

     const fetchAppartment=async(searchKey)=>{
        let {query} = data;
        setData({
        	...data,
        	query:searchKey
        });

        if(query !="" && query.length >=2){
            await props.dispatch(getAppartment({keyword:query}));
            props.chooseFromApartmentList(data.query);
        }
    }

    const seacrhProduct=(key)=>{
    	//console.log(key);
    }

    const chooseApartment=(apartment)=>{
    	setData({
    		...data,
    		query:apartment,
    	});

    	props.chooseFromApartmentList(apartment);
    }

	const { query } = data;
	const productList = findAppartment(query);
	const comp = (a, b) => (a.toLowerCase().trim() === b.toLowerCase().trim());

	return(
                <Autocomplete
                    autoCapitalize="none"
                        autoCorrect={false}
                        containerStyle={styles.autocompleteContainer}
                        inputContainerStyle={{ borderWidth: 0 }}
                        style={{ color: constants.Colors.color_grey, fontSize: 18 }}
                        listContainerStyle={{borderWidth:0}}
                        listStyle={{ borderWidth:0}}
                        //data to show in suggestion
                        data={productList.length === 1 && comp(query, productList[0].apartment) ? [] : productList}
                        //default value if you want to set something in input
                        defaultValue={query}
                        /*onchange of the text changing the state of the query which will trigger
                        the findAppartment method to show the suggestions*/
                        // onChangeText={text => this.setState({ query: text})}
                        onChangeText={text =>fetchAppartment(text)}
                        onSubmitEditing ={()=> seacrhProduct(query)}
                        placeholder={props.placeHolderText}
                        renderItem={({ item }) => (
	                        <TouchableOpacity onPress={() => {chooseApartment(item.apartment), seacrhProduct(item.apartment) }}>
	                            <Text style={styles.itemText}>
	                            {item.apartment}
	                            </Text>
	                        </TouchableOpacity>
                        )}
                    />
                
	);
}
function mapDispatchToProps(dispatch) {
    return({
        dispatch
    })
}

function mapStateToProps(state) {
    let auth = state.auth;
    let indicator = state.indicator;
    let data = state.data;
    return {
        auth,indicator,data
};
}

const styles = StyleSheet.create({
	    autocompleteContainer: {
		position: 'absolute',
		left: 0,
		top: 0,
		backgroundColor: constants.Colors.color_WHITE,
		borderBottomWidth:2,
		borderColor:constants.Colors.color_grey,
        zIndex: 2,
        width:"100%",
	},
	itemText: {
		fontSize: 15,
		paddingTop: 5,
		paddingBottom: 5,
		margin: 2,
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteComp);