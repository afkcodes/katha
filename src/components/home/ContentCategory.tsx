import { LegendList } from '@legendapp/list';
import type React from 'react';
import { memo, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import ThemedText from '~/components/ThemedText/ThemedText';
import { useI18n } from '~/i18n/useI18n';
import { createStyleFactory, useStaticThemedStyles } from '~/theme';
import type {
  ContentCategory as ContentCategoryType,
  ContentItem as ContentItemType,
} from '~/types/content';
import { ContentItem } from './ContentItem';

interface ContentCategoryProps {
  category: ContentCategoryType;
  scrollProps?: object; // Optional scroll props for horizontal scrolling
}

// Create a style factory for reusable category component styles
const createCategoryStyles = createStyleFactory((theme) => ({
  categoryContainer: {
    marginTop: theme.spacing.xl,
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  categoryList: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.xs,
  },
  titleStyle: {
    color: theme.colors.text,
    letterSpacing: 0.5,
    fontSize: 20,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  seeAllStyle: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: 13,
    letterSpacing: 0.3,
  },
  chevronIcon: {
    marginLeft: 2,
    opacity: 0.8,
  },
}));

const ContentCategoryComponent: React.FC<ContentCategoryProps> = ({ category, scrollProps }) => {
  const styles = useStaticThemedStyles(createCategoryStyles);
  const { t } = useI18n();

  // Memoize limited items to prevent unnecessary slicing on each render
  const limitedItems = useMemo(() => category.items.slice(0, 6), [category.items]);

  // Memoize render function to prevent recreation on each render
  const renderItem = useMemo(
    () =>
      ({ item }: { item: ContentItemType }) => <ContentItem item={item} />,
    []
  );

  // Memoize key extractor
  const keyExtractor = useMemo(() => (item: ContentItemType) => item.id, []);

  return (
    <View style={styles.categoryContainer}>
      <View style={styles.categoryTitleContainer}>
        <ThemedText variant="titleMedium" style={styles.titleStyle}>
          {category.title}
        </ThemedText>
        <TouchableOpacity style={styles.seeAllButton} activeOpacity={0.8}>
          <ThemedText variant="labelMedium" style={styles.seeAllStyle}>
            {t('home.category.seeAll')}
          </ThemedText>
        </TouchableOpacity>
      </View>
      <LegendList
        data={limitedItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        estimatedItemSize={150}
        {...scrollProps}
      />
    </View>
  );
};

// Export memoized component
export const ContentCategory = memo(ContentCategoryComponent);
