export interface Props {
  content: string;
  picture?: string;
  author: string;
}

export function Testimonial({content, picture, author}: Props) {
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
        {picture && (
          <div className="Testimonial__Image">
            <img className="Image" src={picture} alt="" />
          </div>
        )}
      </section>
    </div>
  );
}
