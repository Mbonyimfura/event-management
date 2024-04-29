import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventBookingWidget from "../components/EventBookingWidget";
import AddressLink from "../components/AddressLink.jsx";
import { format } from "date-fns";

function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/events/${id}`).then((response) => {
      setEvent(response.data);
    });
  }, [id]);
  if (!event) return "";

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-2xl mr-36">{event.name}</h1>
      <AddressLink>{event.location}</AddressLink>
      {
              <img className="object-cover" src={event.photo} alt={event.title} />
            }
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 grid grid-cols-1 md:grid-cols-[2fr_1fr">
        <div>
          <div className="my-4">
            <h2 className="font-simibold text-2xl">Description</h2>
            {event.description}
          </div>
          Date: {format(new Date(event.date),'yyyy-MM-dd')} <br />
          Tickets: {event.tickets} <br />
          Price: {event.price}
        </div>
        <div>
          <EventBookingWidget event={event}/>
        </div>
      </div>
    </div>
  );
}

export default EventPage;