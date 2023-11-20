/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable import/named */
import { View, Pressable, Text } from 'react-native';

// app icons
import { AntDesign } from '@expo/vector-icons';

import { stylesMain } from '../styles/styleMain';
import { COLORS } from '../styles/colors';

// standard button function. inludes optional text and image
// currently the color of this is hardcoded, but we should prbably change that at some point
export default function Button({
  label, image, onPress, w, h,
}) {
  return (
    <View style={[stylesMain.buttonContainer, { width: w, height: h }]}>
      <Pressable
        style={[stylesMain.button, { backgroundColor: COLORS.buttonBackground }]}
        onPress={onPress}
      >
        <AntDesign name={image} size={24} color={COLORS.orange} />
        {/* photo */}
        <Text style={stylesMain.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}
