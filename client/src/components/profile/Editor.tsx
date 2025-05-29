import {
  MDXEditor,
  diffSourcePlugin,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  listsPlugin,
  linkDialogPlugin,
  linkPlugin,
  quotePlugin,
  thematicBreakPlugin,
  type MDXEditorMethods,
  headingsPlugin,
  toolbarPlugin,
  UndoRedo,
  imagePlugin,
  InsertImage,
  codeBlockPlugin,
  codeMirrorPlugin,
  InsertCodeBlock,
  markdownShortcutPlugin,
  ListsToggle,
  InsertThematicBreak,
  DiffSourceToggleWrapper,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

export const Editor = ({
  ref,
  onBlur,
  value,
  initialMD,
}: {
  ref: React.RefObject<MDXEditorMethods | null>;
  onBlur: () => void;

  value: string;
  initialMD: string;
}) => {
  return (
    <MDXEditor
      ref={ref}
      onBlur={onBlur}
      contentEditableClassName="prose"
      markdown={value}
      toMarkdownOptions={{
        bullet: '+',
        emphasis: '_',
      }}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper>
              <div className="flex flex-wrap gap-1">
                <UndoRedo />
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
                <CreateLink />
                <ListsToggle />
                <CodeToggle />
                <InsertCodeBlock />
                <InsertThematicBreak />
                <InsertImage />
              </div>
            </DiffSourceToggleWrapper>
          ),
          toolbarClassName: 'toolbar',
        }),
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        thematicBreakPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' },
        }),

        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: initialMD }),
        markdownShortcutPlugin(),
      ]}
    />
  );
};
