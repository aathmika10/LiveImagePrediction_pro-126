import * as React from 'react'
import { StyleSheet, Text, View, Button, Platform } from 'react-native'
import * as Permissions from 'expo-Permissions'
import * as ImagePicker from 'expo-image-picker'

export default class PickImage extends React.Component {
    state={image:null}

    getPermission=async()=>{
        if(Platform.OS!=="web"){
            const {status}=await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if (status!== "granted"){
                alert("Sorry we need camera roll permissions")
            }
        }
    }

    pickImage=async()=>{
        try{
            let result=await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.All,
                allowsEditing:true,
                aspect:[4,3],
                quality:1
            })
            if (!result.cancelled){
                this.setState({
                    image:result.data
                })
                this.uploadImage(result.uri)
            }
        }
        catch(E){
            console.log(E)
        }
    }
    uploadImage=async(uri )=>{
        const data=new FormData()
        let fileName = uri.split("/")[uri.split("/").length-1]
        let type =`image/${uri.split(".")[uri.split(".").length-1]}`
        const fileToUpload={uri:uri,name:name,type:type}
        data.append("alphabet",fileToUpload)
        fetch("https://ba23845acbfe.ngrok.io/predictAlphabet",{
            method:"POST",
            body:data,headers:{
                "content-type":"multipart/form-data"
            }
        })
        .then((response)=>response.json())
        .then((result)=>{
            console.log("success: ",result)
        })
        .catch((error)=>{
            console.error("error",error)
        })
    }
    componentDidMount(){
        this.getPermission()
    }
    render() {
        let {image}=this.state;
        return (
            <View>
                <Button title="Pick image"
                    onPress={this.PickImage}></Button>
            </View>
        )
    }
}