export default function EmploymentCertificate({ certificate }) {
  return <a className="employment-certificate" href={certificate.image} target="_blank" rel="noopener noreferrer">
    <img src={certificate.image} alt="Employment certificate for Kenneth Clyde A. Que as Full Stack Developer" width="1654" height="2339" loading="lazy" />
    <span className="employment-certificate__copy">
      <strong>{certificate.title}</strong>
      <span>{certificate.issuer}</span>
      <span>{certificate.period}</span>
      <span className="employment-certificate__action">View certificate <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></span>
    </span>
  </a>
}
