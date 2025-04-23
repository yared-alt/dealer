import React from 'react';
import Form from "@/components/Form";

async function Page({ params }: {
  params: { id: string }}) {
  const id  = params.id;

  try {
    const res = await fetch(`/api/car/findsingle?${id}`);
    
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const { data } = await res.json();

    const {singelcar,relatedcars}=data

    return (
      <div>
        <Form data={singelcar} />
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
