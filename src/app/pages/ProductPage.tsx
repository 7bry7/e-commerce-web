import React from 'react';
import { useParams } from 'react-router';

export default function ProductPage() {
  const { id } = useParams();
  return <div className="p-8 text-white">ProductPage Content for {id}</div>;
}
