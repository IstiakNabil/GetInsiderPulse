import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { mockTrades } from "@/data/mockTrades";

export default function TradeDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const trade = mockTrades.find((t) => t.id === id);
    if (!trade) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFoundText}>Trade not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.companyHeader}>
          <Text style={styles.company}>{trade.company}</Text>
          <Text style={styles.tickerSector}>{trade.ticker} • {trade.sector}</Text>
          <View style={styles.demoBadge}>
            <Text style={styles.demoBadgeText}>FICTIONAL DEMO DATA</Text>
          </View>
        </View>

        <View style={styles.signalCard}>
          <Text style={styles.signalLabel}>{trade.signal}</Text>
          <Text style={styles.signalValue}>
            ${(trade.value / 1000000).toFixed(2)}M fictional demo{" "}
            {trade.type === "purchase" ? "insider buy" : "insider sale"}
          </Text>
        </View>
                <View style={styles.detailGrid}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Insider</Text>
            <Text style={styles.detailValue}>{trade.insider} • {trade.role}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction</Text>
            <Text style={trade.type === "purchase" ? styles.purchaseText : styles.saleText}>
              {trade.type === "purchase" ? "Purchase ▲" : "Sale ▼"} • Code {trade.transactionCode}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Shares</Text>
            <Text style={styles.detailValue}>{trade.shares.toLocaleString()} shares</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Price per share</Text>
            <Text style={styles.detailValue}>${trade.pricePerShare.toFixed(2)} (demo)</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total value</Text>
            <Text style={styles.detailValue}>${(trade.value / 1000000).toFixed(2)}M (demo)</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction date</Text>
            <Text style={styles.detailValue}>{trade.transactionDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Filed date</Text>
            <Text style={styles.detailValue}>{trade.filedAt}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Signal strength</Text>
            <Text style={styles.detailValue}>{trade.signalStrength} • {trade.signal}</Text>
          </View>
        </View>

        {/* Mock 7-day activity chart */}
        <View style={styles.chartSection}>
          <Text style={styles.chartLabel}>Mock 7-day activity</Text>
          <View style={styles.chartBars}>
            {[40, 65, 50, 80, 55, 90, 70].map((height, index) => (
              <View key={index} style={[styles.chartBar, { height }]} />
            ))}
          </View>
        </View>

        <View style={styles.whySection}>
          <Text style={styles.whyTitle}>Why this matters</Text>
          <Text style={styles.whyText}>
            A senior executive transaction can be a data point for further research because it
            shows a disclosed transaction by someone close to the company. It does not reveal the
            person's full financial situation or predict future performance.
          </Text>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            This prototype uses mock data for demonstration only. Insider-trading filings are
            public disclosures and do not constitute investment advice. Past activity does not
            guarantee future stock performance.
          </Text>
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
    paddingBottom: 40,
  },
  notFoundText: {
    color: "#F8FAFC",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
  backButton: {
    color: "#60A5FA",
    fontSize: 15,
  },
  companyHeader: {
    gap: 6,
  },
  company: {
    color: "#F8FAFC",
    fontSize: 22,
    fontWeight: "bold",
  },
  tickerSector: {
    color: "#94A3B8",
    fontSize: 13,
  },
  demoBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#1F2937",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 4,
  },
  demoBadgeText: {
    color: "#CBD5E1",
    fontSize: 10,
    fontWeight: "600",
  },
  signalCard: {
    backgroundColor: "#172033",
    borderRadius: 16,
    padding: 16,
    gap: 6,
  },
  signalLabel: {
    color: "#A78BFA",
    fontSize: 16,
    fontWeight: "bold",
  },
  signalValue: {
    color: "#F8FAFC",
    fontSize: 14,
  },
  detailGrid: {
    backgroundColor: "#172033",
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    color: "#94A3B8",
    fontSize: 13,
  },
  detailValue: {
    color: "#F8FAFC",
    fontSize: 13,
    fontWeight: "600",
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
  chartSection: {
    backgroundColor: "#172033",
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  chartLabel: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "600",
  },
  chartBars: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    height: 90,
  },
  chartBar: {
    flex: 1,
    backgroundColor: "#60A5FA",
    borderRadius: 4,
  },
  whySection: {
    gap: 6,
  },
  whyTitle: {
    color: "#F8FAFC",
    fontSize: 14,
    fontWeight: "600",
  },
  whyText: {
    color: "#CBD5E1",
    fontSize: 13,
    lineHeight: 19,
  },
  disclaimer: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 14,
  },
  disclaimerText: {
    color: "#94A3B8",
    fontSize: 11,
    lineHeight: 16,
  },
});