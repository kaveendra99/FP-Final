import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Image, Alert, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { decode } from '@mapbox/polyline';
import { FontAwesome } from '@expo/vector-icons'
import { Colors } from './Colors';

const GOOGLE_MAPS_API_KEY = "AIzaSyDYl-22PhhpvLJuumUsoBWWKcJkJvEyc4A";

export default function MapScreen({navigation}) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearestRecyclingCenter, setNearestRecyclingCenter] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    getLocationPermission();
  }, []);

  useEffect(() => {
    const subscription = Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, timeInterval: 5000 }, // adjust timeInterval as needed
      (location) => {
        const { latitude, longitude } = location.coords;
        setCurrentLocation({ latitude, longitude });
        fetchNearestRecyclingCenter({ latitude, longitude });
      }
    );

    return () => {
      subscription.remove(); // clean up subscription on unmount
    };
  }, []);

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please enable location services to use this feature.');
      return;
    }
    getCurrentLocation();
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude } = location.coords;
      setCurrentLocation({ latitude, longitude });
      fetchNearestRecyclingCenter({ latitude, longitude });
    } catch (error) {
      Alert.alert('Error', 'Failed to get current location. Please make sure location services are enabled.');
    }
  };

  const fetchNearestRecyclingCenter = async (origin) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${origin.latitude},${origin.longitude}&radius=5000&type=recycling&key=${GOOGLE_MAPS_API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch recycling center. Please try again later.');
      }
      const data = await response.json();
      if (data.status !== 'OK' || data.results.length === 0) {
        throw new Error('No recycling center found nearby.');
      }
      const nearestCenter = data.results[0];
      const centerLocation = {
        latitude: nearestCenter.geometry.location.lat,
        longitude: nearestCenter.geometry.location.lng,
      };
      setNearestRecyclingCenter(centerLocation);
      fetchRoute(origin, centerLocation);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const fetchRoute = async (origin, destination) => {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_MAPS_API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch route. Please try again later.');
      }
      const data = await response.json();
      if (data.status !== 'OK') {
        throw new Error('Failed to fetch route. Please try again later.');
      }
      const coordinates = data.routes[0].overview_polyline.points;
      setRouteCoordinates(decodePolyline(coordinates));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const decodePolyline = (encoded) => {
    return decode(encoded).map((coords) => ({
      latitude: coords[0],
      longitude: coords[1],
    }));
  };

  return (
    <View style={styles.container}>
      {currentLocation && nearestRecyclingCenter && (
        <MapView
          style={styles.map}
          initialRegion={{
            ...currentLocation,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={currentLocation} title="Your Location">
            <Image
              source={require('../assets/logo1.png')} // Provide the path to your image file
              style={{ width: 32, height: 32 }} // Adjust the size of the image as needed
            />
          </Marker>
          <Marker coordinate={nearestRecyclingCenter} title="Nearest Recycling Center" />
          {routeCoordinates.length > 0 && (
            <Polyline coordinates={routeCoordinates} strokeWidth={4} strokeColor={Colors.green} />
          )}
        </MapView>
      )}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.navbutton} onPress={() => {navigation.navigate("Finished")}}>
          <Text style={styles.navbuttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.dark,
  },
  map: {
    width: '90%',
    height: '80%',
  },
  buttonsContainer: {
    width: '90%',
    marginBottom: 40,
    marginTop: 'auto',
  },
  navbutton: {
    backgroundColor: Colors.green,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 0,
    alignItems: 'center',
  },
  navbuttonText: {
    color: Colors.dark,
    fontSize: 18,
  },
});
