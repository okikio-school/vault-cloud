"use client";

import { useEffect } from "react";
import { BlockNoteEditor, type Block } from "@blocknote/core";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";

// import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { throttle } from "@/lib/throttle";
import "@blocknote/core/style.css";

export default function Editor({ markdown, setMarkdown }: { markdown?: string, setMarkdown: (data: string) => void }) {
  // Creates a new editor instance.
  const editor: BlockNoteEditor = useCreateBlockNote();
  editor.onEditorContentChange(throttle(async () => { 
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    setMarkdown(markdown);
  }, 300));

  useEffect(() => {
    if (editor && markdown) {
      // Whenever the current Markdown content changes, converts it to an array
      // of Block objects and replaces the editor's content with them.
      const getBlocks = async () => {
        const blocks: Block[] = await editor.tryParseMarkdownToBlocks(markdown);
        editor.replaceBlocks(editor.document, blocks);
      };
      getBlocks();
    }
  }, []);

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} theme={"light"} />;
}
