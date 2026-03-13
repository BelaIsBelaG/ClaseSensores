import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hardware del Dispositivo</Text>
            <Text style={styles.subtitle}>En esta clase exploraremos dos capacidades reales de una app móvil:
                La cámara y los sensores del dispositivo.
            </Text>

            <Pressable style={styles.button}
                onPress={() => navigation.navigate("Camera")}>
                <Text style={styles.buttonText}>Ir a cámara</Text>
            </Pressable>

            <Pressable style={styles.buttonSecondary}
                onPress={() => navigation.navigate("Sensor")}>
                <Text style={styles.buttonText}>Ir a sensores</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        gap: 14,
        backgroundColor: "#F6F7FB"
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        textAlign: "center",
    },

    subtitle: {
        fontSize: 14,
        textAlign: "center",
        opacity: 0.75,
        lineHeight: 20,
        marginBottom: 10,
    },

    button: {
        backgroundColor: "#111827",
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
    },

    buttonSecondary: {
        backgroundColor: "#374151",
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
    },

    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 15,
    }
});
