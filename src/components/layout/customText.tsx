import React, {FC, ReactNode} from 'react';
import {TextStyle} from 'react-native';
import {Text} from 'react-native';
import font from '../../constants/Font';

interface CustomTextProps {
  children: ReactNode;
  style?: TextStyle;
}

const CustomText: FC<CustomTextProps> = ({children, style, ...props}) => {
  return (
    <Text style={[font.regular, style]} {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
