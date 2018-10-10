import React from 'react';
import { 
	StyleSheet,
	View,
	TextInput,
} from 'react-native';

export default class SearchInput extends React.Component {
	state = {
		text: '',
	}
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		placeholder: PropTypes.string,
	}
	static defaultProps = {
		placeholder: '',
	}
	handleChangeText = ( text ) => {
		this.setState( { text } );
	}
	handleSubmitEditing = () => {
		const { onSubmit } = this.props;
		const { text } = this.state;
		if ( ! text ) { return; }
		onSubmit( text );
		this.setState( { text: '' } );
	}
	render() {
		const { placeholder } = this.props;
		const { text } = this.state;
		return (
			<View style={ styles.container }>
				<TextInput
					autoCorrect={ false }
					clearButtonMode="always"
					onChangeText={ this.handleChangeText }
					onSubmitEditing={ this.handleSubmitEditing }
					placeholder={ placeholder }
					placeholderTextColor="white"
					style={ styles.textInput }
					underlineColorAndroid="transparent"
					value={ text }
				/>
			</View>
		);
	};
};

const styles = StyleSheet.create( {
	container: {
		alignSelf: 'center',
		backgroundColor: '#666',
		borderRadius: 5,
		height: 40,
		marginHorizontal: 20,
		marginTop: 20,
		paddingHorizontal: 10,
	},
	textInput: {
		color: 'white',
		flex: 1,
		width: 300,
	},
} );
