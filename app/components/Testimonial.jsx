export function Testimonial({content, picture, author}) {
  return (
    <div
      id="shopify-section-testimonial"
      className="shopify-section Section--Testimonial"
    >
      <section className="Testimonial Global__Section">
        <div className="Testimonial__Content large">
          <p>{content}</p>
        </div>
        <span className="Heading--4 normal">{author}</span>
        <div className="Testimonial__Image">
          <img className="Image" src={picture} alt="" />
        </div>
      </section>
    </div>
  );
}
