import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
    }
});

export function BottomBar( {navigation} ){
    return(
        <View>
            <Button
        title="Go to Search"
        
      />
        </View>
    );
}