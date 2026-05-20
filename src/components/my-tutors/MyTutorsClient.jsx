"use client";

import { useState } from "react";
import ListingsTable from "./ListingsTable";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

const MyTutorsClient = ({ myTutors }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);

  const handleEdit = (tutor) => {
    setSelectedTutor(tutor);
    setEditOpen(true);
  };

  const handleDelete = (tutor) => {
    setSelectedTutor(tutor);
    setDeleteOpen(true);
  };

  return (
    <>
      <ListingsTable
        tutors={myTutors}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <EditDialog
        key={selectedTutor?._id}
        open={editOpen}
        onOpenChange={setEditOpen}
        tutor={selectedTutor}
      />
      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        tutor={selectedTutor}
      />
    </>
  );
};

export default MyTutorsClient;
