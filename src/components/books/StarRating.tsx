import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  starSize?: number;
  reviewCount?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  starSize = 16,
  reviewCount = 0,
}) => {
  const renderStar = (index: number) => {
    const starRating = rating - index;

    if (starRating >= 1) {
      // Full star
      return (
        <FontAwesome6
          key={index}
          name="star"
          size={starSize}
          color="#FFD700"
          solid
          style={styles.star}
        />
      );
    } else if (starRating >= 0.5) {
      // Half star
      return (
        <FontAwesome6
          key={index}
          name="star-half-stroke"
          size={starSize}
          color="#FFD700"
          solid
          style={styles.star}
        />
      );
    } else {
      // Empty star
      return (
        <FontAwesome6
          key={index}
          name="star"
          size={starSize}
          color="#E5E5E5"
          iconStyle="regular"
          style={styles.star}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {Array.from({ length: maxStars }, (_, index) => renderStar(index))}
      </View>
      <Text style={[styles.ratingText, { fontSize: starSize * 0.875 }]}>
        ({reviewCount?.toLocaleString() || 0} reviews)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    marginHorizontal: 1,
  },
  ratingText: {
    color: "#666",
    marginLeft: 6,
    fontFamily: "System",
  },
});

export default StarRating;
