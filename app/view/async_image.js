import React from 'react';
import {  View, ActivityIndicator, Image  } from 'react-native';
import storage from '@react-native-firebase/storage';
import {Loader} from '../custom/components.js';
import {stylesC} from '../styles/style_common.js';
import * as Colors from '../constants/colors.js';

export default class AsyncImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            mounted: true,
            image: "dummy.png",
            url: '',
        }
    }

    componentDidMount() {
        this.setState({ isMounted: true })
        this.getAndLoadHttpUrl()

    }

    async getAndLoadHttpUrl() {
        if (this.state.mounted == true) {
            const ref = storage().ref(this.props.image);
            ref.getDownloadURL().then(data => {
                this.setState({ url: data });
                this.setState({ loading: false });
            }).catch(error => {
                console.log('imageUrl error: '+error);
                this.setState({ url: "dummy.png" });
                this.setState({ loading: false });
            })
        }
    }

    componentWillUnmount() {
        this.setState({ isMounted: false })
    }

    render() {
        if (this.state.mounted == true) {
            if (this.state.loading == true) {
                return (
                    <View 
                        key={this.props.image} 
                        style={[this.props.style,{backgroundColor:Colors.lightGray}]} >
                    </View>
                )
            }
            else {
                return (
                    <Image 
                        style={this.props.style} 
                        source={{uri: this.state.url}}
                        resizeMode='contain' />
                )
            }
        }
        else {
            return null
        }
    }
}