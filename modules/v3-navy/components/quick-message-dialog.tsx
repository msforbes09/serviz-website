"use client";

import { XIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContactForm } from "./contact-form";

type QuickMessageDialogProps = {
  /** Subject prefix for the email, naming the button that opened the form. */
  subject: string;
  /** Classes for the trigger, so it looks like the link it replaces. */
  className?: string;
  children: React.ReactNode;
  /** Runs when the trigger is pressed, before the dialog opens. */
  onClick?: () => void;
};

/**
 * A call-to-action button that opens the quick-message form in a modal, in
 * place of a bare `mailto:` link. The visitor stays on the page, sees what is
 * about to be sent, and the email arrives with a subject that says which
 * button prompted it. A preview stand-in for a real submission, like the
 * contact page's form — see `TODO.md`.
 *
 * The one client leaf the server-rendered heroes and banners mount.
 */
export function QuickMessageDialog({
  subject,
  className,
  children,
  onClick,
}: QuickMessageDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className={className} onClick={onClick}>
        {children}
      </DialogTrigger>
      {/* The form is its own navy card, so the popup carries no padding of its
          own and the close button sits on the card. What it does carry is
          presence: a navy card over a blurred navy hero receded into it, so
          the scrim is dark, the card has a light ring and a deep shadow, and a
          rust bar runs along its top. */}
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-black/60"
        className="v3-root font-poppins overflow-hidden rounded-3xl bg-transparent p-0 text-white shadow-[0_30px_80px_rgba(0,0,0,.55)] ring-1 ring-white/15 sm:max-w-md"
      >
        <span aria-hidden className="bg-v3-rust absolute inset-x-0 top-0 z-10 h-1.5" />
        <DialogClose
          aria-label="Close"
          className="hover:bg-white/15 absolute top-4 right-4 z-10 grid size-9 cursor-pointer place-items-center rounded-full text-white/80 transition-colors hover:text-white [--v3-focus-ring:var(--color-v3-paper)]"
        >
          <XIcon className="size-5" />
        </DialogClose>
        <ContactForm
          subject={subject}
          heading={
            <DialogTitle className="font-outfit pr-10 text-xl font-bold text-white">
              Send a quick message
            </DialogTitle>
          }
        />
      </DialogContent>
    </Dialog>
  );
}
