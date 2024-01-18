import React from 'react';
import { TouchableOpacity, Text, StyleSheet,View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const CustomButton = ({ title, onPress, color, fontSize, marginLefts, paddingB, marginBottoms, backgroundColors, borderColors, iconName, iconSize }) => (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: color,
          marginLeft: marginLefts,
          paddingBottom: paddingB,
          marginBottom: marginBottoms,
          borderColor: borderColors,
        },
      ]}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize, color: backgroundColors }}>{title}</Text>
        {iconName && <Icon name={iconName} size={iconSize} color={backgroundColors} style={{ marginLeft: 5 }} />}
      </View>
    </TouchableOpacity>
  );

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default CustomButton;
