import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { formatDate } from "@/functions/date-format";
import { useSegments, router } from 'expo-router';

export const ProjectCard = ({ item }: any) => {

  const segmants = useSegments()
  const route = segmants.includes('(client)') ? `/posted-project/${item.id}}` : `/project/${item.id}`

  return (
    <TouchableOpacity
      key={item.id}
      activeOpacity={0.8}
      onPress={() =>
        router.push(route)
      }
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.title[0]}</Text>
          </View>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            {/* <Text style={styles.project}>{item.project}</Text> */}
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.section}>
            <Text style={styles.label}>BUDGET</Text>
            <Text style={styles.value}>
              <FontAwesome name="dollar" size={14} /> {item.budget}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>DEADLINE</Text>
            <Text style={styles.value}>
              <MaterialCommunityIcons name="calendar" size={14} />{" "}
              {formatDate(item.deadline) || 'N/A'}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.section}>
            <Text style={styles.label}>CATEGORY</Text>
            <Text style={styles.value}>{item.category}</Text>
          </View>
          {/* <View style={styles.section}>
                    <Text style={styles.label}>STATUS</Text>
                    <Text style={styles.value}>{project.status}</Text>
                  </View> */}
        </View>


      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  cardContainer: {
    marginTop: 20
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonContainer: {
    // flex:1,
    marginTop: 10,
    alignItems: "flex-end",
    // justifyContent:"center"
  },
  avatar: {
    backgroundColor: "#2c3e50",
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  title: {
    flexDirection: "row",
    fontSize: 16,
    fontWeight: "600",
  },
  project: {
    fontSize: 12,
    color: "#777",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  section: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    color: "#999",
    marginTop: 12,
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 2,
  },
});