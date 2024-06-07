import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Colors } from './Colors';

export default function DrawerContent({ handleCloseBottomSheet }) {

    const [selectedItem, setSelectedItem] = useState(null);

    const sampleData = [
        { _id: '1', name: 'John Doe', nic: '12345' },
        { _id: '2', name: 'Jane Smith', nic: '67890' },
        { _id: '3', name: 'Alice Johnson', nic: '54321' },
        { _id: '4', name: 'Bob Brown', nic: '09876' },
        { _id: '5', name: 'John Doe', nic: '12345' },
        { _id: '6', name: 'Jane Smith', nic: '67890' },
        { _id: '7', name: 'Alice Johnson', nic: '54321' },
        { _id: '8', name: 'Bob Brown', nic: '09876' }
    ];

    const handlePress = (item) => {
        setSelectedItem(item);
    };

    const renderSubItem = ({ item }) => {
        return (
          <TouchableOpacity
            style={[styles.subItem, selectedItem?._id === item._id && styles.selected]}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>{item.nic}</Text>
          </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.button} onPress={handleCloseBottomSheet}>
                    <MaterialIcons name="close" size={24} color="#F5F5F5" />
                </TouchableOpacity>
            </View>
            {/* FlatList Section */}
            <FlatList
                data={sampleData}
                renderItem={renderSubItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    height: '80%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  item: {
    marginVertical: 10,
  },
  subItem: {
    flex: 1,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: Colors.dark,
    borderColor: Colors.green,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 18,
    color: Colors.white,
  },
  selected: {
    backgroundColor: Colors.select,
  },
  button: {
    width: "100%",
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  flatListContent: {
    flexGrow: 1,
  },
});
