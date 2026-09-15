import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { mockTrades } from "@/data/mockTrades";

export default function ScreenerScreen() {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedRole, setSelectedRole] = useState("All roles");
  const [selectedValue, setSelectedValue] = useState("Any");
   
    const clearFilters = () => {
    setSearchText("");
    setSelectedType("All");
    setSelectedRole("All roles");
    setSelectedValue("Any");
  };

   const filteredTrades = mockTrades.filter((trade) => {
    const matchesSearch =
      trade.ticker.toLowerCase().includes(searchText.toLowerCase()) ||
      trade.company.toLowerCase().includes(searchText.toLowerCase());

    const matchesType =
      selectedType === "All" ||
      (selectedType === "Purchases" && trade.type === "purchase") ||
      (selectedType === "Sales" && trade.type === "sale");

    const matchesRole =
      selectedRole === "All roles" || trade.role === selectedRole;

    const matchesValue =
      selectedValue === "Any" ||
      (selectedValue === "$100K+" && trade.value >= 100000) ||
      (selectedValue === "$500K+" && trade.value >= 500000) ||
      (selectedValue === "$1M+" && trade.value >= 1000000);

    return matchesSearch && matchesType && matchesRole && matchesValue;
  });

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Screener</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search ticker or company"
        placeholderTextColor="#94A3B8"
        value={searchText}
        onChangeText={setSearchText}
      />

            <View style={styles.filterGroup}>
        {["All", "Purchases", "Sales"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.chip, selectedType === option && styles.chipActive]}
            onPress={() => setSelectedType(option)}
          >
            <Text style={[styles.chipText, selectedType === option && styles.chipTextActive]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.filterGroup}>
        {["All roles", "CEO", "CFO", "Director"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.chip, selectedRole === option && styles.chipActive]}
            onPress={() => setSelectedRole(option)}
          >
            <Text style={[styles.chipText, selectedRole === option && styles.chipTextActive]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.filterGroup}>
        {["Any", "$100K+", "$500K+", "$1M+"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.chip, selectedValue === option && styles.chipActive]}
            onPress={() => setSelectedValue(option)}
          >
            <Text style={[styles.chipText, selectedValue === option && styles.chipTextActive]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.resultCount}>{filteredTrades.length} results</Text>

            <FlatList
        data={filteredTrades}
        keyExtractor={(trade) => trade.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item: trade }) => (
          <TouchableOpacity
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
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No fictional demo trades match those filters.</Text>
            <TouchableOpacity onPress={clearFilters}>
              <Text style={styles.clearFiltersText}>Clear filters</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1220",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  backButton: {
    color: "#60A5FA",
    fontSize: 15,
  },
  headerTitle: {
    color: "#F8FAFC",
    fontSize: 20,
    fontWeight: "bold",
  },
  searchInput: {
    backgroundColor: "#172033",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#F8FAFC",
    fontSize: 14,
    marginBottom: 12,
  },
  filterGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  chip: {
    backgroundColor: "#172033",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chipActive: {
    backgroundColor: "#60A5FA",
  },
  chipText: {
    color: "#CBD5E1",
    fontSize: 12,
  },
  chipTextActive: {
    color: "#0B1220",
    fontWeight: "600",
  },
  resultCount: {
    color: "#94A3B8",
    fontSize: 13,
    marginVertical: 8,
  },
  listContent: {
    paddingBottom: 24,
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
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
    gap: 10,
  },
  emptyText: {
    color: "#94A3B8",
    fontSize: 14,
    textAlign: "center",
  },
  clearFiltersText: {
    color: "#60A5FA",
    fontSize: 14,
    fontWeight: "600",
  },
});
