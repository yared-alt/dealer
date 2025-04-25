import React from 'react';

const CarCatalogue = () => {
  const cars = [
    {
      name: 'Toyota New Yaris',
      prices: [
        { variant: 'Standard', price: '$42' },
        { variant: 'Payers Sport', price: '$46' }
      ],
      specs: [
        { transmission: 'Manual', seats: '5 Seats', mpg: '24 MPG' },
        { transmission: 'Manual', seats: '5 Seats', mpg: '34 MPG' }
      ]
    },
    {
      name: 'Honda Civic',
      prices: [
        { price: '$52' }
      ],
      specs: []
    },
    {
      name: 'Mazda CX-3',
      prices: [
        { price: '$54' }
      ],
      specs: [
        { transmission: 'Auto', seats: '5 Seats', mpg: '28 MPG' }
      ]
    },
    {
      name: 'BMW X5',
      prices: [
        { price: '$56' }
      ],
      specs: []
    },
    {
      name: 'Honda Jazz RS',
      prices: [
        { price: '$58' }
      ],
      specs: []
    },
    {
      name: 'Aston Martin V12',
      prices: [
        { price: '$60' }
      ],
      specs: []
    },
    {
      name: 'Toyota New Yaris',
      prices: [
        { price: '$63' }
      ],
      specs: []
    }
  ];

  const footerCars = [
    {
      specs: [
        { transmission: 'Manual', seats: '9 Seats', mpg: '42 MPG', action: 'Rent Now' },
        { transmission: 'Auto', seats: '2 Seats', mpg: '24 MPG' },
        { transmission: 'Manual', seats: '8 Seats', mpg: '34 MPG' }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6">Car Catalogue</h1>
      <p className="text-lg mb-8">Explore our cars you might like!</p>

      <div className="space-y-8">
        {cars.map((car, index) => (
          <div key={index} className="border-b pb-6">
            <h2 className="text-2xl font-semibold mb-4">{car.name}</h2>
            
            <div className="flex flex-wrap gap-4 mb-4">
              {car.prices.map((price, i) => (
                <div key={i} className="flex items-center">
                  {price.variant && (
                    <span className="font-bold mr-2">{price.variant}</span>
                  )}
                  <span className="text-lg">{price.price}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {car.specs.map((spec, i) => (
                <div key={i} className="flex gap-4">
                  <span>{spec.transmission}</span>
                  <span>{spec.seats}</span>
                  <span>{spec.mpg}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Buy
        </button>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Visit site</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {footerCars[0].specs.map((spec, i) => (
            <div key={i} className="border p-4 rounded-lg">
              <div className="flex gap-4 mb-2">
                <span>{spec.transmission}</span>
                <span>{spec.seats}</span>
                <span>{spec.mpg}</span>
              </div>
              {spec.action && (
                <button className="mt-2 bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700 transition">
                  {spec.action}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarCatalogue;