import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';
import {
  PermissionsAndroid,
  Platform,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {Badge, ActionPopover, Overlay} from 'teaset';
import {OssUpload} from '@/services/global';
import ImagePicker from 'react-native-image-picker';
import {WhiteSpace} from '@ant-design/react-native';
import {showMessage, failMessage, UrlParamHash} from '@/utils/util';
import {iconMaps} from '@/utils/imgConfig';

let modelKey;
//图片选择器参数设置
const options = {
  title: '请选择图片来源',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '相册图片',
  // noData: true,
  storageOptions: {
    skipBackup: true,
    // path: 'images',
    cameraRoll: true,
    waitUntilSaved: true,
  },
};
const ShowImg = ({file, onDelete}) => {
  const ref = useRef();
  // const modelRef = useRef();
  const openPreviewImg = () => {
    if (modelKey) {
      return;
    }
    modelKey = Overlay.show(
      <Overlay.View
        style={s.modalBox}
        modal={false}
        overlayOpacity={0.7}
        autoKeyboardInsets={true}
        // containerStyle={s.modalBox}
        // onAppearCompleted={()=>{
        //   onClick&&onClick('openCommentModal',item)
        // }}
        onDisappearCompleted={() => {
          console.log('----closeCommentModal-----');
          // modelKey&&Overlay.hide(modelKey)
          modelKey = null;
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (!modelKey) {
              return;
            }
            Overlay.hide(modelKey);
            modelKey = null;
          }}>
          <Image
            source={{uri: file.url}}
            style={s.previewImg}
            resizeMode={'contain'}
          />
        </TouchableWithoutFeedback>
      </Overlay.View>,
    );
  };

  return (
    <TouchableWithoutFeedback
      style={s.img}
      onPress={openPreviewImg}
      onLongPress={() => {
        ref.current &&
          ref.current.measureInWindow &&
          ref.current.measureInWindow((x, y, width, height) => {
            let items = [
              {
                title: '删除',
                onPress: onDelete,
              },
            ];
            ActionPopover.show({x, y, width, height}, items);
          });
      }}>
      <View ref={ref}>
        <ImageBackground source={{uri: file.thumbUrl}} style={s.img} />
      </View>
    </TouchableWithoutFeedback>
  );
};

function ImgPick(componentProps) {
  const {
    OSSData,
    getOSSData,
    value,
    onCustomChange,
    number = 1, // 上传个数
    limit = 5, // 上传大小 单位Mb
    exts = ['.png', '.jpg'],
  } = componentProps;

  // console.log('------------ImgPick componentProps----------');
  // console.log(componentProps);

  const [granted, setGranted] = useState(false);
  // const [files, setFiles] = useState(fileHandler);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const fileHandler = () => {
    if (!value || !(value instanceof Array)) {
      return [];
    }
    return value.map((item) => {
      // const urlData = parseURL(item);
      // const name = urlData&&urlData.params&&urlData.params.name&&window.decodeURIComponent(urlData.params.name)||item
      const UrlArray = item.split('?');
      const realUrl = (UrlArray && UrlArray[0]) || item;
      const suffix = realUrl.slice(realUrl.lastIndexOf('.'));
      return {
        url: item,
        thumbUrl: realUrl + '?x-oss-process=image/resize,m_fixed,h_70,w_70',
      };
    });
  };

  useEffect(() => {
    setFiles(fileHandler());
  }, [value]);

  const onAdd = () => {
    if (uploading) {
      return;
    }
    if (files.length === number) {
      showMessage(`最多上传${number}个文件`);
      return;
    }

    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // console.log(response);

        const isTooLong = response.fileName.length > 150;
        if (isTooLong) {
          showMessage('文件名过长，请重新命名并上传！');
          return;
        }
        const isLimit = response.fileSize / 1024 / 1024 < limit;
        if (!isLimit) {
          showMessage(`请上传小于${limit}M的文件`);
          return;
        }
        const suffix = response.fileName.slice(
          response.fileName.lastIndexOf('.'),
        );
        const isAllowType = exts.includes(suffix);
        if (!isAllowType) {
          showMessage(`请上传后缀为${exts.join(',')}的文件`);
          return;
        }
        let file;
        if (Platform.OS === 'android') {
          file = response.uri;
        } else {
          file = response.uri.replace('file://', '');
        }
        setProgress(0);
        setUploading(true);
        try {
          const expire = OSSData.expire * 1000;
          let realOSSData = OSSData;
          if (expire < Date.now()) {
            realOSSData = await new Promise((res, rej) => {
              getOSSData(res, rej);
              // console.log('----getOSSData----');
            });
          }
          //console.log('-----OSSData-----');
          //console.log(realOSSData,OSSData);
          if (realOSSData) {
            const res = await OssUpload(
              {
                response,
                OSSData: realOSSData,
              },
              (event) => {
                setProgress(((event.loaded / event.total) * 100).toFixed(2));
              },
            );
            if (!res || res.code !== 200) {
              throw new Error(res.message);
            }
            // console.log(res.data);
            const realValue = files.map((item) => item.url).concat([res.data]);
            // console.log('-----realValue-----');
            // console.log(realValue);
            onCustomChange && onCustomChange(realValue);
            setUploading(false);
            return;
          }
          throw new Error('上传失败！');
        } catch (e) {
          showMessage(e && e.message);
          setUploading(false);
          //console.log(e&&e.message);
        }
      }
    });
  };

  // console.log('------files----');
  // console.log(files);
  return (
    <View style={s.container}>
      <ScrollView
        // horizontal={true}
        style={s.showBox}
        keyboardShouldPersistTaps={'always'}>
        <View style={s.contentBox}>
          {files && files.length < number ? (
            <TouchableOpacity
              onPress={onAdd}
              activeOpacity={uploading ? 0.2 : 1}
              style={s.uploadBox}>
              {uploading ? (
                <ActivityIndicator size="large" color="#999" />
              ) : (
                <>
                  <Text style={s.plusIcon}>+</Text>
                  <Text style={s.plusText}>上传</Text>
                </>
              )}
            </TouchableOpacity>
          ) : null}
          {files.map((file, index) => (
            <ShowImg
              file={file}
              onDelete={() => {
                onCustomChange &&
                  onCustomChange(
                    files
                      .filter((item) => item.url !== file.url)
                      .map((item) => item.url),
                  );
              }}
              key={file.url || 'file' + index}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default connect(
  ({global, loading}) => ({
    OSSData: global.OSSData,
    loading: loading.models.global,
  }),
  (dispatch) => ({
    getOSSData: (res, rej) =>
      dispatch({
        type: 'global/fetchOSSData',
        payload: {res, rej},
      }),
  }),
)(ImgPick);

const s = StyleSheet.create({
  container: {
    // flex: 1,
    // height: 50,
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor:'blue',
    marginLeft: 4,
  },
  uploadBox: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
    borderStyle: 'dashed',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#999',
  },
  plusIcon: {
    fontSize: 30,
    color: '#8A8C99',
  },
  plusText: {
    color: '#8A8C99',
  },
  showBox: {
    flex: 1,
    // borderWidth: 1,
    // borderColor:'red',
    // height: 180,
    // flexDirection: 'row',
  },
  contentBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // height: 180,
    // width: 300,
  },
  showImg: {
    width: 70,
    height: 70,
  },
  img: {
    flex: 0,
    width: 70,
    height: 70,
    marginHorizontal: 2,
    marginBottom: 4,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderStyle: 'dashed',
    // borderRadius:1,
    // borderWidth: 1,
    // borderColor:'#999',
  },
  modalBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImg: {
    width: '80%',
    height: '80%',
    // backgroundColor: 'red',
  },
});
