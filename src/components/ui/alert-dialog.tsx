import { Button } from "./button"

interface AlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  onConfirm: () => void
  loading?: boolean
}

export function AlertDialog({ open, onOpenChange, title, description, onConfirm, loading }: AlertDialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in duration-200">
        <h3 className="text-lg font-semibold text-church-text">{title}</h3>
        <p className="text-gray-500">{description}</p>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={loading}>
            {loading ? "Processing..." : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  )
}
