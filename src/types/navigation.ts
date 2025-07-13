import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Book } from './Book';

export type RootStackParamList = {
  Explore: undefined;
  Search: { book?: Book; from?: string};
  BookDetail: { book: Book;   from?: string};
};

export type ExploreScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Explore'>;
export type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Search'>;
export type BookDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BookDetail'>;

export type BookDetailScreenRouteProp = RouteProp<RootStackParamList, 'BookDetail'>;