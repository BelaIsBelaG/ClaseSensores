import React, { useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function CameraScreen() {

    const cameraRef = useRef(null);

    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();

    const [photoUri, setPhotoUri] = useState(null);

    const takePhoto = async () => {
        if (!cameraRef.current) return;

        try {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.7,
            });

            setPhotoUri(photo.uri);

        } catch (error) {
            console.log("Error al tomar la foto:", error);
        }
    };

    const savePhoto = async () => {
        try {

            if (!photoUri) return;

            if (!mediaPermission?.granted) {
                await requestMediaPermission();
            }

            await MediaLibrary.saveToLibraryAsync(photoUri);
            alert("Foto guardada en la galería");

        } catch (error) {
            console.log("Error al guardar la foto:", error);
        }
    };

    if (!cameraPermission) {
        return (
            <View style={styles.container}>
                <Text>Cargando permisos de cámara...</Text>
            </View>
        );
    }

    if (!cameraPermission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.permissionText}>
                    Necesitamos permiso para acceder a la cámara.
                </Text>

                <Pressable
                    style={styles.actionButton}
                    onPress={requestCameraPermission}
                >
                    <Text style={styles.actionButtonText}>Permitir cámara</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            {!photoUri ? (
                <>
                    <CameraView
                        ref={cameraRef}
                        style={styles.camera}
                        facing="back"
                    />

                    <View style={styles.controls}>
                        <Pressable
                            style={styles.actionButton}
                            onPress={takePhoto}
                        >
                            <Text style={styles.actionButtonText}>Tomar foto</Text>
                        </Pressable>
                    </View>
                </>
            ) : (
                <>
                    <Image source={{ uri: photoUri }} style={styles.preview} />

                    <View style={styles.controls}>

                        <Pressable
                            style={styles.secondaryButton}
                            onPress={() => setPhotoUri(null)}
                        >
                            <Text style={styles.actionButtonText}>
                                Tomar otra
                            </Text>
                        </Pressable>

                        <Pressable
                            style={styles.actionButton}
                            onPress={savePhoto}
                        >
                            <Text style={styles.actionButtonText}>
                                Guardar en galería
                            </Text>
                        </Pressable>

                    </View>
                </>
            )}

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

    permissionText: {
        textAlign: "center",
        fontSize: 16,
        marginBottom: 20
    },

    camera: {
        flex: 1,
        borderRadius: 14,
        overflow: "hidden",
    },

    preview: {
        flex: 1,
        borderRadius: 14,
    },

    controls: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
        marginTop: 20,
    },

    actionButton: {
        backgroundColor: "#2563EB",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 14,
        alignItems: "center",
    },

    secondaryButton: {
        backgroundColor: "#374151",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 14,
        alignItems: "center",
    },

    actionButtonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 15,
    }

});