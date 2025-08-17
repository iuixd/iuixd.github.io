import React from "react";
import SocialLinks from './SocialLinks';

export default function footer() {
  return (
    <section className="footer">
      <SocialLinks size="12px" gap="12px" minTarget={32} />
      <p>© 2025 srikumar.design</p>
    </section>
  );
}
