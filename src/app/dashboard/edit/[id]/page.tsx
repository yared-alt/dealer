import React from 'react';
import Form from "@/components/Form";
import { Car } from '@/type/Car';
import getsingelCar from '@/lib/utils/shared-api/getsingleCar';
import { serializeCar } from '@/helper/serializeData';

async function Page({ params }: {
  params: { id: string }
}) {
  const id = params.id;

  const { singlecar } = await getsingelCar(id)
  const serializedData=serializeCar(singlecar);
  // console.log("dddddddddddd",serializedData)
  if (singlecar) {
    return (
      <div>
        <Form data={serializedData} />
      </div>
    );

  } else {
    return (
      <div>
        <p>Error loading data. Please try again later.</p>
        <Form data={[]} />
      </div>
    );
  }
}

export default Page;
