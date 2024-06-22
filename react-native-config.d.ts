declare module 'react-native-config' {
    export interface NativeConfig {
        API_KEY: string;
        API_BASE_URL:string

    }
    
    export const Config: NativeConfig
    export default Config
  }