interface PullquoteBlockProps {
  text: string
  attribution?: string
}

export function PullquoteBlockComponent({ text, attribution }: PullquoteBlockProps) {
  return (
    <blockquote className="pull-quote relative my-12 ml-6 sm:ml-10 pl-6 sm:pl-8 border-l-[3px] border-blue-500 py-3">
      <p className="text-xl sm:text-2xl font-extrabold text-slate-800 leading-snug tracking-tight">{text}</p>
      {attribution && (
        <cite className="block mt-3 text-sm text-slate-500 not-italic font-medium">— {attribution}</cite>
      )}
    </blockquote>
  )
}
