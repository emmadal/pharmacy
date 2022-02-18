import React, {useRef} from 'react';
import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';
import {View, Dimensions, StyleSheet, Platform} from 'react-native';
import {withTheme} from 'react-native-paper';

const {width: screenWidth} = Dimensions.get('window');

const SlideImage = ({CarouselItem}: any) => {
  const carouselRef = useRef(null);

  const renderItem = ({item, index}: any, parallaxProps: any) => {
    return (
      <View style={styles.item} key={index}>
        <ParallaxImage
          source={{uri: item}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={CarouselItem}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  carouselContainer: {
    zIndex: 1,
    position: 'relative',
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});

export default withTheme(SlideImage);
