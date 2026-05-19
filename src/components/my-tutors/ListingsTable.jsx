"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const getSlotColor = (remaining, total) => {
  if (remaining === 0) return "bg-destructive";
  if (remaining / total <= 0.5) return "bg-yellow-500";
  return "bg-primary";
};

const getModeVariant = (mode) => {
  if (mode === "Online") return "bg-primary/10 text-primary";
  if (mode === "Offline") return "bg-secondary text-secondary-foreground";
  return "bg-accent text-accent-foreground";
};

const ListingsTable = ({ tutors, onEdit, onDelete }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted">
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tutor
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Availability
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Fee
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Slots
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Mode
              </TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tutors.map((tutor) => (
              <TableRow
                key={tutor._id}
                className="transition-colors hover:bg-accent/50"
              >
                {/* Tutor */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={tutor.photo}
                      alt={tutor.name}
                      width={36}
                      height={36}
                      className="size-9 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {tutor.name}
                      </p>
                      <span className="mt-0.5 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[0.65rem] font-medium text-primary">
                        {tutor.subject}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Availability */}
                <TableCell>
                  <div className="flex flex-col text-sm text-muted-foreground">
                    <span>{tutor.availableDays}</span>
                    <span className="text-xs">{tutor.timeSlot}</span>
                  </div>
                </TableCell>

                {/* Fee */}
                <TableCell>
                  <span className="font-mono text-sm font-medium text-foreground">
                    ${tutor.hourlyFee} / hr
                  </span>
                </TableCell>

                {/* Slots */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className={`size-2 rounded-full ${getSlotColor(
                        tutor.slotsRemaining,
                        tutor.totalSlots,
                      )}`}
                    />
                    <span className="text-sm text-muted-foreground">
                      {tutor.slotsRemaining} / {tutor.totalSlots}
                    </span>
                  </div>
                </TableCell>

                {/* Mode */}
                <TableCell>
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getModeVariant(
                      tutor.teachingMode,
                    )}`}
                  >
                    {tutor.teachingMode}
                  </span>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onEdit(tutor)}
                      aria-label="Edit tutor"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onDelete(tutor)}
                      aria-label="Delete tutor"
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ListingsTable;
