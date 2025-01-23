import type React from "react"
import type { OutputData } from "@editorjs/editorjs"
import Output from "editorjs-react-renderer"
import { JSX } from "react"

interface PreviewProps {
  content: {
    title: string
    content: OutputData
    tags: string[]
    coverPhoto: string | null
  }
}

const renderers = {
  header: ({ data }: any) => {
    const Tag = `h${data.level}` as keyof JSX.IntrinsicElements
    return <Tag className="text-2xl font-bold mt-6 mb-4">{data.text}</Tag>
  },
  paragraph: ({ data }: any) => <p className="mb-4">{data.text}</p>,
  list: ({ data }: any) => {
    const ListTag = data.style === "ordered" ? "ol" : "ul"
    return (
      <ListTag className={`${data.style === "ordered" ? "list-decimal" : "list-disc"} list-inside mb-4`}>
        {data.items.map((item: any, index: number) => (
          <li key={index}>{typeof item === "string" ? item : item.content}</li>
        ))}
      </ListTag>
    )
  },
  image: ({ data }: any) => (
    <img src={data.url || "/placeholder.svg"} alt={data.caption || ""} className="my-4 max-w-full h-auto rounded-lg" />
  ),
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
  const parsedContent = typeof content.content === "string" ? JSON.parse(content.content) : content.content

  return (
    <article className="rounded-lg border bg-white p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">{content.title}</h1>

        {content.coverPhoto && (
          <div className="relative mb-8 aspect-[2/1] w-full overflow-hidden rounded-lg">
            <img
              src={content.coverPhoto || "/placeholder.svg"}
              alt={content.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <Output data={parsedContent} renderers={renderers} />
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {content.tags.map((tag) => (
            <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default Preview

