import LeadForm from "./LeadForm";

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="section-header">
        <span className="section-tag">Get Started</span>
        <h2 id="contact-heading" className="section-title">
          Tell Us <span className="gradient-text">What You Want to Build</span>
        </h2>
        <p className="section-desc">
          Reach the Founder Workspace directly. We&rsquo;ll follow up by email.
        </p>
      </div>
      <div className="contact-container">
        <LeadForm />
      </div>
    </section>
  );
}
