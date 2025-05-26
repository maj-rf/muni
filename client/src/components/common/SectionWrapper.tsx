import type { PropsWithChildren } from 'react';

export const SectionWrapper = (props: PropsWithChildren) => {
  return <section className="py-4 max-w-[768px] mx-auto">{props.children}</section>;
};
