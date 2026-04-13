import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  pending: "bg-warning/20 text-warning border-warning/30",
  accepted: "bg-primary/20 text-primary border-primary/30",
  on_the_way: "bg-accent/40 text-accent-foreground border-accent/50",
  delivered: "bg-success/20 text-success border-success/30",
  cancelled: "bg-destructive/20 text-destructive border-destructive/30",
  available: "bg-success/20 text-success border-success/30",
  on_delivery: "bg-warning/20 text-warning border-warning/30",
  offline: "bg-muted text-muted-foreground border-border",
  in_use: "bg-primary/20 text-primary border-primary/30",
  maintenance: "bg-destructive/20 text-destructive border-destructive/30",
  normal: "bg-primary/20 text-primary border-primary/30",
  emergency: "bg-destructive/20 text-destructive border-destructive/30",
};

const statusLabels: Record<string, string> = {
  on_the_way: "On the Way",
  on_delivery: "On Delivery",
  in_use: "In Use",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <Badge variant="outline" className={cn("font-medium capitalize", statusStyles[status] || "", className)}>
      {statusLabels[status] || status}
    </Badge>
  );
}
