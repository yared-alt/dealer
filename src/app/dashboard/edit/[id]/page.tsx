import React from 'react';
import Form from "@/components/Form";
import { Car } from '@/type/Car';
import getsingelCar from '@/lib/utils/shared-api/getsingleCar';
import { serializeCar } from '@/helper/serializeData';

async function Page({ params }: {
  params: { id: string }
}) {
  const id = params.id;


    return (
      <div>
        <Form id={id} />
      </div>
    );
  }
export default Page;
