"use client"


import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  linkText: string;
  linkUrl: string;
}

const ServiceCard = ({ title, description, imageSrc, linkText, linkUrl }: ServiceCardProps) => {
  return (
    <div className="flex flex-col">
      <img 
        src={imageSrc} 
        alt={title} 
        className="w-full h-48 object-cover mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <Link 
        href={linkUrl} 
        className="text-primary uppercase font-bold text-sm hover:underline mt-auto"
      >
        {linkText}
      </Link>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: "About",
      description: "Founded in 1996, Classic Cars specializes in the sale of exceptional classic automobiles. We offer a wide range of classic cars for every taste and budget.",
      imageSrc: "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80",
      linkText: "Read More",
      linkUrl: "/about",
    },
    {
      title: "Make an Investment",
      description: "Invest in classic cars that appreciate in value with time. Our experts can guide you to make smart choices with maximum returns.",
      imageSrc: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
      linkText: "Learn More",
      linkUrl: "/investment",
    },
    {
      title: "Restoration",
      description: "Our team of expert craftsmen can restore your classic car to pristine condition. We handle all aspects of restoration with meticulous attention to detail.",
      imageSrc: "https://images.unsplash.com/photo-1562142089-978d7f61527d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      linkText: "Find Out More",
      linkUrl: "/restoration",
    },
    {
      title: "Sell Your Car",
      description: "We offer competitive prices for quality classics. Our selling process is straightforward, transparent, and designed to get you the best value for your vehicle.",
      imageSrc: "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      linkText: "Sell With Us",
      linkUrl: "/sell",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              imageSrc={service.imageSrc}
              linkText={service.linkText}
              linkUrl={service.linkUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
