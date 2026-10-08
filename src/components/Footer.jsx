import React from "react";
import SocialLinks from './SocialLinks';
import TrainParticleFooter from "./TrainParticleFooter";
import FooterRacingGame from './footer-racing-game/FooterRacingGame';

export default function Footer({ withGame = false, gameEnabled = true }) {
  return (
    <section className={`footer${withGame ? "" : " footer-subpage"}`}>
      {withGame && gameEnabled && <FooterRacingGame />}
      <SocialLinks size="12px" gap="12px" minTarget={32} />
      <p>© 2026 srikumar.design</p>
      <div
        style={{
          width: "100%",
          height: "auto",
          // Cancel the footer's 24px flex gap only for the artwork so it begins
          // immediately after the copyright line.
          marginTop: "-24px",
        }}
      >
        <TrainParticleFooter
          imageSrc="/assets/tajmahal-clean-reference.png"
          desktopGap={3}
          mobileGap={4}
        />
      </div>
    </section>
  );
}
