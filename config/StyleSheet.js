import { StyleSheet, Text, View, AppRegistry } from "react-native";


export default StyleSheet.create({ 
    container: { 
        marginTop: 25,
        padding: 10
    },
    image: { 
        flex: 1,
        justifyContent: "center" 
    },
    header: {
        fontSize: 20
    }, 
    navItem: {
        flex: 1,
        alignItems: "center",
        padding: 10
    },
    subNavItem: {
        padding: 5
    },
    topic: {
        textAlign: "center",
        fontSize: 15
    }
});
