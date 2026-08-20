export default function GameCanvas({ canvasRef, className }) {
  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
