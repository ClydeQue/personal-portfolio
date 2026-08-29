function EditorialPanel({ children, className = '', label, title }) {
  return (
    <section className={`jstn-panel ${className}`.trim()}>
      {(label || title) && (
        <div className="jstn-panel__heading">
          {label && <p className="jstn-eyebrow">{label}</p>}
          {title && <h2>{title}</h2>}
        </div>
      )}
      {children}
    </section>
  )
}

export default EditorialPanel
