import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { mockTrades } from "@/data/mockTrades";

export default function HomeScreen() {
  const router = useRouter();
  const totalTransactions = mockTrades.length;
  const totalPurchaseValue = mockTrades
    .filter((trade) => trade.type === "purchase")
    .reduce((sum, trade) => sum + trade.value, 0);

  const totalSaleValue = mockTrades
    .filter((trade) => trade.type === "sale")
    .reduce((sum, trade) => sum + trade.value, 0);

  const latestTrades = mockTrades.slice(0, 4);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Market Pulse</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Fictional demo data</Text>
        </View>
      </View>

      {/* Search bar - tapping it goes to Screener */}
      <TouchableOpacity onPress={() => router.push("/screener")}>
        <View style={styles.searchBar}>
          <Text style={styles.searchPlaceholder}>Search ticker or company</Text>
        </View>
      </TouchableOpacity>

      {/* Summary cards */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{totalTransactions}</Text>
          <Text style={styles.summaryLabel}>Transactions</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>${(totalPurchaseValue / 1000000).toFixed(1)}M</Text>
          <Text style={styles.summaryLabel}>Purchase value</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>${(totalSaleValue / 1000000).toFixed(1)}M</Text>
          <Text style={styles.summaryLabel}>Sale value</Text>
        </View>
      </View>
      {/* Top Signal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Signals Today</Text>
        <View style={styles.signalsRow}>
          <View style={styles.signalChip}>
            <Text style={styles.signalChipText}>Large CEO Purchase</Text>
          </View>
          <View style={styles.signalChip}>
            <Text style={styles.signalChipText}>Cluster Buy</Text>
          </View>
          <View style={styles.signalChip}>
            <Text style={styles.signalChipText}>Executive Sale</Text>
          </View>
        </View>
      </View>

      {/* Latest Activity */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Latest Activity</Text>
          <TouchableOpacity onPress={() => router.push("/screener")}>
            <Text style={styles.viewAllLink}>View all</Text>
          </TouchableOpacity>
        </View>

        {latestTrades.map((trade) => (
          <TouchableOpacity
            key={trade.id}
            style={styles.tradeCard}
            onPress={() => router.push(`/trade/${trade.id}`)}
          >
            <View style={styles.tradeCardLeft}>
              <Text style={styles.tradeTicker}>{trade.ticker}</Text>
              <Text style={styles.tradeCompany}>{trade.company}</Text>
              <Text style={styles.tradeMeta}>{trade.insider} • {trade.role}</Text>
            </View>
            <View style={styles.tradeCardRight}>
              <Text style={trade.type === "purchase" ? styles.purchaseText : styles.saleText}>
                {trade.type === "purchase" ? "▲ Purchase" : "▼ Sale"}
              </Text>
              <Text style={styles.tradeValue}>${(trade.value / 1000).toFixed(0)}K</Text>
              <View style={styles.strengthBadge}>
                <Text style={styles.strengthText}>{trade.signalStrength}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      </ScrollView> 
      </SafeAreaView>
  );
}

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1220",
  },
  content: {
    padding: 16,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "#F8FAFC",
    fontSize: 24,
    fontWeight: "bold",
  },
  badge: {
    backgroundColor: "#1F2937",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#CBD5E1",
    fontSize: 11,
  },
  searchBar: {
    backgroundColor: "#172033",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  searchPlaceholder: {
    color: "#CBD5E1",
    fontSize: 14,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#172033",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
  },
  summaryValue: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "bold",
  },
  summaryLabel: {
    color: "#CBD5E1",
    fontSize: 11,
    marginTop: 4,
    textAlign: "center",
  },
  section: {
    gap: 10,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "600",
  },
  viewAllLink: {
    color: "#60A5FA",
    fontSize: 13,
  },
  signalsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  signalChip: {
    backgroundColor: "#1F2937",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  signalChipText: {
    color: "#A78BFA",
    fontSize: 12,
  },
  tradeCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#172033",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  tradeCardLeft: {
    gap: 2,
  },
  tradeCardRight: {
    alignItems: "flex-end",
    gap: 2,
  },
  tradeTicker: {
    color: "#F8FAFC",
    fontSize: 15,
    fontWeight: "bold",
  },
  tradeCompany: {
    color: "#CBD5E1",
    fontSize: 12,
  },
  tradeMeta: {
    color: "#94A3B8",
    fontSize: 11,
  },
  purchaseText: {
    color: "#22C55E",
    fontSize: 13,
    fontWeight: "600",
  },
  saleText: {
    color: "#EF4444",
    fontSize: 13,
    fontWeight: "600",
  },
  tradeValue: {
    color: "#F8FAFC",
    fontSize: 13,
  },
  strengthBadge: {
    backgroundColor: "#0B1220",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  strengthText: {
    color: "#CBD5E1",
    fontSize: 10,
  },
});
      