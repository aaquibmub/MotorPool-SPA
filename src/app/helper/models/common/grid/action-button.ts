export class ActionButton {
  handle: (args?: any) => void;
  icon: string;
  label: string;
  buttons?: ActionButton[];
}
