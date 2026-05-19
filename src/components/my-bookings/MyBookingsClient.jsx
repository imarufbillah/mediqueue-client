"use client";

import { useState } from "react";
import BookingsTable from "./BookingsTable";
import CancelDialog from "./CancelDialog";

const MyBookingsClient = ({ myBookings }) => {
  const [cancelOpen, setCancelOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleCancel = (booking) => {
    setSelectedBooking(booking);
    setCancelOpen(true);
  };

  return (
    <>
      <BookingsTable bookings={myBookings} onCancel={handleCancel} />
      <CancelDialog
        selectedBooking={selectedBooking}
        open={cancelOpen}
        onOpenChange={setCancelOpen}
      />
    </>
  );
};

export default MyBookingsClient;
