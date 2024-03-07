import { PropsWithChildren } from "react";
import { H2 } from "../typography";
import HStack from "../layouts/h-stack";

interface FormSectionProps {
  title?: string;
  description: string;
}
export default function FormSection({
  title,
  description,
  children,
}: PropsWithChildren<FormSectionProps>) {
  return (
    <HStack wFull responsive>
      <div className="space-y-1 p-5 md:w-[200px] md:shrink-0 lg:w-1/3 xl:w-1/4">
        {title && <H2>{title}</H2>}
        {description && <p className="text-xs text-slate-400">{description}</p>}
      </div>
      <div className="w-full space-y-4 p-6">{children}</div>
    </HStack>
  );
}
