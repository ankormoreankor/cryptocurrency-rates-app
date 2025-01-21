import { observer } from "mobx-react-lite";
import { View, Text, FlatList } from "react-native";
import { useEffect } from "react";
import { ratesStore } from "../../../shared/stores/RatesStore";

const CryptoList = observer(() => {
  useEffect(() => {
    ratesStore.fetchCoins();
  }, []);

  return (
    <View>
      {ratesStore.isLoading ? (
        <Text>Loading...</Text>
      ) : (
        false
        // <FlatList
        //   data={ratesStore.coins}
        //   keyExtractor={(item) => item.symbol}
        //   renderItem={({ item }) => (
        //     <Text>
        //       {item.name}: {item.rate} USD
        //     </Text>
        //   )}
        // />
      )}
    </View>
  );
});
