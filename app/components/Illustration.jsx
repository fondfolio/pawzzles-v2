export function Illustration({src, width}) {
  return (
    <div className="Section--Image">
      <section className="Image Global__Section">
        <img
          srcSet=""
          sizes="(min-width: 1200px) 1100px, (min-width: 750px) calc(100vw - 100px), calc(100vw - 40px)"
          src={src}
          alt=""
          style={{width}}
        />
      </section>
    </div>
  );
}
