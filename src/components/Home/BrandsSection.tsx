
const BrandsSection = () => {
    const brands = [
      { name: "Porsche", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Porsche_logo.svg" },
      { name: "Mercedes-Benz", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg" },
      { name: "Maserati", logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/Maserati_logo.svg" },
      { name: "Bentley", logo: "https://upload.wikimedia.org/wikipedia/commons/1/13/Bentley_logo.svg" },
      { name: "Citroen", logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Citro%C3%ABn.svg" },
      { name: "Ferrari", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Ferrari-Logo.svg" }
    ];
  
    return (
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {brands.map((brand, index) => (
              <div key={index} className="w-24 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} logo`} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default BrandsSection;