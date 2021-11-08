import React,{ useEffect,useRef } from 'react'
import { Dimensions,StyleSheet,View,Text,TouchableOpacity } from 'react-native';

function MainBottomTabBar(componentProps) {
  // console.log('-----componentProps-------');
  const { onChange,position,state,descriptors,navigation,labelStyle,...other } = componentProps
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  // console.log(componentProps);

  const tabBarRef = useRef()

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  // const onLayout = (data) =>{
  //   // console.log('-----layout------');
  //   // console.log(data);
  //         tabBarRef.current&&tabBarRef.current.measureInWindow((x, y, width, height) => {
  //           // console.log('------x, y, width, height-------');
  //           // console.log(x, y, width, height);
  //             if(position.y!==y){
  //               onChange&&onChange({x, y, width, height})
  //             }
  //       });
  //       }

  // useEffect(()=>{
  //   Dimensions.addEventListener("change", onLayout);
  //   return ()=>{
  //     Dimensions.removeEventListener("change", onLayout);
  //   }
  // },[])

  return (
    <View style={s.container}>
      {state.routes.map((route,index) => {
        const focused = index === state.index;
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;
        const Icon = options.tabBarIcon


        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };



        return (
          <TouchableOpacity
            key={route.key}
            ref={tabBarRef}
            // onLayout={onLayout}
            accessibilityRole="button"
            accessibilityStates={focused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={s.tabBarItem}
          >

            {Icon
              ? (
                <View style={s.imgBox} >
                  <Icon focused={focused} />
                </View>)
              : null
            }
            <View style={s.tabBarLabelBox}>
              <Text style={[s.tabBarText,{ color: focused ? '#0080FC' : '#8A8C9A' },labelStyle]}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// export default React.forwardRef((props, ref) => {
//     return <MainBottomTabBar {...props} forwardedRef={ref} />;
//   });

// const mapStateToProps = (state) => {
//   const { global } = state;
//   // console.log(user);
//   return {
//     ...global
//   };
// };

// const actionCreators = {
//   onChange: (position) => ({
//     type:'global/assign',
//     payload:{position}
//   }),
// };

export default MainBottomTabBar;

const s = StyleSheet.create({
  container: {
    // flex: 1,
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 10,
    backgroundColor: '#fff',
    // shadowOffset:{ 
    //   width:-1,
    //   height: -1,
    // },
    // shadowColor:"#333",
    // shadowOpacity:0.3,
    // shadowRadius:2,
    // marginHorizontal:4,
    // marginVertical:6
  },
  tabBarItem: {
    flex: 1,
    // borderWidth: 1,
    // borderColor:'red',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabBarText: {
    // borderWidth: 1,
    // borderColor:'red',
  },
  imgBox: {
    // borderWidth: 1,
    // borderColor:'blue',
  }
})
