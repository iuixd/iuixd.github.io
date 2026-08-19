export default function GameCanvas({ canvasRef, className }) {
  return <canvas ref={canvasRef} className={className} role="img" aria-hidden="true" />;
}
