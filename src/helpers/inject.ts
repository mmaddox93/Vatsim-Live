/* eslint-disable @typescript-eslint/no-unused-vars */
import { VueConstructor } from 'vue';

export function makeInjector<TProvider>() {
  // eslint-disable-next-line max-len
  return <V extends Vue, K extends keyof TProvider>(v: VueConstructor<V>, properties: K[]) => v as VueConstructor<V & Pick<TProvider, K>>;
}

export function makePropertySelector<TProvider>() {
  return <K extends keyof TProvider>(properties: K[]) => properties;
}
