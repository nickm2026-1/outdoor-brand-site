"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type Props = {
  action: () => Promise<void>;
  itemName: string;
};

export function DeleteButton({ action, itemName }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm(`Delete "${itemName}"? This cannot be undone.`)) return;
    startTransition(() => {
      action();
    });
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleClick}
      disabled={isPending}
      className="gap-1.5"
    >
      <Trash2 className="size-3.5" />
      {isPending ? "Deleting…" : "Delete"}
    </Button>
  );
}
