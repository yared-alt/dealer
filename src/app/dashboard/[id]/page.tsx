import React from 'react';
import Form from "@/components/Form";
import { Car } from '../page';

async function Page({ params }: {
  params: { id: string }}) {
  const id  = params.id;

  try {
    const res = await fetch(`/api/car/findsingle?${id}`);
    
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const { data } = await res.json();

    const singelcar:Car=data.singlecar
    const relatedcars=data.relatedcars

    return (
      <div>
        <Form data={singelcar},{singelcar:Car} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <div>
        

        <p>Error loading data. Please try again later.</p>
        <Form data={[]} />
      </div>
    );
  }



  
}

export default Page;
