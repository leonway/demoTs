import React,{useEffect} from 'react';
import Control from './Control';
import {StyleSheet, Text, View} from 'react-native';
import {useFormik} from 'formik';
import * as yup from 'yup';


const ErrorMessage = (props) => {
  // console.log('----ErrorMessage, props--------');
  // console.log(props);
  const name = props.name;
  const error = props.errors[name];
  const touch = props.touched[name];
  // if(!(touch && error)){
  //   return null
  // }
  if(!error){
    return null
  }
  return <Text style={s.errorText}>{error}</Text>;
};

export default function Form(componentProps) {
  const {controls, initialValues, setFormObject, onSubmit,} = componentProps;

  useEffect(()=>{
    setFormObject(formProps)
  },[formProps])

  const schemaConfig = controls.reduce(
    (state, {rules, key,required, title}) => {
      let config = yup;
      
      if(!rules){
        config = config.string()
      }
      else{
        config = rules.reduce((newConfig, {key, value}) => {
          if (newConfig[key]) {
            newConfig = newConfig[key](value);
          }
          return newConfig;
        }, config);
      }
      if(required){
        config = config.required(title+"是必填项！")
      }
      return {
        ...state,
        [key]: config,
      };
    },
    {},
  );
  // console.log('-------schemaConfig----------');
  // console.log(schemaConfig);
  const FormSchema = yup.object().shape(schemaConfig);

  const formProps = useFormik({
    initialValues,
    validationSchema: FormSchema,
    onSubmit,
  });
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue
  } = formProps;

  const toControl = ({key, title, extra,hor=true,...props}) => {
    // console.log('------key-------');
    // console.log(key);
    props = {
      ...props,
      onBlur: handleBlur(key),
      onChange: handleChange(key),
      onCustomChange:(val)=>setFieldValue(key,val),
      value: values[key],
    };

    return (
       <View style={[
         s.item,
       ]} key={key}>
          <View style={[
            s.labelBox
          ]}>
            <Text style={[s.text, s.labelText]}>
             {
               props.required
               ?(<Text style={s.required}>
                 *
               </Text>)
               :null
             }
             {title}:
            </Text>
          </View>
          <View style={[
            s.valueBox
          ]}>
            <Control {...props} />
            <ErrorMessage {...formProps} name={key} />
            {
              extra
              ?(<Text style={s.extraText}>
                {extra}
              </Text>)
              :null
            }
          </View>
        </View>
     
    );
  };

  // console.log('-----formProps-------');
  // console.log(formProps);

  return <View 
          style={s.container}
          // wrap={true} 
          // multipleLine={true}
          >
          {controls.map(toControl)}
          </View>;
}

const s = StyleSheet.create({
  container:{

  },
  item:{
    // flex: 1,
    // height: 50,
    // flexDirection: 'row',
    // justifyContent: "center",
    // alignItems: 'center',
    borderBottomWidth: 0,
    // marginBottom: 10,
    // borderBottomWidth: 1,
    // borderColor:'black',
    marginLeft: 10,
  },
  labelBox:{
    // flex: 1,
    // alignItems: 'flex-end',
    marginBottom: 10,
  },
  valueBox:{
    // flex: 1,
    // flex: 2,
    // alignItems: 'flex-start',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  required:{
    color:'red'
  },
  errorText: {
    // flex: 1,
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
    // backgroundColor: 'red',
  },
  extraText:{
    fontSize: 12,
    color:'#8A8C9A',
    marginTop: 4,
  }
});
