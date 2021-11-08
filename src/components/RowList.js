import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import {iconMaps} from '@/utils/imgConfig';
// import NavigationBar from '@/components/NavigationBar'
import RowListItem from './RowListItem'
import Iconfont from '@/iconfont'

export default function index(componentProps) {
  const { onClick, sections, grouping=false  } = componentProps;


  return (
      <View style={s.container}>
        {
          sections.map(({title,menus,key},index)=>(
            <View style={[s.sectionBox,
            !grouping//是否需要组分隔线
            ?{}
            :{
              borderTopWidth: 10,
              borderTopColor: '#f0f2f5',
            }]} key={key}>
              <Text style={s.sectionTitle}>
                {title}
              </Text>
              {
                menus.map(({ key, icon,imgName, ...otherProps },index)=>{
                // console.log('-----otherProps-----');
                // console.log(otherProps);
                const props = {
                  ...otherProps,
                  uniKey:key,
                  leftContent:(
                    icon
                  ?<Iconfont name={icon} size={18} color={'gray'} />
                  :imgName
                  ?<Image source={iconMaps[imgName]} style={s.img} />
                  :null
                  ),
                  onClick,
                  isLast:menus.length-1===index
                }
                return <RowListItem key={key} {...props} />
              })
              }
            </View>
          ))
        }
      </View>
    )
}
const s = StyleSheet.create({
  container:{
    flex: 1,
    // backgroundColor: '#eee',
    // paddingHorizontal:10,
    // borderWidth: 1,
    // borderColor:'red',
    justifyContent: 'flex-start',

  },
  sectionBox:{
    // flex: 1,
   
    // borderWidth: 1,
    // borderColor:'orange',
    // paddingHorizontal:10,
    // backgroundColor: '#fff',
  },
  sectionTitle:{
    flex: 1,
    height: 10,
    // borderWidth: 1,
    // borderColor:'red',
  },
  img:{
    width: 30,
    height: 30,
  }
})
