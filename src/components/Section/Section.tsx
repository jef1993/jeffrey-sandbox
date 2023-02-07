interface SectionProps {
  children?: JSX.Element;
  title?: string;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="section">
      <h2 className="section__title">{title}</h2>
      <div className="section__ctn">{children}</div>
    </section>
  );
};

export default Section;
