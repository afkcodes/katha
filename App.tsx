import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider, useColors } from './src/theme';

function AppContent() {
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Welcome to Katha</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Explore the rich world of Indian mythology through Ramayana, Mahabharata, and ancient tales
      </Text>

      {/* Background demonstration */}
      <View style={[styles.surfaceCard, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Dark Theme Preview</Text>
        <Text style={[styles.cardDescription, { color: colors.textTertiary }]}>
          Pure black background with vibrant colors
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <View style={[styles.mythCard, { backgroundColor: colors.divine }]}>
          <Text style={[styles.cardText, { color: colors.textOnPrimary }]}>Divine</Text>
        </View>
        <View style={[styles.mythCard, { backgroundColor: colors.heroic }]}>
          <Text style={[styles.cardText, { color: colors.textOnPrimary }]}>Heroic</Text>
        </View>
        <View style={[styles.mythCard, { backgroundColor: colors.celestial }]}>
          <Text style={[styles.cardText, { color: colors.textOnPrimary }]}>Celestial</Text>
        </View>
        <View style={[styles.mythCard, { backgroundColor: colors.accent }]}>
          <Text style={[styles.cardText, { color: colors.text }]}>Sacred</Text>
        </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 24,
  },
  surfaceCard: {
    padding: 20,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 16,
    width: '100%',
    maxWidth: 300,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    marginTop: 32,
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  mythCard: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
