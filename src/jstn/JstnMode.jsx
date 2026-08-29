// Task 3 owns the JSTN visual implementation. This is only the lazy mount seam
// required for the shared mode shell to build and route safely today.
function JstnMode({ pathname }) {
  return (
    <main className="jstn-mode-placeholder" aria-label="JSTN portfolio">
      <p>JSTN portfolio mode: {pathname}</p>
    </main>
  )
}

export default JstnMode
