import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import Camera from 'react-native-camera';

class VideoRecordingForm extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        path: null,
      };
    }

    async startRecording() {
        this.setState({ recording: true });
        // default to mp4 for android as codec is not set
        const { uri, codec = "mp4" } = await this.camera.recordAsync();
        this.setState({ recording: false, processing: true });
        const type = `video/${codec}`;
      
        const data = new FormData();
        data.append("video", {
          name: "mobile-video-upload",
          type,
          uri
        });
      
        try {
          await fetch(ENDPOINT, {
            method: "post",
            body: data
          });
        } catch (e) {
          console.error(e);
        }
      
        this.setState({ processing: false });
      }
      
    stopRecording() {
        this.camera.stopRecording();
    }

render() {
    const { recording, processing } = this.state;

    let button = (
      <TouchableOpacity
        onPress={this.startRecording.bind(this)}
        style={styles.capture}
      >
        <Text style={{ fontSize: 14 }}> RECORD </Text>
      </TouchableOpacity>
    );

    if (recording) {
      button = (
        <TouchableOpacity
          onPress={this.stopRecording.bind(this)}
          style={styles.capture}
        >
          <Text style={{ fontSize: 14 }}> STOP </Text>
        </TouchableOpacity>
      );
    }

    if (processing) {
      button = (
        <View style={styles.capture}>
          <ActivityIndicator animating size={18} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Camera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          //type={Camera.Constants.Type.back}
          //flashMode={Camera.Constants.FlashMode.on}
          //permissionDialogTitle={"Permission to use camera"}
          //permissionDialogMessage={
            //"We need your permission to use your camera phone"
          //}
        />
        <View
          style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
        >
          {button}
        </View>
      </View>
    );
  }
}

export default VideoRecordingForm

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
    },
    capture: {
      width: 70,
      height: 70,
      borderRadius: 35,
      borderWidth: 5,
      borderColor: '#FFF',
      marginBottom: 15,
    },
    cancel: {
      position: 'absolute',
      right: 20,
      top: 20,
      backgroundColor: 'transparent',
      color: '#FFF',
      fontWeight: '600',
      fontSize: 17,
    }
  });