import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { useEffect, useState } from "react";



export const useCustomNetInfo = () => {

    const [netState, setNetStat] = useState<NetInfoState>()
    const [refresh, setRefresh] = useState<Boolean>()

    const handleRefreshPress = () => {
        setRefresh(currentState => !currentState)
    }

    useEffect(() => {
        NetInfo.fetch().then((state) => {
            console.log('netState :', state)

            setNetStat(state);
        });
        const unsubscribe = NetInfo.addEventListener((state) => {
            setNetStat(state);
        });
        return () => {
            unsubscribe();
        };
    }, [refresh]);

    return {
        netState, handleRefreshPress

    }

}