import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { fonts } from '../../utils/fonts';
import SearchInputIcon from '../icons/SearchInputIcon';
import { rem, em } from '../../assets/styles/SearchScreen.Styles';
interface SearchBarProps {
  query: string;
  onSearchChange: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onSearchChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <SearchInputIcon size={24} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Book title or author"
        value={query}
        onChangeText={onSearchChange}
        placeholderTextColor="#A6A6A6"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: rem(0.5),
    paddingHorizontal: rem(1),
    paddingVertical: rem(0.5),
    marginVertical: rem(0.5),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    width: '93%',
  },
  icon: {
    marginRight: rem(0.75),
  },
  input: {
    flex: 1,
    fontSize: rem(1),
    color: '#000000',
    paddingVertical: rem(0.5),
    fontFamily: fonts.roboto.regular,
    lineHeight: em(1.2, rem(1)),
  },
});

export default SearchBar;
