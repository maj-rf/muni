import MDEditor from '@uiw/react-md-editor/nohighlight';
import { ControllerRenderProps } from 'react-hook-form';

export const Editor = ({
  field,
}: {
  field: ControllerRenderProps<
    {
      title: string;
      content: string;
      imgUrl?: string | undefined;
      published?: boolean | undefined;
    },
    'content'
  >;
}) => {
  return (
    <div>
      <MDEditor value={field.value} onChange={field.onChange} height={400} preview="edit" />
    </div>
  );
};
