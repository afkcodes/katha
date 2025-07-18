import type React from 'react';
import { View } from 'react-native';
import { SafeAreaAwareView } from '~/components';
import ThemedText from '~/components/ThemedText/ThemedText';
import { useI18n } from '~/i18n/useI18n';
import { createStyleFactory, useStaticThemedStyles } from '~/theme';

const createSettingsStyles = createStyleFactory((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  title: {
    marginBottom: theme.spacing.xl,
    color: theme.colors.text,
  },
}));

const Settings: React.FC = () => {
  const { t } = useI18n();
  const styles = useStaticThemedStyles(createSettingsStyles);

  return (
    <SafeAreaAwareView
      useSafeArea={true}
      applyTopInset={true}
      applyBottomInset={true}
      useThemedBackground={true}
    >
      <View style={styles.container}>
        <ThemedText variant="headlineLarge" style={styles.title}>
          {t('settings.title')}
        </ThemedText>
      </View>
    </SafeAreaAwareView>
  );
};

export default Settings;
