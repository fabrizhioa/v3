import { Button } from "@/components/ui/button";
import Dialog, {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function FormPersonalPerfilPage() {
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  return (
    <>
      <form>
        <Button type="button" onClick={() => setPreviewOpen(!previewOpen)}>
          Ver dialogo
        </Button>
        <Button type="submit">Guardar cambios</Button>
      </form>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Dialogo</DialogTitle>
          </DialogHeader>
          <div className="mt-4 article-content">Dialog</div>
        </DialogContent>
      </Dialog>
    </>
  );
}
