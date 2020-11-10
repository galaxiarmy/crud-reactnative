import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import Axios from 'axios'

const Item = ({name, email, bidang, onPress, onDelete}) => {
  return (
    <View style={styles.itemContainer}>
        
        <TouchableOpacity onPress={onPress} >
          <Text style={styles.descName}>{name}</Text>
          <Text style={styles.descEmail}>{email}</Text>
          <Text style={styles.descBidang}>{bidang}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
          <Text style={styles.delete}>X</Text>
          </TouchableOpacity>
       
      </View>

  )
}

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bidang, setBidang] = useState("");
  const [users, setUsers] = useState([]);
  const [button, setButton] = useState("Simpan");
  const [selectedUser, setSelectedUser] = useState({})

  useEffect(() => {
    getData();
  }, []); 

  const submit = () => {
    const data = {
      name,
      email,
      bidang
    }
    console.log('data before send', data);
    if(button === 'Simpan') {
      Axios.post('http://192.168.100.4:3000/users', data)
    .then(res => {
      console.log('res', res);
      setName(""); 
      setEmail(""); 
      setBidang("");
      getData();
    }) 

    } 
    else if(button === 'Update' ) {
      Axios.put(`http://192.168.100.4:3000/users/${selectedUser.id}`, data)
      .then(res => {
        console.log('res update: ', res);
        getData();
        setName(""); 
      setEmail(""); 
      setBidang("");
      setButton("Simpan");
      })

    }
    
    
  } 

  const getData = () => {
    Axios.get('http://192.168.100.4:3000/users')
    .then(res => {
      console.log('res get data: ', res);
      setUsers(res.data);  
    })
  }

  const selectItem = (item) => {
    console.log('selected item: ', item);
    setSelectedUser(item)
    setName(item.name)
    setEmail(item.email) 
    setBidang(item.bidang)
    setButton("Update")
  }

  const deleteItem = (item) => {
    console.log(item);
    Axios.delete(`http://192.168.100.4:3000/users/${item.id}`) 
    .then(res => {
      console.log('res delete: ', res)
      getData();
    })
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.textTitle}>Local API (JSON Server) </Text>
      <Text style={styles.bigTitle}>Daftar Karyawan</Text>
      <TextInput  style={styles.input} placeholder="Nama Lengkap" value={name} onChangeText={(value)=> setName(value)} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(value)=> setEmail(value)}/>
      <TextInput style={styles.input} placeholder="Bidang" value={bidang} onChangeText={(value)=> setBidang(value)}/>
      <Button title={button} onPress={submit} />
      <View style={styles.line} />
      {users.map(user => {
        return <Item 
        key={user.id} 
        name={user.name} 
        email={user.email} 
        bidang={user.bidang} 
        onPress={() => selectItem(user)}
        onDelete={() => Alert.alert('Peringatan', 'Anda yakin ingin menghapus ini?', 
        [
          {
            text: 'Tidak ', 
            onPress: () => console.log('button tidak')
          },
          {
           text: 'Ya',
           onPress: () => deleteItem(user)
          }
       

        ] 
      )} />
      })}
         

    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    flex: 1,
  },
  textTitle: {
    textAlign: "center",
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 25,
    paddingHorizontal: 18
  },
  line: {
    height: 2,
    backgroundColor: "black",
    marginVertical: 20
  },
  descName: {
    fontSize: 20,
    fontWeight: "bold"

  },
  descEmail: {
    fontSize: 16
  },
  descBidang: {
    fontSize: 12,
    marginTop: 8,
  },
  itemContainer: {
    justifyContent: "space-between",
    marginTop: 16,
    flexDirection: "row",
     
    
    
  },
  delete: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red"
  },
  bigTitle: {
    marginBottom: 16,
    fontSize: 12,
    fontWeight: "bold"
  }

})



{/* import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  
  View,
  Text,
 

} from 'react-native';

const dummyItem = () => {
  return(
    <View style={styles.items}>
      <Text>nip</Text>
      <Text>nama</Text>
      <Text>jenis kelamin</Text>
      <Text>agam</Text>
      <Text>tanggal lahir</Text>
      <Text>tempat lahir</Text>
      <Text>alamat</Text>


    </View>
  )
  
}



const App = () => {

 
    const [nip, setNip] = useState("");
    const [nama, setNama] = useState("");
    const [jenisKelamain, setJenisKelamin] = useState("");
    const [agama, setAgama] = useState("");
    const [tanggalLahir, setTanggalLahir] = useState("");
    const [tempatLahir, setTempatLahir] = useState("");
    const [alamat, setAlamat] = useState("");

    const simpan = () => {
      const data = {
        nip,
        nama,
        jenisKelamain,
        agama,
        tanggalLahir,
        tempatLahir,
        alamat

      }
      console.log('data terkirim', data)
    

  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sistem Informasi Karyawan</Text>
      <View>
        <TextInput style={styles.input} placeholder="NIP" value={nip} onChangeText={(value) => setNip(value)} />
        <TextInput style={styles.input} placeholder="NAMA" value={nama} onChangeText={(value) => setNama(value)} />
        <TextInput style={styles.input} placeholder="JENIS KELAMIN" value={jenisKelamain} onChangeText={(value) => setJenisKelamin(value)} />
        <TextInput style={styles.input} placeholder="AGAMA" value={agama} onChangeText={(value) => setAgama(value)} />
        <TextInput style={styles.input} placeholder="TANGGAL LAHIR" value={tanggalLahir} onChangeText={(value) => setTanggalLahir(value)} />
        <TextInput style={styles.input} placeholder="TEMPAT LAHIR" value={tempatLahir} onChangeText={(value) => setTempatLahir(value)} />
        <TextInput style={styles.input} placeholder="ALAMAT" value={alamat} onChangeText={(value) => setAlamat(value)} />
      </View>

      <TouchableOpacity style={styles.submit} onPress={simpan} >
        <Text style={styles.button}>SIMPAN</Text>
      </TouchableOpacity>

     



    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  input: {
    borderRadius: 10,
    
    borderWidth: 1,
    padding: 12,
    backgroundColor: "#FFFFFF",
    marginTop: 10,

  },
  submit: {
    width: "100%",
    padding: 10,
    backgroundColor: "black",
    borderRadius: 10,
    marginTop: 20,
  },
  button: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center"
    
    
  },
  items: {
    backgroundColor: "black",
    width: "100%",
    padding: 10,
    marginTop: 20,

  }
  
});

export default App;

*/}
