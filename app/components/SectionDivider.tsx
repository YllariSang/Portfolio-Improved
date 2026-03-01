type SectionDividerProps = {
  label: string;
};

export default function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="mx-auto mt-12 w-full max-w-7xl px-6 md:mt-16">
      <div className="section-divider">
        <span className="section-divider-label">[{label}]</span>
      </div>
    </div>
  );
}
