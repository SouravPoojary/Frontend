import React from 'react'
import ServiceTable from "../Styles/ServiceCenter/ServiceTable.css"

const ViewService = ({ services }) => {
   console.log("view",services)
  return (
    <table className='view-service'>
      <thead className='head'>
        <tr>
          <th>Service Name</th>
          <th>Service Description</th>
          <th>Service Category</th>
          <th>Delivery Time</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody className='body'>
        {services.map((service, index) => (
          <tr key={index}>
            <td>{service.serviceName}</td>
            <td>{service.serviceDescription }</td>
            <td>{service.serviceCategory }</td>
            <td>{service.deliveryTime }</td>
             <td>{service.price }</td>
          </tr>
        ))
        }
      </tbody>
    </table>
  );
}
export default ViewService;