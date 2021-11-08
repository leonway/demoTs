import React, {Component} from 'react';
import { NAV_BAR_HEIGHT, STATUS_BAR_HEIGHT } from '@/utils/adapter'
import { ViewPropTypes, Text, StatusBar, StyleSheet, View, Platform, DeviceInfo} from 'react-native';
import {PropTypes} from 'prop-types';



const StatusBarShape = {//设置状态栏所接受的属性
    barStyle: PropTypes.oneOf(['light-content', 'default','dark-content']),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
};

export default class NavigationBar extends Component {
    //提供属性的类型检查
    static propTypes = {
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleStyle: PropTypes.object,
        titleView: PropTypes.element,
        titleLayoutStyle: ViewPropTypes.style,
        hide: PropTypes.bool,
        statusBar: PropTypes.shape(StatusBarShape),
        rightButton: PropTypes.element,
        leftButton: PropTypes.element,
        layoutLinearGradientProps: PropTypes.object
    };
    //设置默认属性
    static defaultProps = {
        statusBar: {
            // barStyle: 'dark-content',
            hidden: false,
        },
        layoutLinearGradientProps:{}
    };

    render() {
        let statusBar = !this.props.statusBar.hidden ?
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar} />
            </View> : null;

        let titleView = this.props.titleView ? this.props.titleView :
            <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.title,this.props.titleStyle]}>{this.props.title}</Text>;

        let content = this.props.hide ? null :
            <View style={styles.navBar}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>;
        return (
            <View {...this.props.layoutLinearGradientProps} style={[styles.container, this.props.style]}>
                {statusBar}
                {content}
            </View>
        );
    }

    getButtonElement(data) {
        return (
            <View style={styles.navBarButton} >
                {data ? data : null}
            </View>
        );

    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        // borderWidth: 1,
        // borderColor:'red',
    },
    navBarButton: {
        alignItems: 'center',
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: NAV_BAR_HEIGHT,
    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0,
    },
    title: {
        fontSize: 20,
        color: 'black',
        // height: NAV_BAR_HEIGHT,
        // lineHeight: 50,
    },
    statusBar: {
        // height: STATUS_BAR_HEIGHT,
    },
});
