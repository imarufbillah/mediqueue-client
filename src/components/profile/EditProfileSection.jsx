"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PROFILE_FIELDS = [
  { label: "Full Name", value: "Maruf Billah", editable: true },
  { label: "Email Address", value: "maruf@example.com", editable: false },
  {
    label: "Photo URL",
    value: "https://ui-avatars.com/api/?name=Maruf+Billah",
    editable: true,
  },
  { label: "Account Type", value: "Student", editable: false },
  { label: "Joined", value: "January 2025", editable: false },
];

const EditProfileSection = ({ isEditing, setIsEditing }) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-heading text-lg text-foreground">
          Profile Information
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className="text-muted-foreground hover:text-primary"
        >
          <Pencil className="size-3.5" />
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {isEditing ? (
          /* Edit Mode */
          <motion.div
            key="edit"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col gap-5"
          >
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input id="edit-name" type="text" defaultValue="Maruf Billah" />
            </div>

            {/* Email — disabled */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-email" className="flex items-center gap-1.5">
                Email Address
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Lock className="size-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>Email cannot be changed</TooltipContent>
                </Tooltip>
              </Label>
              <Input
                id="edit-email"
                type="email"
                defaultValue="maruf@example.com"
                disabled
                className="bg-muted text-muted-foreground"
              />
            </div>

            {/* Photo URL */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-photo">Photo URL</Label>
              <div className="flex gap-2">
                <Input
                  id="edit-photo"
                  type="url"
                  defaultValue="https://ui-avatars.com/api/?name=Maruf+Billah"
                  className="flex-1"
                />
                <Button variant="outline" size="sm" className="shrink-0">
                  <Eye className="size-3.5" />
                  Preview
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3">
                <Button onClick={() => setIsEditing(false)}>
                  Save Changes
                </Button>
                <Button variant="ghost" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Your name and photo will update across all your listings.
              </p>
            </div>
          </motion.div>
        ) : (
          /* Read-Only Mode */
          <motion.div
            key="read"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col"
          >
            {PROFILE_FIELDS.map((field, index) => (
              <div
                key={field.label}
                className={`flex flex-col gap-1 py-4 ${
                  index < PROFILE_FIELDS.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
              >
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {field.label}
                </span>
                <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  {field.label === "Photo URL" ? (
                    <span className="max-w-70 truncate">{field.value}</span>
                  ) : (
                    field.value
                  )}
                  {!field.editable && field.label === "Email Address" && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Lock className="size-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>Email cannot be changed</TooltipContent>
                    </Tooltip>
                  )}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditProfileSection;
