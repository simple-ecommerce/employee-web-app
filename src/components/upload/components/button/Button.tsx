import { ReactNode, useRef } from "react";
import { Button as AntdButton, ButtonProps } from "antd";

export const Button = ({
  children,
  buttonProps,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  children: ReactNode;
  buttonProps?: ButtonProps;
}) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <AntdButton {...buttonProps} onClick={() => ref?.current?.click()}>
      <input ref={ref} hidden type="file" {...props} />
      {children}
    </AntdButton>
  );
};
