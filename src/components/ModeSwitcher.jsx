const modes = [
  { id: 'original', label: 'Original' },
  { id: 'jstn', label: 'JSTN' },
]

function ModeSwitcher({ mode, onChange, compact = false }) {
  return (
    <div
      className={`mode-switcher${compact ? ' mode-switcher--compact' : ''}`}
      aria-label="Portfolio presentation mode"
      role="group"
    >
      {modes.map(({ id, label }) => (
        <button
          aria-label={`Switch to ${label} portfolio mode`}
          aria-pressed={mode === id}
          className="mode-switcher__button"
          key={id}
          onClick={() => onChange(id)}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default ModeSwitcher
