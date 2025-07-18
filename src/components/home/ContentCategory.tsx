import type React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import ThemedText from '~/components/ThemedText/ThemedText';
import { useI18n } from '~/i18n/useI18n';
import { createStyleFactory, useStaticThemedStyles } from '~/theme';
import type { ContentCategory as ContentCategoryType } from '~/types/content';
import { ContentItem } from './ContentItem';

interface ContentCategoryProps {
  category: ContentCategoryType;
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
    paddingHorizontal: theme.spacing.lg,
  },
  categoryList: {
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.md,
  },
  titleStyle: {
    color: theme.colors.text,
    letterSpacing: 0.5,
    fontSize: 20,
  },
  seeAllStyle: {
    color: theme.colors.primary,
    marginLeft: theme.spacing.xs,
    fontWeight: '600',
  },
}));

export const ContentCategory: React.FC<ContentCategoryProps> = ({ category }) => {
  const styles = useStaticThemedStyles(createCategoryStyles);
  const { t } = useI18n();

  return (
    <View style={styles.categoryContainer}>
      <View style={styles.categoryTitleContainer}>
        <ThemedText variant="titleMedium" style={styles.titleStyle}>
          {category.title}
        </ThemedText>
        <TouchableOpacity activeOpacity={0.7}>
          <ThemedText variant="labelMedium" style={styles.seeAllStyle}>
            {t('home.category.seeAll')}
          </ThemedText>
        </TouchableOpacity>
      </View>
      <FlatList
        data={category.items}
        renderItem={({ item }) => <ContentItem item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={150} // Adjust based on item width + margin
        initialNumToRender={5} // Optimize initial render
        maxToRenderPerBatch={10} // Optimize batch rendering
      />
    </View>
  );
};
