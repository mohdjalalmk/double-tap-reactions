import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { DoubleTapReaction } from "react-native-double-tap-reaction";
import { Ionicons } from "@expo/vector-icons"; // for heart & comment icons

export default function Example1() {
  const posts = [
    {
      id: "1",
      user: "alice",
      image: "https://picsum.photos/id/1011/400/400",
      emoji: "❤️",
      title: "Beautiful sunset!",
    },
    {
      id: "2",
      user: "bob",
      image: "https://picsum.photos/id/1012/400/400",
      emoji: "🔥",
      title: "Exploring the mountains",
    },
    {
      id: "3",
      user: "charlie",
      image: "https://picsum.photos/id/1013/400/400",
      emoji: "😂",
      title: "Funny moment captured",
    },
    {
      id: "4",
      user: "diana",
      image: "https://picsum.photos/id/1014/400/400",
      emoji: "👍",
      title: "Nice place to chill",
    },
  ];

  // simple state to remember liked posts
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const [reactions, setReactions] = useState<{ [id: string]: string }>({});

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <View style={styles.postContainer}>
            {/* Post header */}
            <View style={styles.header}>
              <Image
                source={{ uri: "https://i.pravatar.cc/40?img=" + item.id }}
                style={styles.avatar}
              />
              <Text style={styles.username}>{item.user}</Text>
            </View>

            {/* Post image with double tap reaction */}
            <DoubleTapReaction
              type="fade"
              emojiComponent={<Text style={styles.emoji}>{item.emoji}</Text>}
              onDoubleTap={() => {
                setReactions((prev) => ({ ...prev, [item.id]: item.emoji }));
              }}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
            </DoubleTapReaction>

            {/* Actions row */}
            <View style={styles.actions}>
              {/* reaction slot */}
              <View style={styles.reactionSlot}>
                {reactions[item.id] ? (
                  <Text style={styles.reactionText}>{reactions[item.id]}</Text>
                ) : (
                  <Text style={styles.reactionPlaceholder}>+</Text>
                )}
              </View>
              <TouchableOpacity>
                <Ionicons
                  name="chatbubble-outline"
                  size={26}
                  style={styles.commentIcon}
                />
              </TouchableOpacity>
            </View>

            {/* Caption */}
            <Text style={styles.title}>{item.title}</Text>

            {/* Placeholder comments */}
            <Text style={styles.comments}>View all comments</Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
  },
  image: {
    width: "100%",
    height: 300,
  },
  emoji: {
    fontSize: 80,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    marginTop: 8,
  },
  commentIcon: {
    marginLeft: 12,
  },
  title: {
    paddingHorizontal: 8,
    marginTop: 4,
    fontWeight: "500",
  },
  comments: {
    paddingHorizontal: 8,
    marginTop: 2,
    color: "gray",
  },
  reactionSlot: {
    marginLeft: 12,
  },
  reactionText: {
    fontSize: 24,
  },
  reactionPlaceholder: {
    fontSize: 24,
    color: "gray",
  },
});
