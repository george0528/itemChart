export interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
}