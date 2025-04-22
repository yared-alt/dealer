
const ContactHero = () => {
  return (
    <section className="relative pt-16 h-[calc(700px)]">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-mountain.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative container mx-auto px-4 flex flex-col justify-center items-center text-white">
        <div className="text-center mb-8 mt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Discover Your Perfect <br /> Mountain Getaway
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
            Luxury resorts and adventures in the world most stunning landscapes
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
