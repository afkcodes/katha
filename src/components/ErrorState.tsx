import { AlertCircle, RefreshCw, Wifi } from 'lucide-react-native';
import type React from 'react';
import { TouchableOpacity, View } from 'react-native';
import ThemedText from '~/components/ThemedText/ThemedText';
import { createStyleFactory, useColors, useStaticThemedStyles } from '~/theme';
import { s, vs } from '~/utils/screen/screenutils';

interface ErrorStateProps {
  error: Error | null;
  onRetry?: () => void;
  title?: string;
  subtitle?: string;
}

const createErrorStateStyles = createStyleFactory((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
  },
  iconContainer: {
    width: s(80),
    height: s(80),
    borderRadius: s(40),
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    color: theme.colors.textSecondary,
    opacity: 0.7,
    lineHeight: vs(22),
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },
}));

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry, title, subtitle }) => {
  const styles = useStaticThemedStyles(createErrorStateStyles);
  const colors = useColors();

  const isNetworkError = error?.message.includes('connect') || error?.message.includes('Network');

  const defaultTitle = isNetworkError ? 'Connection Error' : 'Something went wrong';

  const defaultSubtitle = isNetworkError
    ? 'Please check your internet connection and try again.'
    : error?.message || 'An unexpected error occurred. Please try again.';

  const IconComponent = isNetworkError ? Wifi : AlertCircle;
  const iconColor = isNetworkError ? colors.error : colors.warning;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <IconComponent size={32} color={iconColor} />
      </View>

      <ThemedText variant="titleLarge" style={styles.title}>
        {title || defaultTitle}
      </ThemedText>

      <ThemedText variant="bodyMedium" style={styles.subtitle}>
        {subtitle || defaultSubtitle}
      </ThemedText>

      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry} activeOpacity={0.8}>
          <RefreshCw size={18} color="white" />
          <ThemedText style={styles.retryButtonText}>Try Again</ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );
};
