import { navigate } from '../app/router.js'
import { portfolio } from '../data/portfolio.js'

function LicensePage() {
  return (
    <section className="license-page" aria-labelledby="license-title">
      <h1 id="license-title">License</h1>
      <p>This portfolio is a modified public-interface implementation. Clyde’s content, local assets, and route structure are maintained here as a GPL-3.0-only work.</p>
      <p>It is distributed under the <strong>{portfolio.license.identifier}</strong>. There is no warranty for this work, to the extent permitted by law.</p>
      <p>The preferred source for modifying and running this portfolio is available in the public source repository. Upstream and local attribution notices are retained in the repository-root NOTICE.md.</p>
      <ul>
        <li><a href={portfolio.license.sourceUrl} target="_blank" rel="noreferrer">Public source repository</a></li>
        <li><a href="/LICENSE.txt">Read the local GPL-3.0 license text</a></li>
        <li><a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" rel="noreferrer">Read the GNU GPL v3 text</a></li>
      </ul>
      <button type="button" onClick={() => navigate('/')}>Back to home</button>
    </section>
  )
}

export default LicensePage
