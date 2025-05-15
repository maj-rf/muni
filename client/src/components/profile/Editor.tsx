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
import { useRef } from 'react';
import '@mdxeditor/editor/style.css';

const markdown = `
# Hello World

Grocery List
- Apple
- Orange

The overriding design goal for Markdown's formatting syntax is to make it as readable as possible.
The idea is that a Markdown-formatted document should be publishable as-is, as plain text,
without looking like it's been marked up with tags or formatting instructions.

\`This is an inline code example\`

Below is a code block:
\`\`\`js
const red = "red";
\`\`\`
`;

export const Editor = () => {
  const ref = useRef<MDXEditorMethods>(null);

  return (
    <MDXEditor
      className="mt-8 bg-amber-50 dark:bg-gray-100 w-full max-w-fit mx-auto rounded-2xl "
      ref={ref}
      contentEditableClassName="prose"
      markdown={markdown}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper>
              <UndoRedo />
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
              <CreateLink />
              <ListsToggle />
              <CodeToggle />
              <InsertCodeBlock />
              <InsertThematicBreak />
              <InsertImage />
            </DiffSourceToggleWrapper>
          ),
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
        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
        markdownShortcutPlugin(),
      ]}
    />
  );
};
