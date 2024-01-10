import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  onChangeText
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
        color: 'white'
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          placeholderTextColor="#fff"
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0,color: 'white'}}
          secureTextEntry={true}
          textColor="white"
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
        />
      ) : (
        <TextInput
          placeholder={label}
          placeholderTextColor="#fff"
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0,color: 'white'}}
          textColor="white"
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: '#AD40AF', fontWeight: '700'}}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}