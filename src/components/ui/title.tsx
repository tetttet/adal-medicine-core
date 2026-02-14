import React from "react";

const Title = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <>
      <h2
        className="text-3xl mb-3 font-medium"
        data-aos-delay="100"
        data-aos="fade-right"
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="text-base text-neutral-500 max-w-2xl mx-auto"
          data-aos-delay="200"
          data-aos="fade-right"
        >
          {subtitle}
        </p>
      )}
    </>
  );
};

export default Title;
