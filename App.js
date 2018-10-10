import React from 'react';
import {
	ActivityIndicator,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import { fetchLocationId, fetchWeather } from './utils/api';
import getImageForWeather from './utils/getImageForWeather';

import SearchInput from './components/SearchInput';

export default class App extends React.Component {
	state = {
		error: false,
		loading: false,
		location: '',
		temperature: 0,
		weather: '',
	}
	componentDidMount() {
		this.handleUpdateLocation( 'San Francisco' );
	}
	handleUpdateLocation = async city => {
		if ( ! city ) { return; }
		this.setState( { loading: true }, async () => {
			try {
				const locationId = await fetchLocationId( city );
				const { location, weather, temperature } = await fetchWeather( locationId );
				this.setState( {
					error: false,
					loading: false,
					location,
					temperature,
					weather,
				} );
			} catch( e ) {
				this.setState( {
					error: true,
					loading: false,
				} );
			}
		} );
	}
	render() {
		const { error, loading, location, temperature, weather } = this.state;
		return (
			<KeyboardAvoidingView style={ styles.container } behavior="padding">
			<StatusBar barStyle="light-content" />
			<ImageBackground
					imageStyle={ styles.image }
					source={ getImageForWeather( weather ) }
					style={ styles.imageContainer }
				>
					<View style={ styles.detailsContainer }>
						<ActivityIndicator animating={ loading } color="white" size="large" />
						{
							! loading && (
								<View>
									{
										error && (
											<Text style={ [ styles.smallText, styles.textStyle ] }>
												Could not load weather, please try a different city.
											</Text>
										)
									}
									{
										! error && (
											<View>
												<Text style={ [ styles.largeText, styles.textStyle ] }>{ location }</Text>
												<Text style={ [ styles.smallText, styles.textStyle ] }>{ weather }</Text>
												<Text style={ [ styles.largeText, styles.textStyle ] }>{ `${ Math.round( temperature ) }°C` }</Text>
											</View>
										)
									}
									<SearchInput
										onSubmit={ this.handleUpdateLocation }
										placeholder="Search any city"
									/>
								</View>
							)
						}
						
					</View>
				</ImageBackground>
 			</KeyboardAvoidingView>
 		);
 	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#34495E',
		flex: 1,
	},
	imageContainer: {
		flex: 1,
	},
	image: {
		flex: 1,
		height: null,
		resizeMode: 'cover',
		width: null,
	},
	textStyle: {
		color: 'white',
		fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
		textAlign: 'center',
	},
	largeText: {
		fontSize: 44,
	},
	smallText: {
		fontSize: 18,
	},
	detailsContainer: {
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.2)',
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 20,
	},
});
