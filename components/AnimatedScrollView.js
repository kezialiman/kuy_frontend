import React, { useRef } from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, Animated, Platform } from "react-native"

const styles = StyleSheet.create({
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    marginBottom: 280,
  },
  card: {
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
    width: '100%',
    padding:5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
})

const { width } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export const AnimatedScrollView = (business) => {

  const _scrollView = useRef(null);

  return (
    <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
      >
        {business.map((marker, index) =>(
          <View style={styles.card} key={index}>
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>{marker.name}</Text>
              <Text numberOfLines={1} style={styles.cardDescription}>{marker.address}</Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('VenueScreen', {
                    data: business
                  })}
                  style={[styles.signIn, {
                    borderColor: '#FF6347',
                    borderWidth: 1
                  }]}
                >
                  <Text style={[styles.textSign, {
                    color: '#FF6347'
                  }]}>Find a friend</Text>
                </TouchableOpacity>
                </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
  )
}
