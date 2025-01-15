import React from 'react';
import { OutputData } from '@editorjs/editorjs';
import { JSX } from 'react';

interface PreviewProps {
  content: {
    title: string;
    content: OutputData;
  };
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
  return (
    <div className="rounded-lg border bg-white p-6">
      <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
      {content.content.blocks.map((block, index) => {
        switch (block.type) {
          case 'header':
            const HeaderTag = `h${block.data.level}` as keyof JSX.IntrinsicElements;
            return <HeaderTag key={index} className="text-2xl font-bold my-4">{block.data.text}</HeaderTag>;
          case 'paragraph':
            return <p key={index} className="my-2">{block.data.text}</p>;
          case 'list':
            const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
            return (
              <ListTag key={index} className="list-inside my-2">
                {block.data.items.map((item: string, itemIndex: number) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ListTag>
            );
          case 'image':
            return (
              <img
                key={index}
                src={block.data.url}
                alt={block.data.caption}
                className="my-4 max-w-full h-auto rounded-lg"
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default Preview;

