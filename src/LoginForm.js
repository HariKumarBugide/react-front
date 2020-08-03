import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Button,
    Alert,
    ActivityIndicator,
    AsyncStorage,
    KeyboardAvoidingView
} from 'react-native';

import {StackNavigator} from 'react-navigation';

import Logo from "./Logo";

export default class Login extends Component<{}>{

	constructor(props){
		super(props);
		this.state ={
			username: '',
			password: '',
		}
	}

	isLoggedIn(){
		this._loadInitialState().done();

	}
	_loadInitialState = async () => {
		 var value = await AsyncStorage.getItem('user');
		 if (value !== null){
		 	this.props.navigation.navigator('Dashboard');
		 }
	}

	render(){
		return(
			<KeyboardAvoidingView behavior = 'padding' style = {styles.wrapper}>
				<View style = {styles.container} >
					<Logo/>
					<TextInput 
						style = {styles.inputBox}
						placeholder="Username"
						placeholderTextColor = "#fff"
						onChangeText = {(username) => this.setState({username})}
						underlineColorAndroid = 'transparent'
						/>

					<TextInput 
						style = {styles.inputBox}
						placeholder="Password"
						secureTextEntry = {true}
						placeholderTextColor = "#fff"
						onChangeText = {(password) => this.setState({password})}
						underlineColorAndroid = 'transparent'
						/>

					<TouchableOpacity style ={styles.button}
						onPress ={this.login}>
						<Text style = {styles.buttonStyle}>Login</Text>

					</TouchableOpacity>
					<View style ={styles.RegisterText}>
						<Text style ={styles.RegText}>New User? Register here</Text>
					</View>
				</View>
			</KeyboardAvoidingView>

		);
	}

	login = () => {
		alert(this.state.username);

		fetch('http://51.132.250.33:3389/user_data',{
			method: 'POST',
			headers:{
				'Accept':'application/json',
				'Content-Type':'application/json',
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
			})
		})
		.then((response) => response.json())
		.then((res) => {
			if(res.success === true){
				AsyncStorage.setItem('user',res.user);
				this.props.navigation.navigate('Dashboard')
			}
			else{
				alert(res.message);
			}
		})
		.done();
	}


}


mongodb+srv://natwest_user:NatwestDxcMongo@natwestdb-x3meq.azure.mongodb.net/<dbname>?retryWrites=true&w=majority


const styles = StyleSheet.create({
	container:{
		flexGrow: 2,
		alignItems: 'center',
		height: 500,
		justifyContent: 'center',

	},
	inputBox: {
		width: 300,
		height: 40,
		backgroundColor: '#888691',
		borderRadius: 50,
		paddingHorizontal: 16,
		fontSize: 16,
		color: "#fff",
		marginVertical: 10

	},
	buttonStyle:{
		fontSize: 16,
		fontWeight:"bold",
		color:"#fff",
		textAlign: "center"
	},
	button:{
		backgroundColor: "#222391",
		width: 300,
		height: 50,
		borderRadius: 25,
		marginVertical:10,
		paddingVertical:13

	},
	RegisterText:{
		flexGrow: 1,
		alignItems: 'center',
        justifyContent: 'center',
	},
	RegText:{
		fontSize:15,
		color: "black",
		fontWeight:"bold"
	}

});