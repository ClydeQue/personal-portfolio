function RichText({ paragraph }) {
  return <>{paragraph.segments.map(({ text, emphasis }, index) => emphasis
    ? <strong key={`${text}-${index}`}>{text}</strong>
    : <span key={`${text}-${index}`}>{text}</span>)}</>
}

export default RichText
