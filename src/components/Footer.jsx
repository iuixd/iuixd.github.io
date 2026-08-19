import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import SocialLinks from './SocialLinks';

const FooterRacingGame = lazy(() => import('./footer-racing-game/FooterRacingGame'));

export default function Footer({ withGame = false }) {
  const sentinelRef = useRef(null);
  const [shouldLoadGame, setShouldLoadGame] = useState(false);

  useEffect(() => {
    if (!withGame || shouldLoadGame) return undefined;
    const node = sentinelRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShouldLoadGame(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadGame(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1000px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [withGame, shouldLoadGame]);

  return (
    <section className="footer">
      {withGame && (
        <>
          {!shouldLoadGame && <div ref={sentinelRef} aria-hidden="true" />}
          {shouldLoadGame && (
            <Suspense fallback={<div aria-hidden="true" />}>
              <FooterRacingGame />
            </Suspense>
          )}
        </>
      )}
      <SocialLinks size="12px" gap="12px" minTarget={32} />
      <p>© 2026 srikumar.design</p>
    </section>
  );
}
