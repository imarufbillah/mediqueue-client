"use client";

import { useState } from "react";
import BookingsTable from "./BookingsTable";
import CancelDialog from "./CancelDialog";

const MyBookingsClient = () => {
  const [cancelOpen, setCancelOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleCancel = (booking) => {
    setSelectedBooking(booking);
    setCancelOpen(true);
  };

  return (
    <>
      <BookingsTable onCancel={handleCancel} />
      <CancelDialog open={cancelOpen} onOpenChange={setCancelOpen} />
    </>
  );
};

export default MyBookingsClient;
