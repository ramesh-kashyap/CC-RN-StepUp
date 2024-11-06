
declare module 'react-native-pedometer' {
    export interface StepCountResult {
      steps: number;
    }
  
    export default class Pedometer {
      static isStepCountingAvailableAsync(): Promise<boolean>;
      static watchStepCount(callback: (result: StepCountResult) => void): { remove: () => void };
    }
  }