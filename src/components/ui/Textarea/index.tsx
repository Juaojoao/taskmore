import clsx from "clsx";
import { TextareaHTMLAttributes } from "react";

export const Textarea = ({
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      {...rest}
      className={clsx(
        "border-2  rounded-md w-full h-56 p-4 transition-all ease-in-out",
        rest.className
      )}
    />
  );
};
