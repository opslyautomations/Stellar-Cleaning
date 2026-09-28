/** 1px hairline with the 48px sky-blue segment at the left gutter. */
export default function Rule({ className }: { className?: string }) {
  return <hr className={className ? `rule ${className}` : "rule"} />;
}
