import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Accelerometer } from "expo-sensors";

export default function SensorScreen() {
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    //RETO 2: SENSOR DE MOVIMIENTO
    //detección de movimiento
    const isMoving =
        Math.abs(data.x) > 1 ||
        Math.abs(data.y) > 1 ||
        Math.abs(data.z) > 1;

    useEffect(() => {
        Accelerometer.setUpdateInterval(500);

        const subscription = Accelerometer.addListener((accelerometerData) => {
            setData(accelerometerData);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Acelerómetro</Text>
            <Text style={styles.subtitle}>Mueve el dispositivo y observa como cambian los valores.
            </Text>

            <View style={styles.card}>
                <Text style={styles.label}>Eje X</Text>
                <Text style={styles.value}>
                    {data.x.toFixed(3)}
                </Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.label}>Eje Y</Text>
                <Text style={styles.value}>
                    {data.y.toFixed(3)}
                </Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.label}>Eje Z</Text>
                <Text style={styles.value}>
                    {data.z.toFixed(3)}
                </Text>
            </View>
            {/*Agregamos otro view para mostrar si el dispositivo está o no en movimiento*/}
            <View style={styles.card}>
                <Text style={styles.label}>Estado del dispositivo</Text>
                <Text style={styles.value}>
                    {isMoving ? "Dispositivo en movimiento" : "Dispositivo estable"}
                </Text>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F7FB",
        padding: 20,
        justifyContent: "center",
        gap: 14,
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        textAlign: "center",
    },

    subtitle: {
        fontSize: 14,
        textAlign: "center",
        opacity: 0.7,
        marginBottom: 16,
    },

    card: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    label: {
        fontSize: 13,
        opacity: 0.7,
    },

    value: {
        fontSize: 24,
        fontWeight: "800",
        marginTop: 6,
    },
})
