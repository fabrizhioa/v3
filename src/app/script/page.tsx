import { modify_user } from "@/actions/scripts";

export default async function ScriptPage() {
  const response = await modify_user();
  return (
    <div className="flex flex-col h-full py-4 gap-4">
      <h2 className="text-3xl font-bold">Script</h2>
      <div className="border rounded-lg overflow-hidden">
        <pre>{JSON.stringify(response)}</pre>
      </div>
    </div>
  );
}
