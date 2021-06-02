export interface FormFieldWrapperComponentProps {
  errors: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: { [key: string]: any };
  label: string;
  name: string;
}
