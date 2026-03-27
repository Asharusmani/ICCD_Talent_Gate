import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useSegments } from 'expo-router';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

export const JobCard = ({ item }: any) => {

  const segmants = useSegments()
  const route = segmants.includes('(client)') ? `/posted-job/${item.id}}` : `/job/${item.id}`

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push(route)}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>{item.jobTitle[0]}</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.jobTitle}>{item.jobTitle}</Text>
            <View style={styles.postedContainer}>
              <MaterialCommunityIcons name="history" size={14} color="#043A53" />
              <Text style={styles.postedText}>Recently posted</Text>
            </View>
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.tag}>
            <MaterialCommunityIcons name="briefcase-variant" size={16} color="#2D5D63" />
            <Text style={styles.tagText}>{item.jobType}</Text>
          </View>

          <View style={styles.tag}>
            <Ionicons name="location-sharp" size={16} color="#331A13" />
            <Text style={styles.tagText}>{item.country}</Text>
          </View>

          <View style={styles.tag}>
            <View style={styles.iconCircle}>
              <FontAwesome5 name="dollar-sign" size={10} color="#1E293B" />
            </View>
            <Text style={styles.tagText}>{item.payType}</Text>
          </View>

          {/* <View style={styles.tag}>
            <View style={styles.iconCircle}>
              <FontAwesome5 name="dollar-sign" size={10} color="#1E293B" />
            </View>
            <Text style={styles.tagText}>Monthly</Text>
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContent: {
    marginTop: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    backgroundColor: '#1E293B',
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    // flex:1,
    marginTop: 10,
    alignItems: "flex-end",
    // justifyContent:"center"
  },
  logoText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  titleContainer: {
    marginLeft: 15,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  postedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  postedText: {
    fontSize: 13,
    color: '#8A7B7B',
    marginLeft: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    width: '48%',
    marginBottom: 10,
  },
  tagText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  iconCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.2,
    borderColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  }
});