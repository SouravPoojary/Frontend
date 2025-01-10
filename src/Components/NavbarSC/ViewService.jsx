import React from 'react'

 const ViewService = (services) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Service Name</th>
          <th>Service Description</th>
          <th>Service Categoty</th>
          <th>Delivery Time</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        services.map((service,index)=>(
        <tr key={index}>
          <td>{services.ser}</td>
        </tr>
        )
      </tbody>
    </table>
  );
}
